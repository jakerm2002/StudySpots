import React, { useEffect, useState } from 'react'
import getModel from '../general_components/ModelPageTemplate';
import axios from "axios";

const Libraries = () => {
    const [libraries, setLibraries] = useState([]);

    useEffect(() => {
        axios.get('https://api.studyspots.me/libraries').then(response => {
            console.log("response",response.data);
            setLibraries(response.data);
            
        },
        reject => {
            console.log("REJECT");
        });
    }, []);


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
    console.log(Entries);
    var payload = {
        entries : Entries,
        pageName : "Libraries",
        fields : ["Name", "Location", "Rating", "Telephone", "Status"]
    }
    return getModel(payload);
}

export default Libraries;