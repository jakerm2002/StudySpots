import Table from 'react-bootstrap/Table';
import React from 'react'
import JsonData from '../api_resources/coffeeshops.json'
import './ModelPageTemplate.css'

function ModelPageTemplate(){
    console.log(JsonData);
    const Businesses = JsonData.businesses.map(
        (info) => {
            var open = "Open";
            if (info.is_closed) {
                open = "Closed";
            }
            return(
                <tr>
                    <td title={info.name}>{info.name}</td>
                    <td title={info.location.city}>{info.location.city}</td>
                    <td title={info.price}>{info.price}</td>
                    <td title={info.rating}>{info.rating} ({info.review_count})</td>
                    <td title={!info.is_closed ? "open" : "closed"} id={!info.is_closed ? "open" : "closed"}>{open}</td>
                </tr>
            )
        }
    )
 
    return(
        <div className='list'>
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
            </div>
        // <div>
        //     <table className="table table-striped">
        //         <thead>
        //             <tr>
        //             <th>Name</th>
        //             <th>City</th>
        //             <th>Price</th>
        //             <th>Rating</th>
        //             <th>Open/Closed</th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {Businesses}
        //         </tbody>
        //     </table>
             
        // </div>
    )
 }
 
 export default ModelPageTemplate;

// const ModelPageTemplate = () => {
// }

// const DataTable = props => {
//     const 
// }


// export default ModelPageTemplate;
