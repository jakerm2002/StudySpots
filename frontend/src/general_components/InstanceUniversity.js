import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import styles from './InstanceTemplate.module.css'
import MapComponent from "./MapComponent";
import NearbyCoffeeShop from './NearbyCoffeeShop.js';
import NearbyLibrary from './NearbyLibrary.js';
import { Button, Carousel, Col, Container, Row } from "react-bootstrap";
import { Divider } from "@mui/material";

var currencyFormat = {style: 'currency', currency: 'USD', minimumFractionDigits: 0}
var populationFormat = {style: 'decimal', minimumFractionDigits: 0}


const InstanceUniversity = () => {
    const { universityID } = useParams();
      console.log(universityID);
      const [isLoading, setIsLoading] = useState(true);
      const [data, setData] = useState();
    
      useEffect(() => {
        axios.get('https://api.studyspots.me/universities/' + universityID).then(response => {
            console.log("response",response.data);
            setData(response.data);
            console.log(data)
            setIsLoading(false);
            
        });
      })

    return (
        <>
          {!isLoading && (
            <div className={styles.general}>
              <h1>{data.name}</h1>
              <Divider className={styles.divider}>🎓</Divider>
              <Container className={styles.spacing}>
                <Carousel>
                  <Carousel.Item>
                    <img
                      className={`d-block w-50 ${styles.image}`}
                      src={data.photo}
                      alt={data.name}
                    />
                  </Carousel.Item>
                </Carousel>
              </Container>
              <Container className={`${styles.spacing} ${styles.styleCard}`}>
                <div>
                  <b>Alias:</b> {data.alias}
                </div>
                <div>
                  <b>Address:</b> {data.city}, {data.state} {data.zipcode}
                </div>
                <div>
                  <b>Website: </b>
                  <a href={data.url.startsWith("http") ? data.url : '//' + data.url}>{data.url}</a>
                </div>
                <Button
                  className={styles.spacing}
                  variant="dark"
                  onClick={() => 
                    navigator.clipboard.writeText(
                      data.name + '\n' + data.city + ' ' + data.state + ' ' + data.zipcode + '\n' + data.url
                    )
                  }
                >
                  Copy Information
                </Button>
              </Container>
              <Container className={`${styles.spacing} ${styles.styleCard}`}>
                <div>
                  <b>Undergraduate Population:</b> {data.size.toLocaleString("en-US", populationFormat)}
                </div>
                <div>
                  <b>In-State Tuition:</b> {data.instate_tuition.toLocaleString("en-US", currencyFormat)}
                </div>
                <div>
                  <b>Out-of-State Tuition:</b> {data.outstate_tuition.toLocaleString("en-US", currencyFormat)}
                </div>
                <div>
                  <b>Acceptance Rate:</b> {(data.acceptance_rate* 100).toFixed(1)+'%'}
                </div>
              </Container>
              <Container className={`${styles.spacing} ${styles.styleCard}`}>
                <h4>Description</h4>
                <div className={styles.spacing}>
                  {data.description}
                </div>
              </Container>
              <Container className={`${styles.spacing} ${styles.styleCard}`}>
                <h4>Map</h4>
                <MapComponent name={data.name} address={data.city} latitude={data.latitude} longitude={data.longitude}/>
              </Container>
              <Container className={styles.spacing}>
                <Row>
                  <Col className={`${styles.spacing} ${styles.styleCard} ${styles.spacing_side}`}>
                    <NearbyCoffeeShop latitude={data.latitude} longitude={data.longitude}/>
                  </Col>
                  <Col className={`${styles.spacing} ${styles.styleCard} ${styles.spacing_side}`}>
                    <NearbyLibrary latitude={data.latitude} longitude={data.longitude}/>
                  </Col>
                </Row>
              </Container>
            </div>
          )}
        </>
    );
}

export default InstanceUniversity;