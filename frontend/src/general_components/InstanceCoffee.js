import axios from "axios";
import styles from './InstanceTemplate.module.css'
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MapComponent from "./MapComponent";
import NearbyLibrary from './NearbyLibrary.js';
import NearbyUniversity from './NearbyUniversity.js';
import WeatherWidget from "./WeatherWidget";
import { Divider } from "@mui/material";
import { Button, Carousel, Container, Figure, Row, Col, Accordion } from "react-bootstrap";
import TravelTime from "./TravelTime";


const InstanceCoffee = () => {
    const { businessID } = useParams();
      const [isLoading, setIsLoading] = useState(true);
      const [data, setData] = useState([]);
    
      useEffect(() => {
        axios.get('https://api.studyspots.me/coffeeshops/' + businessID).then(response => {
            console.log("response",response.data);
            setData(response.data);
            console.log(data)
            setIsLoading(false);
        });
      }, []);
    
    return (
        <>
          {!isLoading && (
            <div className={`text ${styles.general} topSpacing`}>
              <h1>{data.name}</h1>
              <WeatherWidget latitude={data.latitude} longitude={data.longitude}/>
              <Divider className={styles.divider}>☕</Divider>
              <Container className={styles.spacing}>
                <Carousel>
                  {data.image_url !== ""
                  ? <Carousel.Item>
                      <Figure.Image
                        className={`d-block w-50 ${styles.image}`}
                        src={data.image_url}
                        alt={data.name}
                      />
                      <Figure.Caption className={styles.caption}>
                        Image Source: {data.image_url}
                      </Figure.Caption>
                    </Carousel.Item>
                  : <Carousel.Item>
                      <img
                        className={`d-block w-50 ${styles.image}`}
                        src="https://www.escapeauthority.com/wp-content/uploads/2116/11/No-image-found.jpg"
                        alt="Unable to display coffee shop"
                      />
                    </Carousel.Item>
                  }
                  {data.image_2_url !== "" && (
                        <Carousel.Item>
                            <Figure.Image
                              className={`d-block w-50 ${styles.image}`}
                              src={data.image_2_url}
                              alt={data.name}
                            />
                            <Figure.Caption className={styles.caption}>
                              Image Source: {data.image_2_url}
                            </Figure.Caption>
                          </Carousel.Item>
                  )}
                  {data.image_3_url !== "" && (
                        <Carousel.Item>
                            <Figure.Image
                              className={`d-block w-50 ${styles.image}`}
                              src={data.image_3_url}
                              alt={data.name}
                            />
                            <Figure.Caption className={styles.caption}>
                              Image Source: {data.image_3_url}
                            </Figure.Caption>
                          </Carousel.Item>
                  )}
                </Carousel>
              </Container>
              <Container className={`cards ${styles.spacing} ${styles.styleCard}`}>
                <Row>
                  <Col>
                    <div>
                      <b>Address:</b><br/>
                      {data.address1}<br/>
                      {data.city}, {data.state} {data.zipcode}
                    </div>
                    <div>
                      <b>Phone Number:</b> {data.phone}
                    </div>
                    <div>
                      <b>Price:</b> {data.price}
                    </div>
                  </Col>
                  <Col>
                    <div>
                      <b>Hours (in CT):</b> <br/>
                      <div className={styles.hours}>
                        {data.formatted_hours}
                      </div>
                    </div>
                  </Col>
                </Row>
                <Button
                  className={styles.spacing}
                  variant="dark"
                  onClick={() => 
                    navigator.clipboard.writeText(
                      data.name + '\n' + data.address1 + '\n' + data.city + ' ' + data.state + ' ' + data.zipcode + '\n' + data.phone
                    )
                  }
                >
                  Copy Information
                </Button>
              </Container>
              <Container className={`cards ${styles.spacing} ${styles.styleCard}`}>
                <div>
                  <b>Overall Rating:</b> {data.rating.toFixed(1)}
                </div>
                <div>
                  <b>Number of Reviews:</b> {data.review_count}
                </div>
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Review #1</Accordion.Header>
                    <Accordion.Body>
                      {data.review_1_author !== "N/A" 
                        ? <Accordion.Body>
                          {data.review_1_rating + "/5 stars - " + data.review_1_author + " : " + data.review_1_text}
                          </Accordion.Body>
                        : <Accordion.Body>
                          {"No Ratings Available"}
                          </Accordion.Body>
                      }
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>Review #2</Accordion.Header>
                    <Accordion.Body>
                      {data.review_2_author !== "N/A" 
                        ? <Accordion.Body>
                          {data.review_2_rating + "/5 stars - " + data.review_2_author + " : " + data.review_2_text}
                          </Accordion.Body>
                        : <Accordion.Body>
                          {"No Ratings Available"}
                          </Accordion.Body>
                      }
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>Review #3</Accordion.Header>
                    <Accordion.Body>
                      {data.review_3_author !== "N/A" 
                        ? <Accordion.Body>
                          {data.review_3_rating + "/5 stars - " + data.review_3_author + " : " + data.review_3_text}
                          </Accordion.Body>
                        : <Accordion.Body>
                          {"No Ratings Available"}
                          </Accordion.Body>
                      }
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Container>
              <Container className={`cards ${styles.spacing} ${styles.styleCard}`}>
                <h4>Map</h4>
                <MapComponent name={data.name} address={data.address1} latitude={data.latitude} longitude={data.longitude}/>
                <TravelTime instanceLatitude={data.latitude} instanceLongitude={data.longitude}/>
              </Container>
              <Container className={styles.spacing}>
                <Row>
                  <Col className={`cards ${styles.spacing} ${styles.styleCard} ${styles.spacing_side}`}>
                    <NearbyUniversity latitude={data.latitude} longitude={data.longitude}/>
                  </Col>
                  <Col className={`cards ${styles.spacing} ${styles.styleCard} ${styles.spacing_side}`}>
                    <NearbyLibrary latitude={data.latitude} longitude={data.longitude}/>
                  </Col>
                </Row>
              </Container>
            </div>
          )}
        </>
    );
}

export default InstanceCoffee;