import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import styles from './InstanceTemplate.module.css';
import axios from "axios";

const NearbyCoffeeShop = ({latitude, longitude}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();

    useEffect(() => {
    axios.get('https://api.studyspots.me/coffeeshops?latitude=' + latitude + '&longitude=' + longitude).then(response => {
        setData(response.data);
        setIsLoading(false);
    },
    reject => {
        console.log("REJECT");
    });
    }, [])

    console.log(data);
    if (!isLoading && data.length == 0){
        return (<Row className={styles.instance_temp_stat}>{<p>Nearby coffee shops not found</p>}</Row>);
    } else {
        return (<>{!isLoading && data.map(
            (info) => {
                return(
                    <Row className={styles.instance_temp_stat}>{<a href={`/Coffeeshops/${info.id}`}>{info.name}</a>}</Row>
                )
            }
        )}</>);
    }
}

export default NearbyCoffeeShop