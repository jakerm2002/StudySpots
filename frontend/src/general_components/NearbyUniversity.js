import React, { useState, useEffect } from "react";
import { useParams, Link, BrowserRouter as Router, Route } from "react-router-dom";
import Figure from 'react-bootstrap/Figure';
import Container from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import styles from './InstanceTemplate.module.css';
import MapComponent from "./MapComponent";
import axios from "axios";

const NearbyUniversity = ({zipcode}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();

    useEffect(() => {
    axios.get('http://api.studyspots.me/universities?zipcode=' + zipcode).then(response => {
        // console.log("response",response.data);
        setData(response.data);
        console.log("AAAAAAAAA");
        
        setIsLoading(false);
        console.log(data);
        
    },
    reject => {
        console.log("REJECT");
    });
    }, [])

    return (<>{!isLoading && (
        <Row className={styles.instance_temp_stat}>{<a href={`/Universities/${data[0].id}`}>{data[0].name}</a>}</Row>)}</>);


}

export default NearbyUniversity