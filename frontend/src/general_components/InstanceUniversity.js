import React, { useState, useEffect } from "react";
import { useParams, Link, BrowserRouter as Router, Route } from "react-router-dom";


import Figure from 'react-bootstrap/Figure';
import Container from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
// import './InstanceTemplate.css';
// import './InstanceUniversity.css'
import styles from './InstanceUniversity.module.css'
import Splash from '../pages/Splash'
import MapComponent from "./MapComponent";
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';

var currencyFormat = {style: 'currency', currency: 'USD', minimumFractionDigits: 0}
var populationFormat = {style: 'decimal', minimumFractionDigits: 0}


const InstanceUniversity = () => {
    console.log("SUPPPPP");

    const { universityID } = useParams();
      console.log(universityID);
      const [isLoading, setIsLoading] = useState(true);
      const [data, setData] = useState();
    
      useEffect(() => {
        fetch(`../instance_apis/${universityID}.json`, {
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
      }, [universityID]);
      console.log(data);
      console.log("heyoheyo");
    //   console.log(data.results.latest);
    return (
        
        <>
          {!isLoading && (
            <div>
             	<Container className={styles.instance_container}>
                    <Row>
                        <div className={styles.instance_header}>{data.results[0].latest.school.name}</div>
                    </Row>
                    <Row className={styles.fields}>
                        <Col sm>
                            {/* <div className={styles.fieldName}>{data.results.id}</div> */}
                            <div className={styles.fieldName}>{data.results[0].latest.school.alias}</div>
                            <div className={styles.fieldName}>{data.results[0].latest.school.city}, {data.results[0].latest.school.state} {data.results[0].latest.school.zip}</div>
                            <div className={styles.fieldName}><a href={data.results[0].latest.school.school_url}>{data.results[0].latest.school.school_url}</a></div>
                            <br></br>
                            <div className={styles.entry}><div className={styles.fieldName}>Undergraduate Population: </div>{data.results[0].latest.student.size.toLocaleString("en-US", populationFormat)}</div>
                            <div className={styles.entry}><div className={styles.fieldName}>Cost of attendance: </div>{data.results[0].latest.cost.tuition.in_state.toLocaleString("en-US", currencyFormat)} (In-state)      {data.results[0].latest.cost.tuition.out_of_state.toLocaleString("en-US", currencyFormat)} (Out-of-state)</div>
                            <div className={styles.entry}><div className={styles.fieldName}>Acceptance rate: </div>{(data.results[0].latest.admissions.admission_rate.overall * 100).toFixed(1)+'%'}</div>
                            <div className={styles.instance_temp_stat}>{<a href={`/Libraries/${data.results[0].nearby_places[1].href}`}>{data.results[0].nearby_places[1].name}</a>}</div>
                            <div className={styles.instance_temp_stat}>{<a href={`/CoffeeShops/${data.results[0].nearby_places[0].href}`}>{data.results[0].nearby_places[0].name}</a>}</div>

                        </Col>
                        <Col sm>
                        <TwitterTimelineEmbed sourceType="profile" screenName={data.results[0].latest.school.twitter} options={{height:400, width: 400}}/>
                        </Col>
                        <Col sm>
                            <MapComponent name={data.results[0].latest.school.name} address={data.results[0].latest.school.city}/>
                        </Col>
                    </Row>
             	</Container>
            </div>
          )}
        </>
    );
}

export default InstanceUniversity;