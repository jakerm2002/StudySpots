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
import NearbyUniversity from './NearbyUniversity.js';
import NearbyCoffeeShop from './NearbyCoffeeShop.js';

const InstanceLibrary = () => {
    const { businessID } = useParams();
    console.log(businessID)
      const [isLoading, setIsLoading] = useState(true);
      const [data, setData] = useState();

      useEffect(() => {
        axios.get('http://api.studyspots.me/libraries/' + businessID).then(response => {
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
             					<Figure.Image src={data.photo_link} />
             				</Figure>
             			</Col>
				<Col>
				<Container className={styles.instance_temp_stats}>
					{/* <Row className={styles.instance_temp_stat}>Currently {data.opening_hours.open_now ? "open" : "closed"}</Row> */}
					<Row className={styles.instance_temp_stat}>{data.address}</Row>
					<Row className={styles.instance_temp_stat}>Rating: {data.rating}</Row>
					<Row className={styles.instance_temp_stat}>Telephone: {data.phone}</Row>
					<NearbyUniversity zipcode={data.zipcode} />
					<NearbyCoffeeShop zipcode={data.zipcode} />
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
					{data.review_1_author !== "N/A" ? <Accordion.Body className={styles.instance_temp_text}> {data.review_1_author + " : " + data.review_1_rating}</Accordion.Body>  : <Accordion.Body className={styles.instance_temp_text}>{"No Ratings Available"}</Accordion.Body> }
					{data.review_2_author !== "N/A" ? <Accordion.Body className={styles.instance_temp_text}> {data.review_2_author + " : " + data.review_2_rating}</Accordion.Body>  : ""}
					{data.review_3_author !== "N/A" ? <Accordion.Body className={styles.instance_temp_text}> {data.review_3_author + " : " + data.review_3_rating}</Accordion.Body>  : ""}
				</Accordion.Item>
				</Accordion>
				</Col>
				<Col className={styles.instance_temp_col}>
					<MapComponent name={data.name} address={data.address} latitude={data.latitude} longitude={data.longitude}/>
				</Col>
			</Row>

		</div>
             	</div>
          )}
        </>
    );
}

export default InstanceLibrary;