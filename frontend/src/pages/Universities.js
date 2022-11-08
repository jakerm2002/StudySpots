import React, { useEffect, useState } from 'react'
import getModel from '../general_components/ModelPageTemplate';
import axios from "axios";

var currencyFormat = {style: 'currency', currency: 'USD', minimumFractionDigits: 0}
var populationFormat = {style: 'decimal', minimumFractionDigits: 0}


const Universities = () => {

    const [universities, setUniversities] = useState({'metadata': {}, 'results': []});
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        axios.get('http://studyspotstempapi-env.eba-ypjgz4pn.us-east-2.elasticbeanstalk.com/universities').then(response => {
            // console.log("response",response.data);
            setUniversities(response.data);
            
        },
        reject => {
            // console.log("REJECT");
        });
    }, []);

    //get_query and get_data partially from GiveandLive (Spring 2022)
    function get_query(page) {
        let url = `http://studyspotstempapi-env.eba-ypjgz4pn.us-east-2.elasticbeanstalk.com/universities`;
        url = url + `?page=${page}`
        return url;
    }
    
    const get_data = async(page) => {
        const url = get_query(page);
        const response = await axios.get(url);
        setUniversities(response.data);
    }    

    const set_page = (pageNumber) => {
        // console.log('hello');
        setCurrentPage(pageNumber);
        // console.log('set page to ', pageNumber)
        get_data(pageNumber)
    }

    const Entries = universities["results"].map(
        (info) => {
            return(
                <tr onClick={() => window.location.href = `/Universities/${info.id}`}>
                    <td title={info.name}>{info.name}</td>
                    <td title={info.city}>{info.city}</td>
                    <td title={info.zipcode}>{info.zipcode}</td>
                    <td title={info.size}>{info.size.toLocaleString("en-US", populationFormat)}</td>
                    <td title={info.instate_tuition}>{info.instate_tuition.toLocaleString("en-US", currencyFormat)}</td>
                    <td title={info.outstate_tuition}>{info.outstate_tuition.toLocaleString("en-US", currencyFormat)}</td> 
                </tr>
            )
        }
    );
    // console.log(Entries);
    var payload = {
        entries : Entries,
        pageName : "Universities",
        fields : ["Name", "City", "Zip", "Undergraduate Population", "In State Tuition", "Out of State Tuition"],
        num_items_per_page : universities["metadata"]["per_page"],
        num_total_items : universities["metadata"]["num_total_results"],
        set_new_page: set_page
    }
    return getModel(payload);
}

export default Universities;