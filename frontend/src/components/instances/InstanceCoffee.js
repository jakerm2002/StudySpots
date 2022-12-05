import axios from "axios";
import styles from '../instance_components/InstanceTemplate.module.css'
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MapComponent from "../instance_components/MapComponent";
import NearbyLibrary from '../nearby/NearbyLibrary.js';
import NearbyUniversity from '../nearby/NearbyUniversity.js';
import WeatherWidget from "../instance_components/WeatherWidget";
import { Divider } from "@mui/material";
import { Button, Carousel, Container, Figure, Row, Col, Accordion, Card } from "react-bootstrap";
import TravelTime from "../instance_components/TravelTime";


const InstanceCoffee = () => {
  const { businessID } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://api.studyspots.me/coffeeshops/' + businessID).then(response => {
      console.log("response", response.data);
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
          <WeatherWidget latitude={data.latitude} longitude={data.longitude} />
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
                  <b>Address:</b><br />
                  {data.address1}<br />
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
                  <b>Hours (in CT):</b> <br />
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
            <Row>
              <Col>
                <Card className={`cards`}>
                  {data.review_1_author !== "N/A"
                    ? <Card.Body><Card.Title>
                      {data.review_1_rating + "/5 stars"}
                    </Card.Title>
                      <Card.Subtitle>
                        {data.review_1_author}
                      </Card.Subtitle>
                      <Card.Text>
                        {data.review_1_text}
                      </Card.Text>
                    </Card.Body>
                    : <Card.Title>
                      {"No Rating Available"}
                    </Card.Title>
                  }
                </Card>
              </Col>
              <Col>
                <Card className={`cards`}>
                  {data.review_2_author !== "N/A"
                    ? <Card.Body><Card.Title>
                      {data.review_2_rating + "/5 stars"}
                    </Card.Title>
                      <Card.Subtitle>
                        {data.review_2_author}
                      </Card.Subtitle>
                      <Card.Text>
                        {data.review_2_text}
                      </Card.Text>
                    </Card.Body>
                    : <Card.Title>
                      {"No Rating Available"}
                    </Card.Title>
                  }
                </Card>
              </Col>
              <Col>
                <Card className={`cards`}>
                  {data.review_3_author !== "N/A"
                    ? <Card.Body><Card.Title>
                      {data.review_3_rating + "/5 stars"}
                    </Card.Title>
                      <Card.Subtitle>
                        {data.review_3_author}
                      </Card.Subtitle>
                      <Card.Text>
                        {data.review_3_text}
                      </Card.Text>
                    </Card.Body>
                    : <Card.Title>
                      {"No Rating Available"}
                    </Card.Title>
                  }
                </Card>
              </Col>
            </Row>
          </Container>
          <Container className={`cards ${styles.spacing} ${styles.styleCard}`}>
            <h4>Map</h4>
            <MapComponent name={data.name} address={data.address1} latitude={data.latitude} longitude={data.longitude} />
            <TravelTime instanceLatitude={data.latitude} instanceLongitude={data.longitude} />
          </Container>
          <Container className={styles.spacing}>
            <Row>
              <Col className={`cards ${styles.spacing} ${styles.styleCard} ${styles.spacing_side}`}>
                <NearbyUniversity latitude={data.latitude} longitude={data.longitude} />
              </Col>
              <Col className={`cards ${styles.spacing} ${styles.styleCard} ${styles.spacing_side}`}>
                <NearbyLibrary latitude={data.latitude} longitude={data.longitude} />
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </>
  );
}

export default InstanceCoffee;