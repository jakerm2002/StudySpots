import React, { useState, useEffect } from "react";
import { useParams, Link, BrowserRouter as Router, Route } from "react-router-dom";
import Figure from 'react-bootstrap/Figure';
import Container from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import './InstanceTemplate.css';
import MapComponent from "./MapComponent";


const InstanceCoffee = () => {
    const { businessID } = useParams();
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
            <div>
             	<Container className="header" >
             		<Row>
             			<Col className="image">
                    <Figure>
                          <Figure.Image className="picture" src={data.image_url} />
                    </Figure>
             			</Col>
             			<Col>
                  <Container className="stats">
                            <Row className="stat">{data.name}</Row>
                            <Row className="stat">{data.review_count} reviews</Row>
                            <Row className="stat">{data.location.address1}</Row>
                            <Row className="stat">{data.location.city} {data.location.state} {data.location.zip_code}</Row>
                            <Row className="stat">Price: {data.price}</Row>
                            <Row className="stat">Rating: {data.rating.toFixed(1)}</Row>
                  </Container>

                            {/* <div className="stat">Website: <a href={data.url}>{data.url}</a></div> */}
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
                  <MapComponent name={data.name} address={data.location.address1} latitude={data.coordinates.latitude} longitude={data.coordinates.longitude}/>
                  </Col>
                </Row>

              </div>
             	</div>
          )}
        </>
    );
}

export default InstanceCoffee;