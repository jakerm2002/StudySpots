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
            //console.log(`https://api.yelp.com/v3/businesses/${businessID}`);
          })
          .catch((error) => console.log(error));
      }, [businessID]);

    //   console.log(data.name);
    //   return (
    //     <div>Hello</div>
    //   );

    //   return(
    //     <div className="bennu-coffee-austin">
	// 	<Container className="header" >
	// 		<Row>
	// 			<Col className="image">
	// 				<Figure>
	// 					<Figure.Image src={data.image_url} />
	// 				</Figure>
	// 			</Col>
	// 			<Col className="stats">
	// 			{/* {info_list.map(event => <div className="stat"> {event} </div> )} */}
	// 			</Col>
	// 		</Row>
	// 	</Container>
	// 	<Accordion className="info">
	// 	<Accordion.Item eventKey="0">
	// 		<Accordion.Header>Title</Accordion.Header>
	// 		{/* <Accordion.Body className="body"> {body_text}
	// 		</Accordion.Body> */}
	// 	</Accordion.Item>
	// 	</Accordion>
	// 	</div>
    //   )



    // return (
    //     <>
    //       {!isLoading && (
    //         <>
    //           <h1>Name: {data.name}</h1>
    //           <h2>Height: {data.height}</h2>
    //           <h2>Mass: {data.mass}</h2>
    //           <h2>Hair Color: {data.hair_color}</h2>
    //           <h2>Skin Color: {data.skin_color}</h2>
    //           <h2>Eye Color: {data.eye_color}</h2>
    //           <h2>Birth Year: {data.birth_year}</h2>
    //           <h2>Gender: {data.gender}</h2>
    //           <Link to="/">Back to homepage</Link>
    //         </>
    //       )}
    //     </>
    // );

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
             			{/* {info_list.map(event => <div className="stat"> {event} </div> )} */}
                            <div className="stat">{data.name}</div>
                            <div className="stat">{data.display_phone}</div>
                            <div className="stat">{data.review_count} reviews</div>
                            <div className="stat">{data.location.address1}</div>
                            <div className="stat">{data.location.city} {data.location.state} {data.location.zip_code}</div>
                            <div className="stat">{data.name}</div>
                            <div className="stat">{data.name}</div>
                            <div className="stat">{data.name}</div>
             			</Col>
                        <MapComponent latitude={data.coordinates.latitude} longitude={data.coordinates.longitude}/>
             		</Row>
             	</Container>
             	<Accordion className="info">
             	<Accordion.Item eventKey="0">
             		<Accordion.Header>Title</Accordion.Header>
             		    {/* <Accordion.Body className="body"> {body_text}
             		</Accordion.Body> */}
             	</Accordion.Item>
             	</Accordion>
             	</div>
          )}
        </>
    );
}

export default InstanceCoffee;