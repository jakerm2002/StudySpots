import React, { useEffect, useState } from 'react'
import getModel from '../general_components/ModelPageTemplate';
import styles from '../general_components/ModelPageTemplate.module.css'
import axios from "axios";

const CoffeeShops = () => {

    const [coffeeShops, setCoffeeShops] = useState({'metadata': {}, 'results': []});
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://studyspotstempapi-env.eba-ypjgz4pn.us-east-2.elasticbeanstalk.com/coffeeshops').then(response => {
            // console.log("response",response.data);
            setCoffeeShops(response.data);
            setLoading(false);
        },
        reject => {
            // console.log("REJECT");
        });
    }, []);

    //get_query and get_data partially from GiveandLive (Spring 2022)
    function get_query(page) {
        let url = `http://studyspotstempapi-env.eba-ypjgz4pn.us-east-2.elasticbeanstalk.com/coffeeshops`;
        url = url + `?page=${page}`
        return url;
    }
    
    const get_data = async(page) => {
        setLoading(true);
        const url = get_query(page);
        const response = await axios.get(url);
        setCoffeeShops(response.data);
        setLoading(false);
    }    

    const set_page = (pageNumber) => {
        // console.log('hello');
        setCurrentPage(pageNumber);
        // console.log('set page to ', pageNumber)
        get_data(pageNumber)
    }

    const Entries = coffeeShops["results"].map(
        (info) => {
            var name = info.name;
            var open = "Open";
            if(info.is_closed){
                open = "Closed";
            }
            if(name === ""){
                // console.log("name empty")
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

    // console.log(Entries);
    var payload = {
        entries : Entries,
        pageName : "Coffee Shops",
        fields : ["Name", "City", "Price", "Rating", "Open/Closed"],
        num_items_per_page : coffeeShops["metadata"]["per_page"],
        num_total_items : coffeeShops["metadata"]["num_total_results"],
        set_new_page: set_page
    }
    return getModel(payload);
}

export default CoffeeShops;