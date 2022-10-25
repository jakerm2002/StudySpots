import React, { useEffect, useState } from 'react'
import getModel from '../general_components/ModelPageTemplate';
import axios from "axios";

const Libraries = () => {
    const [libraries, setLibraries] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        axios.get('https://api.studyspots.me/libraries').then(response => {
            // console.log("response",response.data);
            setLibraries(response.data);
            
        },
        reject => {
            // console.log("REJECT");
        });
    }, []);

    //get_query and get_data partially from GiveandLive (Spring 2022)
    function get_query(page) {
        let url = `https://api.studyspots.me/libraries`;
        url = url + `?page=${page}`
        return url;
    }
    
    const get_data = async(page) => {
        const url = get_query(page);
        const response = await axios.get(url);
        setLibraries(response.data);
    }    

    const set_page = (pageNumber) => {
        // console.log('hello');
        setCurrentPage(pageNumber);
        // console.log('set page to ', pageNumber)
        get_data(pageNumber)
    }

    const Entries = libraries.map(
        (info) => {
            return(
                <tr onClick={() => window.location.href = `/Libraries/${info.id}`}>
                    <td title={info.name}>{info.name}</td>
                    <td title={info.address}>{info.address}</td>
                    <td title={info.rating}>{info.rating}</td>
                    <td title={info.phone}>{info.phone}</td>
                    <td title={info.formatted_hours}> {info.formatted_hours}</td>
                </tr>
            )
        }
    );
    // console.log(Entries);
    var payload = {
        entries : Entries,
        pageName : "Libraries",
        fields : ["Name", "Location", "Rating", "Telephone", "Status"],
        num_items_per_page : 10,
        num_total_items : 2476,
        set_new_page: set_page
    }
    return getModel(payload);
}

export default Libraries;