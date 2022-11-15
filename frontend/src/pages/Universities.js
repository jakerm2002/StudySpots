import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import SearchBar from '../general_components/SearchBar';
import Sorter from '../general_components/Sort';
import FilterContainer from '../general_components/FilterContainer';
import getModel from '../general_components/ModelPageTemplate';
import axios from "axios";
import Highlighter from "react-highlight-words";
import { UniversityEndpointName, UniversityExactFilters, UniversityRangeFilters, UniversitySortOptions } from '../general_components/UniversityOptions';

var currencyFormat = {style: 'currency', currency: 'USD', minimumFractionDigits: 0}
var populationFormat = {style: 'decimal', minimumFractionDigits: 0}


const Universities = () => {
    const [universities, setUniversities] = useState({'metadata': {}, 'results': []});
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        axios.get('https://api.studyspots.me/universities?' + searchParams.toString()).then(response => {
            setUniversities(response.data);
        });
    }, [searchParams]);

    const Entries = universities["results"].map(
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
                    <td title={info.enrollment_ugr_12m}>{info.enrollment_ugr_12m.toLocaleString("en-US", populationFormat)}</td>
                    <td title={info.instate_tuition}>{info.instate_tuition.toLocaleString("en-US", currencyFormat)}</td>
                    <td title={info.outstate_tuition}>{info.outstate_tuition.toLocaleString("en-US", currencyFormat)}</td> 
                </tr>
            )
        }
    );

    var payload = {
        entries : Entries,
        pageName : "Universities",
        fields : ["Name", "City", "Zip", "Undergraduate Population", "In State Tuition", "Out of State Tuition"],
        num_items_per_page : universities["metadata"]["per_page"],
        num_total_items : universities["metadata"]["num_total_results"]
    }

    return [
        <SearchBar/>,
        <FilterContainer api_name={UniversityEndpointName} exactFilters={UniversityExactFilters} rangeFilters={UniversityRangeFilters}/>,
        <Sorter api_name={UniversityEndpointName} sortOptions={UniversitySortOptions}/>,
        getModel(payload)
    ];
}

export default Universities;