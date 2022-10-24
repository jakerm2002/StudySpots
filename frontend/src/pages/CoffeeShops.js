import React, { useEffect, useState } from 'react'
import getModel from '../general_components/ModelPageTemplate';
import styles from '../general_components/ModelPageTemplate.module.css'
import axios from "axios";

const CoffeeShops = () => {

    const [coffeeShops, setCoffeeShops] = useState([]);
    // const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://api.studyspots.me/coffeeshops').then(response => {
            console.log("response",response.data);
            setCoffeeShops(response.data);
            // setLoading(false);
        },
        reject => {
            console.log("REJECT");
        });
    }, []);

    function getQuery(page, query, ignore) {
        let url = `https://api.studyspots.me/universities`;
        url = url + `?page=${page}`
        return url;
    }
    
    const get_data = async(page, query, ignore) => {
        // setLoading(true);
        const url = getQuery(page, query, ignore);
        const response = await axios.get(url);
        setCoffeeShops(response.data);
        // setLoading(false);
    }    


    // if(loading){
    //     return <h2>Loading...</h2>
    // }
    

    const Entries = coffeeShops.map(
        (info) => {
            var name = info.name;
            var open = "Open";
            if(info.is_closed){
                open = "Closed";
            }
            if(name === ""){
                console.log("name empty")
            }
            return(
                <tr onClick={() => window.location.href = `/CoffeeShops/${info.id}`}>
                    <td title={info.name}>{info.name}</td>
                    <td title={info.city}>{info.city}</td>
                    <td title={info.price}>{info.price}</td>
                    <td title={info.rating}>{info.rating}</td>
                    <td title={!info.is_closed ? "open" : "closed"} id={!info.is_closed ? styles.open : styles.closed}>{open}</td>

                </tr>
            )
        }
    );
    console.log(Entries);
    var payload = {
        entries : Entries,
        pageName : "Coffee Shops",
        fields : ["Name", "City", "Price", "Rating", "Open/Closed"],
        num_total_items : 286
    }
    return getModel(payload);
}

export default CoffeeShops;