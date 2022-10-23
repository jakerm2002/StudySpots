import React, { useEffect, useState } from 'react'
import getModel from '../general_components/ModelPageTemplate';
import axios from "axios";

var currencyFormat = {style: 'currency', currency: 'USD', minimumFractionDigits: 0}
var populationFormat = {style: 'decimal', minimumFractionDigits: 0}


const Universities = () => {

    const [universities, setUniversities] = useState([]);

    useEffect(() => {
        axios.get('http://api.studyspots.me/universities').then(response => {
            console.log("response",response.data);
            setUniversities(response.data);
            
        },
        reject => {
            console.log("REJECT");
        });
    }, []);

    const Entries = universities.map(
        (info) => {
            return(
                <tr onClick={() => window.location.href = `/Universities/${info.id}`}>
                    <td title={info.name}>{info.name}</td>
                    <td title={info.city}>{info.city}</td>
                    <td title={info.zip}>{info.zip}</td>
                    <td title={info.size}>{info.size.toLocaleString("en-US", populationFormat)}</td>
                   {/* <td title={info.size}>{info.cost.tuition.in_state.toLocaleString("en-US", currencyFormat)}</td>
                    <td title={info.size}>{info.tuition.out_of_state.toLocaleString("en-US", currencyFormat)}</td>  */}
                </tr>
            )
        }
    );
    console.log(Entries);
    var payload = {
        entries : Entries,
        pageName : "Universities",
        fields : ["Name", "City", "Zip", "Undergraduate Population", "In State Tuition", "Out of State Tuition"]
    }
    return getModel(payload);
}

export default Universities;