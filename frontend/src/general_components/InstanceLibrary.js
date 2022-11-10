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
import NearbyUniversity from './NearbyUniversity.js';
import NearbyCoffeeShop from './NearbyCoffeeShop.js';
import Divider from "@mui/material/Divider";

const InstanceLibrary = () => {
    const { businessID } = useParams();
    console.log(businessID)
      const [isLoading, setIsLoading] = useState(true);
      const [data, setData] = useState();

      useEffect(() => {
        axios.get('https://api.studyspots.me/libraries/' + businessID).then(response => {
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
				<Container className={styles.instance_container} >
					<Row>
						<div className={styles.instance_temp_title}>{data.name}</div>
					</Row>
					<Divider className={styles.instance_divider}>📖</Divider>
							<Row>
								<Col>
									<Container className={styles.instance_temp_stats}>
										<Row className={styles.instance_temp_text}><Button className={styles.instance_temp_button} onClick={() =>  navigator.clipboard.writeText(data.name + '\n' + data.address + '\n' + data.phone)}>Copy Information</Button></Row>
										<Row className={styles.instance_temp_text }>{data.address}</Row>
										<Row className={styles.instance_temp_text}><a href={data.website}>{data.website}</a></Row>
										<br/>
										<Row className={styles.instance_temp_text }>Rating: {data.rating}</Row>
										<Row className={styles.instance_temp_text }>Telephone: {data.phone}</Row>
										<br/>
										<Row className={`${styles.instance_temp_text} ${styles.instance_temp_hours}`}> {data.formatted_hours}</Row>
										<br/>
										<NearbyUniversity latitude={data.latitude} longitude={data.longitude} />
										<NearbyCoffeeShop latitude={data.latitude} longitude={data.longitude} />
									</Container>
								</Col>
								<Col className={styles.instance_temp_image}>
									<Figure>
										<Figure.Image src={data.photo_link} />
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
									{data.review_1_author !== "N/A" ? <Accordion.Body className={styles.instance_temp_text}> {data.review_1_rating + "/5 stars - " + data.review_1_author + " : " + data.review_1_text} </Accordion.Body>  : <Accordion.Body className={styles.instance_temp_text}>{"No Ratings Available"}</Accordion.Body> }
									{data.review_2_author !== "N/A" ? <Accordion.Body className={styles.instance_temp_text}> {data.review_2_rating + "/5 stars - " + data.review_2_author + " : " + data.review_2_text}</Accordion.Body>  : ""}
									{data.review_3_author !== "N/A" ? <Accordion.Body className={styles.instance_temp_text}> {data.review_3_rating + "/5 stars - " + data.review_3_author + " : " + data.review_3_text}</Accordion.Body>  : ""}
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