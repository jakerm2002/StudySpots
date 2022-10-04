import React, { useState, useEffect } from "react";
import { useParams, Link, BrowserRouter as Router, Route } from "react-router-dom";
import Figure from 'react-bootstrap/Figure';
import Container from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import styles from './InstanceTemplate.module.css';
import MapComponent from "./MapComponent";


const InstanceLibrary = () => {
    const { businessID } = useParams();
    console.log(businessID)
      const [isLoading, setIsLoading] = useState(true);
      const [data, setData] = useState();
      useEffect(() => {
        fetch(`../library_instances/${businessID}.json`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
          .then((res) => res.json())
          .then((response) => {
	    console.log("RESPONSE: ", response.results[0])
            setData(response.results[0]);
            setIsLoading(false);
          })
          .catch((error) => console.log("Error!! ", error));
      }, [businessID]);
    return (
        <>
          {!isLoading && (
            <div>
		<div className={styles.instance_temp_title}>{data.name}</div>
             	<Container className={styles.instance_temp_header} >
             		<Row>
             			<Col className={styles.instance_temp_image}>
         				<Figure>
             					<Figure.Image src={data.img} />
             				</Figure>
             			</Col>
				<Col>
				<Container className={styles.instance_temp_stats}>
					<Row className={styles.instance_temp_stat}>Currently {data.opening_hours.open_now ? "open" : "closed"}</Row>
					<Row className={styles.instance_temp_stat}>{data.formatted_address}</Row>
					<Row className={styles.instance_temp_stat}>Rating: {data.rating}</Row>
				</Container>
             			</Col>
             		</Row>
             	</Container>
		<div className={styles.instance_temp_body}>
			<Row>
				<Col className={styles.instance_temp_col}>
				<Accordion className={styles.instance_temp_info}>
				<Accordion.Item eventKey="0">
					<Accordion.Header>{"About " + data.name}</Accordion.Header>
					<Accordion.Body className={styles.instance_temp_text}> {"body_text"}
					</Accordion.Body> 
				</Accordion.Item>
				</Accordion>
				</Col>
				<Col className={styles.instance_temp_col}>
					<MapComponent name={data.name} address={data.formatted_address} latitude={data.geometry.location.lat} longitude={data.geometry.location.lng}/>
				</Col>
			</Row>

		</div>
             	</div>
          )}
        </>
    );
}

export default InstanceLibrary;