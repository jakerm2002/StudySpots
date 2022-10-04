import React from 'react'
import api_results from '../api_resources/coffeeshops.json'
import getModel from '../general_components/ModelPageTemplate';
import {Route, Routes} from 'react-router-dom'
import styles from '../general_components/ModelPageTemplate.module.css'
import { Link } from 'react-router-dom';
import {useHistory} from 'react-router-dom';

const CoffeeShops = () => {
    const Entries = api_results.businesses.map(
        (info) => {
            var open = "Open";
            if (info.is_closed) {
                open = "Closed";
            }
	    const pagePath = "/" + info.alias;
	    console.log(pagePath)
	    const instancePage = instancePages(info);
	    <Routes>
		<Route path="/" element={<Splash/>}/>
	    </Routes>
            return(
                <tr onClick={() => window.location.href = `/CoffeeShops/${info.id}`}>
                    <td title={info.name}>{info.name}</td>
                    <td title={info.location.city}>{info.location.city}</td>
                    <td title={info.price}>{info.price}</td>
                    <td title={info.rating}>{info.rating} ({info.review_count})</td>
                    <td title={!info.is_closed ? "open" : "closed"} id={!info.is_closed ? styles.open : styles.closed}>{open}</td>
                    {/* <Link to={`/CoffeeShops/${info.id}`}>Link</Link> */}
                </tr>
            )
        }
    );
    console.log(Entries);
    var payload = {
        entries : Entries,
        pageName : "Coffee Shops",
        fields : ["Name", "City", "Price", "Rating", "Open/Closed"]
    }
    return getModel(payload);
}

function instancePages(info) {
	var payload = {
		"Image" : info.image_url,
		"Stats" : ["Item", "Item"],
		"Body" : "Lorem"
	};
	return getInstance(payload)
}

export default CoffeeShops;