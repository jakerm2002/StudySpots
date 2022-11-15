import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import SearchBar from "../general_components/SearchBar";
import Sorter from '../general_components/Sort';
import FilterContainer from '../general_components/FilterContainer';
import getModel from '../general_components/ModelPageTemplate';
import styles from '../general_components/ModelPageTemplate.module.css'
import axios from "axios";
import Highlighter from "react-highlight-words";
import { CoffeeShopEndpointName ,CoffeeShopExactFilters, CoffeeShopRangeFilters, CoffeeShopSortOptions } from '../general_components/CoffeeShopOptions';
import TimeOptions from '../general_components/TimeOptions';


const CoffeeShops = () => {
    const [coffeeShops, setCoffeeShops] = useState({'metadata': {}, 'results': []});
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        axios.get('https://api.studyspots.me/coffeeshops?' + searchParams.toString()).then(response => {
            setCoffeeShops(response.data);
        });
    }, [searchParams]);

    // //get_query and get_data partially from GiveandLive (Spring 2022)
    // function get_query(page) {
    //     let url = `https://api.studyspots.me/coffeeshops`;
    //     url = url + `?${searchParams.toString()}`;
    //     url = url + `&page=${page}`
    //     return url;
    // }

    // function update_query(param, val) {
    //     let newParams = searchParams;
    //     newParams.set(param, val);
    //     setSearchParams(newParams);
    // }
    
    // const get_data = async(page) => {
    //     const url = get_query(page);
    //     const response = await axios.get(url);
    //     setCoffeeShops(response.data);
    // }    

    // const set_page = (pageNumber) => {
    //     update_query("page", pageNumber);
    //     get_data(pageNumber)
    // }

    const get_todays_hours = (info) => {
        const d = new Date();
        let day = d.getDay();
        let startHour;
        let endHour;
        switch(day) {
            case 0:
                startHour = info.hours_day_0_open;
                endHour = info.hours_day_0_closed;
                break;
            case 1:
                startHour = info.hours_day_1_open;
                endHour = info.hours_day_1_closed;
                break;
            case 2:
                startHour = info.hours_day_2_open;
                endHour = info.hours_day_2_closed;
                break;
            case 3:
                startHour = info.hours_day_3_open;
                endHour = info.hours_day_3_closed;
                break;
            case 4:
                startHour = info.hours_day_4_open;
                endHour = info.hours_day_4_closed;
                break;
            case 5:
                startHour = info.hours_day_5_open;
                endHour = info.hours_day_5_closed;
                break;
            case 6:
                startHour = info.hours_day_6_open;
                endHour = info.hours_day_6_closed;
                break;
            default:
                break;
        }

        if (startHour === 'N/A' || endHour === 'N/A') {
            return 'Hours unavailable';
        } else if (startHour === '-1' || endHour === '-1') {
            return 'Closed'
        }

        //really dumb workaround, date could be any date, not just 2000
        let startHour12 = new Date('2000-01-01T' + startHour.slice(0,2) + ':00:00Z');
        let endHour12 = new Date('2000-01-01T' + endHour.slice(0,2) + ':00:00Z');
        startHour = startHour12.toLocaleTimeString('en-US', {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'});
        endHour = endHour12.toLocaleTimeString('en-US', {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'});
        return startHour + ' - ' + endHour;
    }

    const Entries = coffeeShops["results"].map(
        (info) => {
            return(
                <tr onClick={() => window.location.href = `/CoffeeShops/${info.id}`}>
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
                    <td title={info.price}>{
                        searchParams.get("search") != null
                        ? <Highlighter
                            searchWords={searchParams.get("search").split(" ")}
                            textToHighlight={info.price}
                            />
                        : info.price
                    }</td>
                    <td title={info.rating}>{info.rating}</td>
                    <td>{get_todays_hours(info)}</td>

                </tr>
            )
        }
    );

    var payload = {
        entries : Entries,
        pageName : "Coffee Shops",
        fields : ["Name", "City", "Price", "Rating", "Hours today"],
        num_items_per_page : coffeeShops["metadata"]["per_page"],
        num_total_items : coffeeShops["metadata"]["num_total_results"]
    }
    
    return [
        <SearchBar/>,
        <FilterContainer api_name={CoffeeShopEndpointName} exactFilters={CoffeeShopExactFilters} rangeFilters={CoffeeShopRangeFilters} timeOptions={TimeOptions}/>,
        <Sorter api_name={CoffeeShopEndpointName} sortOptions={CoffeeShopSortOptions}/>,
        getModel(payload)
    ];
}

export default CoffeeShops;