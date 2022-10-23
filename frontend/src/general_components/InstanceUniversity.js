import React, { useState, useEffect } from "react";
import { useParams, Link, BrowserRouter as Router, Route } from "react-router-dom";


import Figure from 'react-bootstrap/Figure';
import Container from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import styles from './InstanceUniversity.module.css'
import MapComponent from "./MapComponent";
import axios from "axios";

var currencyFormat = {style: 'currency', currency: 'USD', minimumFractionDigits: 0}
var populationFormat = {style: 'decimal', minimumFractionDigits: 0}


const InstanceUniversity = () => {
    const { universityID } = useParams();
      console.log(universityID);
      const [isLoading, setIsLoading] = useState(true);
      const [data, setData] = useState();
    
      useEffect(() => {
        axios.get('http://api.studyspots.me/universities/' + universityID).then(response => {
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
                    <Row className={styles.fields}>
                      <Col className={styles.instance_temp_image}>
         				            <Figure>
             					        <Figure.Image src={data.photo} />
             				        </Figure>
             			        </Col>

                        <Col sm>
                            {/* <div className={styles.fieldName}>{data.results.id}</div> */}
                            <div className={styles.fieldName}>{data.alias}</div>
                            <div className={styles.fieldName}>{data.city}, {data.state} {data.zipcode}</div>
                            <div className={styles.fieldName}><a href={data.url}>{data.url}</a></div>
                            <br></br>
                            <div className={styles.entry}><div className={styles.fieldName}>Undergraduate Population: </div>{data.size.toLocaleString("en-US", populationFormat)}</div>
                            <div className={styles.entry}><div className={styles.fieldName}>Cost of attendance: </div>{data.instate_tuition.toLocaleString("en-US", currencyFormat)} (In-state)      {data.outstate_tuition.toLocaleString("en-US", currencyFormat)} (Out-of-state)</div>
                            <div className={styles.entry}><div className={styles.fieldName}>Acceptance rate: </div>{(data.acceptance_rate* 100).toFixed(1)+'%'}</div>
                            {/* <div className={styles.instance_temp_stat}>{<a href={`/Libraries/${data.results[0].nearby_places[1].href}`}>{data.results[0].nearby_places[1].name}</a>}</div>
                            <div className={styles.instance_temp_stat}>{<a href={`/CoffeeShops/${data.results[0].nearby_places[0].href}`}>{data.results[0].nearby_places[0].name}</a>}</div> */}

                        </Col>


                          
                     </Row>
                     <Row>
                        <Col>
                            <Accordion className={styles.instance_temp_info}>
                              <Accordion.Item eventKey="0">
                                  <Accordion.Header>{"About " + data.name}</Accordion.Header>
                                  <Accordion.Body className={styles.instance_temp_text}> {data.description}
                                  </Accordion.Body> 
                              </Accordion.Item>
                            </Accordion>
                            </Col>
                          <Col>
                            <MapComponent name={data.name} address={data.city}/>
                          </Col>
                        {/* <Row className={styles.instance_temp_col}> */}
                        
                        {/* </Row> */}
                     </Row>
             	</Container>
            </div>
          )}
        </>
    );
}

export default InstanceUniversity;