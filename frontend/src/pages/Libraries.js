import React from 'react'
import api_results from '../api_resources/libraries.json'
import getModel from '../general_components/ModelPageTemplate';
import {Link} from 'react-router-dom'

const Libraries = () => {
    const Entries = api_results.businesses.map(
        (info) => {
            return(
                <tr onClick={() => window.location.href = `/Libraries/${info.reference}`}>
                    <td title={info.name}>{info.name}</td>
                    <td title={info.formatted_address}>{info.formatted_address}</td>
                    <td title={info.rating}>{info.rating}</td>
                    <td title={info.telephone}>{info.telephone}</td>
                    <td title={info.businesses_status}> ({info.business_status})</td>
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