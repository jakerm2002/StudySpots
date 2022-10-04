import React from 'react'
import api_results from '../api_resources/libraries.json'
import getModel from '../general_components/ModelPageTemplate';
import {Link} from 'react-router-dom'

const Libraries = () => {
    const Entries = api_results.businesses.map(
        (info) => {
            return(
                <tr>
                    <td title={info.name}>{info.name}</td>
                    <td title={info.formatted_address}>{info.formatted_address}</td>
                    <td title={info.rating}>{info.rating}</td>
                    <td title={info.businesses_status}> ({info.business_status})</td>
                    <Link to={`/Libraries/${info.reference}`}>Link</Link>
                </tr>
            )
        }
    );
    console.log(Entries);
    var payload = {
        entries : Entries,
        pageName : "Libraries",
        fields : ["Name", "Location", "Rating", "Status"]
    }
    return getModel(payload);
}

export default Libraries;