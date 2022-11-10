import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button'
import { useNavigate, useSearchParams } from 'react-router-dom';
import SearchBar from "../general_components/SearchBar";
import { RenderPageTable } from '../general_components/ModelPageTemplate';
import styles from "../general_components/ModelPageTemplate.module.css";
import axios from "axios";
import Highlighter from "react-highlight-words";

var currencyFormat = {style: 'currency', currency: 'USD', minimumFractionDigits: 0}
var populationFormat = {style: 'decimal', minimumFractionDigits: 0}

const Search = () => {
    const [searchParams] = useSearchParams();
    const [searchInfo, setSearchInfo] = useState({
        'metadata': {},
        'university_results': [],
        'library_results': [],
        'coffeeshop_results': [],
    });
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(
            "http://studyspotstempapi-env.eba-ypjgz4pn.us-east-2.elasticbeanstalk.com/search?" + searchParams.toString()
        ).then(response => {
            setSearchInfo(response.data);
            console.log(searchInfo);
        });
    });

    const routeChange = (link) => {
        navigate(link + "?" + searchParams.toString());
    }

    const coffeeShopEntries = searchInfo["coffeeshop_results"].map(
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

    const libraryEntries = searchInfo["library_results"].map(
        (info) => {
            return(
                <tr onClick={() => window.location.href = `/Libraries/${info.id}`}>
                    <td title={info.name}>{
                        searchParams.get("search") != null
                        ? <Highlighter
                            searchWords={searchParams.get("search").split(" ")}
                            textToHighlight={info.name}
                            />
                        : info.name
                    }</td>
                    <td title={info.address}>{
                        searchParams.get("search") != null
                        ? <Highlighter
                            searchWords={searchParams.get("search").split(" ")}
                            textToHighlight={info.address}
                            />
                        : info.address
                    }</td>
                    <td title={info.rating}>{info.rating}</td>
                    <td title={info.phone}>{
                        searchParams.get("search") != null
                        ? <Highlighter
                            searchWords={searchParams.get("search").split(" ")}
                            textToHighlight={info.phone}
                            />
                        : info.phone
                    }</td>
                    <td title={info.formatted_hours}> {
                        searchParams.get("search") != null
                        ? <Highlighter
                            searchWords={searchParams.get("search").split(" ")}
                            textToHighlight={info.formatted_hours}
                            />
                        : info.formatted_hours
                    }</td>
                </tr>
            )
        }
    );

    const universityEntries = searchInfo["university_results"].map(
        (info) => {
            return(
                <tr onClick={() => window.location.href = `/Universities/${info.id}`}>
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
                    <td title={info.zipcode}>{
                        searchParams.get("search") != null
                        ? <Highlighter
                            searchWords={searchParams.get("search").split(" ")}
                            textToHighlight={info.zipcode}
                            />
                        : info.zipcode
                    }</td>
                    <td title={info.size}>{info.size.toLocaleString("en-US", populationFormat)}</td>
                    <td title={info.instate_tuition}>{info.instate_tuition.toLocaleString("en-US", currencyFormat)}</td>
                    <td title={info.outstate_tuition}>{info.outstate_tuition.toLocaleString("en-US", currencyFormat)}</td> 
                </tr>
            )
        }
    );

    const coffeeShopFields = ["Name", "City", "Price", "Rating", "Open/Closed"];
    const libraryFields = ["Name", "Location", "Rating", "Telephone", "Status"];
    const universityFields = ["Name", "City", "Zip", "Undergraduate Population", "In State Tuition", "Out of State Tuition"];

    return [
        <SearchBar/>,
        <div className={styles.list}>
            <RenderPageTable entries={coffeeShopEntries} page_name="Coffee Shops" fields={coffeeShopFields}/>
        </div>,
        <Button variant="outline-dark" onClick={() => routeChange("/CoffeeShops")}>View all CoffeeShop Results</Button>,
        <div className={styles.list}>
            <RenderPageTable entries={libraryEntries} page_name="Libraries" fields={libraryFields}/>
        </div>,
        <Button variant="outline-dark" onClick={() => routeChange("/Libraries")}>View all Library Results</Button>,
        <div className={styles.list}>
            <RenderPageTable entries={universityEntries} page_name="Universities" fields={universityFields}/>
        </div>,
        <Button variant="outline-dark" onClick={() => routeChange("/Universities")}>View all University Results</Button>,
    ];
}

export default Search;