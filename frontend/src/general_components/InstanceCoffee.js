import React, { useState, useEffect } from "react";
import { useParams, Link, BrowserRouter as Router, Route } from "react-router-dom";


import Figure from 'react-bootstrap/Figure';
import Container from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import './InstanceTemplate.css';
import Splash from '../pages/Splash'
import MapComponent from "./MapComponent";


const InstanceCoffee = () => {
    console.log("SUPPPPP");

    const { businessID } = useParams();
      console.log(businessID);
      const [isLoading, setIsLoading] = useState(true);
      const [data, setData] = useState();
    
      useEffect(() => {
        fetch(`../instance_apis/${businessID}.json`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
          .then((res) => res.json())
          .then((response) => {
            setData(response);
            setIsLoading(false);
          })
          .catch((error) => console.log(error));
      }, [businessID]);

    return (
        <>
          {!isLoading && (
            <div className="bennu-coffee-austin">
             	<Container className="header" >
             		<Row>
             			<Col className="image">
         				<Figure>
             					<Figure.Image src={data.image_url} />
             				</Figure>
             			</Col>
             			<Col className="stats">
                            <div className="stat">{data.name}</div>
                            <div className="stat">{data.display_phone}</div>
                            <div className="stat">{data.review_count} reviews</div>
                            <div className="stat">{data.location.address1}</div>
                            <div className="stat">{data.location.city} {data.location.state} {data.location.zip_code}</div>
                            <div className="stat">Price: {data.price}</div>
                            <div className="stat">Rating: {data.rating.toFixed(1)}</div>
                            <div className="stat">Website: <a href={data.url}>{data.url}</a></div>
             			</Col>
                        <MapComponent name={data.name} address={data.location.address1} latitude={data.coordinates.latitude} longitude={data.coordinates.longitude}/>
             		</Row>
             	</Container>
             	<Accordion className="info">
             	<Accordion.Item eventKey="0">
             		<Accordion.Header>Title</Accordion.Header>
             		    {/* <Accordion.Body className="body"> {body_text}
             		</Accordion.Body> */}
                    {/* supposed to be description here */}
             	</Accordion.Item>
             	</Accordion>
             	</div>
          )}
        </>
    );
}

export default InstanceCoffee;