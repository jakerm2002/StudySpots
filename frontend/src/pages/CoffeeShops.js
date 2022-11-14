import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import SearchBar from "../general_components/SearchBar";
import getModel from '../general_components/ModelPageTemplate';
import styles from '../general_components/ModelPageTemplate.module.css'
import axios from "axios";
import Highlighter from "react-highlight-words";

const CoffeeShops = () => {

    const [coffeeShops, setCoffeeShops] = useState({'metadata': {}, 'results': []});
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        axios.get('http://studyspotstempapi-env.eba-ypjgz4pn.us-east-2.elasticbeanstalk.com/coffeeshops?' + searchParams.toString()).then(response => {
            setCoffeeShops(response.data);
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
        const url = get_query(page);
        const response = await axios.get(url);
        setCoffeeShops(response.data);
    }    

    const set_page = (pageNumber) => {
        update_query("page", pageNumber);
        get_data(pageNumber)
    }

    const Entries = coffeeShops["results"].map(
        (info) => {
            var name = info.name;
            var open = "Open";
            if(info.is_closed){
                open = "Closed";
            }
            return(
                <tr onClick={() => window.location.href = `/CoffeeShops/${info.id}`}>
                    <td title={info.name}>{
                        searchParams.get("search") != null
                            ? <Highlighter
                                searchWords={searchParams.get("search").split(" ")}
                                textToHighlight={info.name}
                                />
                            : info.name
                    }</td>
                    <td title={info.city}>{
                        searchParams.get("search") != null
                        ? <Highlighter
                            searchWords={searchParams.get("search").split(" ")}
                            textToHighlight={info.city}
                            />
                        : info.city
                    }</td>
                    <td title={info.price}>{
                        searchParams.get("search") != null
                        ? <Highlighter
                            searchWords={searchParams.get("search").split(" ")}
                            textToHighlight={info.price}
                            />
                        : info.price
                    }</td>
                    <td title={info.rating}>{info.rating}</td>
                    <td title={!info.is_closed ? "open" : "closed"} id={!info.is_closed ? styles.open : styles.closed}>{open}</td>

                </tr>
            )
        }
    );

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