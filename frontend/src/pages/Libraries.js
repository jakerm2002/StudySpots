import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import SearchBar from "../general_components/SearchBar";
import Sorter from "../general_components/Sort";
import FilterContainer from '../general_components/FilterContainer';
import getModel from '../general_components/ModelPageTemplate';
import axios from "axios";
import Highlighter from "react-highlight-words";
import { LibraryEndpointName, LibraryExactFilters, LibraryRangeFilters, LibrarySortOptions } from '../general_components/LibraryOptions';

const Libraries = () => {
    const [libraries, setLibraries] = useState({'metadata': {}, 'results': []});
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        axios.get('https://api.studyspots.me/libraries?' + searchParams.toString()).then(response => {
            setLibraries(response.data);
        });
    }, [searchParams]);

    const get_todays_hours = (info) => {
        const d = new Date();
        let day = d.getDay();
        if (info.formatted_hours === 'Hours unavailable') {
            return 'Hours unavailable';
        } 
        let hoursArr = info.formatted_hours.split("\n");
        //sunday is day 0 in javascript date objects,
        //however our formatted_hours field lists monday first
        //we want to access hoursArr[day] with the expected behaviour
        day -= 1;
        if (day < 0) {
            day = 6;
        }
        return hoursArr[day];
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
                    <td>{get_todays_hours(info)}</td>
                </tr>
            )
        }
    );

    var payload = {
        entries : Entries,
        pageName : "Libraries",
        fields : ["Name", "Address", "Rating", "Phone #", "Hours today"],
        num_items_per_page : libraries["metadata"]["per_page"],
        num_total_items : libraries["metadata"]["num_total_results"]
    }
    return [
        <SearchBar/>,
        <FilterContainer api_name={LibraryEndpointName} exactFilters={LibraryExactFilters} rangeFilters={LibraryRangeFilters}/>,
        <Sorter api_name={LibraryEndpointName} sortOptions={LibrarySortOptions}/>,
        getModel(payload)
    ];
}

export default Libraries;