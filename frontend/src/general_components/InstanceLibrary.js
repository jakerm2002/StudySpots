import React, { useState, useEffect } from "react";
import { useParams, Link, BrowserRouter as Router, Route } from "react-router-dom";
import Figure from 'react-bootstrap/Figure';
import Container from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import './InstanceTemplate.css';
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
             	<Container className="header" >
             		<Row>
             			<Col className="image">
         				<Figure>
             					<Figure.Image src={data.img} />
             				</Figure>
             			</Col>
				<Col>
				<Container className="stats">
					<Row className="stat">{data.name}</Row>
					<Row className="stat">Currently {data.opening_hours.open_now ? "open" : "closed"}</Row>
					<Row className="stat">Address: {data.formatted_address}</Row>
					<Row className="stat">Rating: {data.rating}</Row>
					<Row className="stat">Telephone: {data.telephone}</Row>
				</Container>
             			</Col>
             		</Row>
             	</Container>
		<div className="body">
			<Row>
				<Col className="col">
				<Accordion className = "info">
				<Accordion.Item eventKey="0">
					<Accordion.Header>{"About " + data.name}</Accordion.Header>
					<Accordion.Body className="text"> {"body_text"}
					</Accordion.Body> 
				</Accordion.Item>
				</Accordion>
				</Col>
				<Col className = "col">
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