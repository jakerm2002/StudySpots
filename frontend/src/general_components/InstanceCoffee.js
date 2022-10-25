import React, { useState, useEffect } from "react";
import { useParams, Link, BrowserRouter as Router, Route } from "react-router-dom";
import Figure from 'react-bootstrap/Figure';
import Container from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button'
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import styles from './InstanceTemplate.module.css';
import MapComponent from "./MapComponent";
import axios from "axios";
import NearbyLibrary from './NearbyLibrary.js';
import NearbyUniversity from './NearbyUniversity.js';


const InstanceCoffee = () => {
    const { businessID } = useParams();
      const [isLoading, setIsLoading] = useState(true);
      const [data, setData] = useState([]);
      const [businessHours, setBusinessHours] = useState([]);
    
      useEffect(() => {
        axios.get('https://api.studyspots.me/coffeeshops/' + businessID).then(response => {
            console.log("response",response.data);
            setData(response.data);
            console.log(data)
            setIsLoading(false);
            setBusinessHours(response.data.hours_arr);
            
        },
        reject => {
            console.log("REJECT");
        });
      }, [])

    return (
        <>
          {!isLoading && (
            <div>
                <Container className={styles.instance_container} >
                  <Row>
                    <div className={styles.instance_temp_title}>{data.name}</div>
                  </Row>
                  <Row>
                    <Col>
                        <Container className={styles.instance_temp_stats}>
                            <Row className={styles.instance_temp_text}><Button className={styles.instance_temp_button} onClick={() =>  navigator.clipboard.writeText(data.name + '\n' + data.address1 + '\n' + data.city + ' ' + data.state + ' ' + data.zipcode + '\n' + data.phone)}>Copy Information</Button></Row>
                            <Row className={styles.instance_temp_text}>{data.review_count} reviews</Row>
                            <br/>
                            <Row className={styles.instance_temp_text}>{data.address1}</Row>
                            <Row className={styles.instance_temp_text}>{data.city} {data.state} {data.zipcode}</Row>
                            <br/>
                            <Row className={styles.instance_temp_text}>Phone: {data.phone}</Row>
                            <Row className={styles.instance_temp_text}>Price: {data.price}</Row>
                            <Row className={styles.instance_temp_text}>Rating: {data.rating.toFixed(1)}</Row>
                            <br/>
                            <Row className={styles.instance_temp_text}> {data.formatted_hours}</Row>
                            <br/>
                            <NearbyUniversity latitude={data.latitude} longitude={data.longitude}/>
                            <NearbyLibrary latitude={data.latitude} longitude={data.longitude}/>
                        </Container>
                    </Col>
                    <Col className={styles.instance_temp_image}>
                        <Figure>
                            <Figure.Image className={styles.instance_temp_picture} src={data.image_url} />
                        </Figure>
                    </Col>
                  </Row>
                </Container>
              <div className={styles.instance_temp_body}>
                <Row>
                  <Col className={styles.instance_temp_col}>
                  <Accordion className={styles.instance_temp_info}>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>{"Reviews and Ratings for " + data.name}</Accordion.Header>
                    <Accordion.Body className={styles.instance_temp_text}> {data.review_1_rating + "/5 stars - " + data.review_1_author + " : " + data.review_1_text}</Accordion.Body> 
                    <Accordion.Body className={styles.instance_temp_text}> {data.review_2_rating + "/5 stars - " + data.review_2_author + " : " + data.review_2_text}</Accordion.Body> 
                    <Accordion.Body className={styles.instance_temp_text}> {data.review_3_rating + "/5 stars - " + data.review_3_author + " : " + data.review_3_text}</Accordion.Body> 
                  </Accordion.Item>
                  </Accordion>
                  </Col>
                  <Col className={styles.instance_temp_col}>
                  <MapComponent name={data.name} address={data.address1} latitude={data.latitude} longitude={data.longitude}/>
                  </Col>
                </Row>

              </div>
             	</div>
          )}
        </>
    );
}

export default InstanceCoffee;