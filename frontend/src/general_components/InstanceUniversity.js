import React, { useState, useEffect } from "react";
import { useParams, Link, BrowserRouter as Router, Route } from "react-router-dom";

import Figure from 'react-bootstrap/Figure';
import Container from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button'
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import styles from './InstanceUniversity.module.css'
import MapComponent from "./MapComponent";
import axios from "axios";
import NearbyCoffeeShop from './NearbyCoffeeShop.js';
import NearbyLibrary from './NearbyLibrary.js';
import Divider from "@mui/material/Divider";

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
            
        },
        reject => {
            console.log("REJECT");
        });
      }, [])

    return (
        
        <>
          {!isLoading && (
            <div>
             	<Container className={styles.instance_container}>
                <Row>
                    <div className={styles.instance_header}>{data.name}</div>
                </Row>
                <Divider className={styles.instance_divider}>🎓</Divider>
                    <Row className={styles.fields}>
                    <Col sm>
                            {/* <div className={styles.fieldName}>{data.results.id}</div> */}
                            <Button className={styles.instance_temp_button} onClick={() =>  navigator.clipboard.writeText(data.name + '\n' + data.city + ' ' + data.state + ' ' + data.zipcode + '\n' + data.url)}>Copy Information</Button>
                            <div className={styles.fieldName}>{data.alias}</div>
                            <div className={styles.fieldName}>{data.city}, {data.state} {data.zipcode}</div>
                            <div className={styles.fieldName}><a href={data.url.startsWith("http") ? data.url : '//' + data.url}>{data.url}</a></div>
                            <br/>
                            <div className={styles.entry}><div className={styles.fieldName}>Undergraduate Population: </div>{data.size.toLocaleString("en-US", populationFormat)}</div>
                            <div className={styles.entry}><div className={styles.fieldName}>Cost of attendance: </div>{data.instate_tuition.toLocaleString("en-US", currencyFormat)} (In-state)      {data.outstate_tuition.toLocaleString("en-US", currencyFormat)} (Out-of-state)</div>
                            <div className={styles.entry}><div className={styles.fieldName}>Acceptance rate: </div>{(data.acceptance_rate* 100).toFixed(1)+'%'}</div>
                            <br/>
                            <div className={`${styles.entry} ${styles.fieldName}`}>Nearby coffee shops: </div>
                            <div className={styles.entry}><NearbyCoffeeShop latitude={data.latitude} longitude={data.longitude} /></div>
                            <div className={`${styles.entry} ${styles.fieldName}`}>Nearby libraries: </div>
					                  <div className={styles.entry}><NearbyLibrary latitude={data.latitude} longitude={data.longitude} /></div>

                        </Col> 
                      <Col className={styles.instance_temp_image}>
         				            <Figure>
             					        <Figure.Image src={data.photo} />
             				        </Figure>
             			        </Col>

                         
                     </Row>

              </Container>
              <div className={styles.instance_temp_body}>
                    <Row>
                        <Col className={styles.instance_temp_col}>
                            <Accordion className={styles.instance_temp_info}>
                              <Accordion.Item eventKey="0">
                                  <Accordion.Header>{"About " + data.name}</Accordion.Header>
                                  <Accordion.Body className={styles.instance_temp_text}> {data.description}
                                  </Accordion.Body> 
                              </Accordion.Item>
                            </Accordion>
                          </Col>
                          <Col className={styles.instance_temp_col}>
                            <MapComponent name={data.name} address={data.city}/>
                          </Col>
                     </Row>
              </div>
            </div>
          )}
        </>
    );
}

export default InstanceUniversity;