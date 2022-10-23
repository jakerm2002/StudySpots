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


const InstanceCoffee = () => {
    const { businessID } = useParams();
      const [isLoading, setIsLoading] = useState(true);
      const [data, setData] = useState([]);
    
      useEffect(() => {
        axios.get('http://api.studyspots.me/coffeeshops/' + businessID).then(response => {
            console.log("response",response.data);
            setData(response.data);
            console.log(data)
            setIsLoading(false);
            
        },
        reject => {
            console.log("REJECT");
        });
      }, [])

    return (
        <>
          {!isLoading && (
            <div>
              <div className={styles.instance_temp_title}>{data.name}</div>
             	<Container className={styles.instance_temp_header} >
             		<Row>
             			<Col className={styles.instance_temp_image}>
                            <Figure>
                                <Figure.Image className={styles.instance_temp_picture} src={data.image_url} />
                            </Figure>
             			</Col>
             			<Col>
                            <Container className={styles.instance_temp_stats}>
                                <Row className={styles.instance_temp_stat}>{data.review_count} reviews</Row>
                                <Row className={styles.instance_temp_stat}>{data.address1}</Row>
                                <Row className={styles.instance_temp_stat}>{data.city} {data.state} {data.zipcode}</Row>
                                <Row className={styles.instance_temp_stat}>Price: {data.price}</Row>
                                <Row className={styles.instance_temp_stat}>Rating: {data.rating.toFixed(1)}</Row>
                                {/* <Row className={styles.instance_temp_stat}>{<a href={`/Universities/${data.nearby_places[0].href}`}>{data.nearby_places[0].name}</a>}</Row>
                                <Row className={styles.instance_temp_stat}>{<a href={`/Libraries/${data.nearby_places[1].href}`}>{data.nearby_places[1].name}</a>}</Row> */}
                            </Container>
             			</Col>
             		</Row>
             	</Container>
              <div className={styles.instance_temp_body}>
                <Row>
                  <Col className={styles.instance_temp_col}>
                  <Accordion className={styles.instance_temp_info}>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>{"Reviews and Ratings for " + data.name}</Accordion.Header>
                    <Accordion.Body className={styles.instance_temp_text}> {data.review_1_author + " : " + data.review_1_rating}</Accordion.Body> 
                    <Accordion.Body className={styles.instance_temp_text}> {data.review_2_author + " : " + data.review_2_rating}</Accordion.Body> 
                    <Accordion.Body className={styles.instance_temp_text}> {data.review_3_author + " : " + data.review_3_rating}</Accordion.Body> 
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