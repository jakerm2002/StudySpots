import Table from 'react-bootstrap/Table';
import Stack from 'react-bootstrap/Stack';
import React from 'react'
import api_results from '../api_resources/coffeeshops.json'
import styles from './ModelPageTemplate.module.css'

function ModelPageTemplate(){
    console.log(api_results);
    
    const Businesses = api_results.businesses.map(
        (info) => {
            var open = "Open";
            if (info.is_closed) {
                open = "Closed";
            }
            return(
                <tr onClick={() => window.location.href = "CoffeeShops"}>
                    <td title={info.name}>{info.name}</td>
                    <td title={info.location.city}>{info.location.city}</td>
                    <td title={info.price}>{info.price}</td>
                    <td title={info.rating}>{info.rating} ({info.review_count})</td>
                    <td title={!info.is_closed ? "open" : "closed"} id={!info.is_closed ? "open" : "closed"}>{open}</td>
                </tr>
            )
        }
    )
    console.log(Businesses.length);
 
    return(
        <div className={styles.list}>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>City</th>
                        <th>Price</th>
                        <th>Rating</th>
                        <th>Open/Closed</th>
                    </tr>
                </thead>
                <tbody>
                    {Businesses}
                </tbody>
            </Table>
            <Stack>
                <div>{Businesses.length} items</div>
                <div>Page 1/1</div>
            </Stack>
        </div>
    )
}
 
export default ModelPageTemplate;