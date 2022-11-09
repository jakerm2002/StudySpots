import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import SearchBar from "../general_components/SearchBar";
import getModel from '../general_components/ModelPageTemplate';
import styles from '../general_components/ModelPageTemplate.module.css'
import axios from "axios";

const CoffeeShops = () => {

    const [coffeeShops, setCoffeeShops] = useState({'metadata': {}, 'results': []});
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        axios.get('http://studyspotstempapi-env.eba-ypjgz4pn.us-east-2.elasticbeanstalk.com/coffeeshops?' + searchParams.toString()).then(response => {
            // console.log("response",response.data);
            setCoffeeShops(response.data);
            console.log(response.data);
            setLoading(false);
        },
        reject => {
            // console.log("REJECT");
        });
        }, [searchParams]);

    //get_query and get_data partially from GiveandLive (Spring 2022)
    function get_query(page) {
        let url = `http://studyspotstempapi-env.eba-ypjgz4pn.us-east-2.elasticbeanstalk.com/coffeeshops`;
        url = url + `?${searchParams.toString()}`;
        url = url + `&page=${page}`
        return url;
    }

    function update_query(param, val) {
        let newParams = searchParams;
        newParams.set(param, val);
        setSearchParams(newParams);
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
        update_query("page", pageNumber);
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

    console.log(Entries);
    var payload = {
        entries : Entries,
        pageName : "Coffee Shops",
        fields : ["Name", "City", "Price", "Rating", "Open/Closed"],
        num_items_per_page : coffeeShops["metadata"]["per_page"],
        num_total_items : coffeeShops["metadata"]["num_total_results"],
        set_new_page: set_page
    }
    return [
        <SearchBar/>,
        getModel(payload)
    ];
}

export default CoffeeShops;