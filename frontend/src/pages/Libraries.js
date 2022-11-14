import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import SearchBar from "../general_components/SearchBar";
import getModel from '../general_components/ModelPageTemplate';
import axios from "axios";
import Highlighter from "react-highlight-words";

const Libraries = () => {
    const [libraries, setLibraries] = useState({'metadata': {}, 'results': []});
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        axios.get('http://studyspotstempapi-env.eba-ypjgz4pn.us-east-2.elasticbeanstalk.com/libraries?' + searchParams.toString()).then(response => {
            setLibraries(response.data);
        });
    }, [searchParams]);

    //get_query and get_data partially from GiveandLive (Spring 2022)
    function get_query(page) {
        let url = `http://studyspotstempapi-env.eba-ypjgz4pn.us-east-2.elasticbeanstalk.com/libraries`;
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
        setLibraries(response.data);
    }    

    const set_page = (pageNumber) => {
        update_query("page", pageNumber);
        get_data(pageNumber)
    }

    const Entries = libraries["results"].map(
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
                    <td title={info.rating_string}>{info.rating_string}</td>
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
    var payload = {
        entries : Entries,
        pageName : "Libraries",
        fields : ["Name", "Location", "Rating", "Telephone", "Status"],
        num_items_per_page : libraries["metadata"]["per_page"],
        num_total_items : libraries["metadata"]["num_total_results"],
        set_new_page: set_page
    }
    return [
        <SearchBar/>,
        getModel(payload)
    ];
}

export default Libraries;