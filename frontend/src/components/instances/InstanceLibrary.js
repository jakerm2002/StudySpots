import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from '../instance_components/InstanceTemplate.module.css';
import MapComponent from "../instance_components/MapComponent";
import NearbyUniversity from '../nearby/NearbyUniversity.js';
import NearbyCoffeeShop from '../nearby/NearbyCoffeeShop.js';
import { Accordion, Button, Carousel, Container, Col, Figure, Row, Card } from "react-bootstrap";
import Divider from "@mui/material/Divider";
import WeatherWidget from "../instance_components/WeatherWidget";
import TravelTime from "../instance_components/TravelTime";

const InstanceLibrary = () => {
	const { businessID } = useParams();
	console.log(businessID)
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState();

	useEffect(() => {
		axios.get('https://api.studyspots.me/libraries/' + businessID).then(response => {
			console.log("response", response.data);
			setData(response.data);
			console.log(data)
			setIsLoading(false);

		});
	}, [])

	return (
		<>
			{!isLoading && (
				<div className={`text ${styles.general} topSpacing`}>
					<h1>{data.name}</h1>
					<WeatherWidget latitude={data.latitude} longitude={data.longitude} />
					<Divider className={styles.divider}>📖</Divider>
					<Container className={styles.spacing}>
						<Carousel>
							<Carousel.Item>
								<Figure.Image
									className={`d-block w-50 ${styles.image}`}
									src={data.photo_link}
									alt={data.name}
								/>
								<Figure.Caption className={styles.caption}>
									Image Source: {data.photo_link}
								</Figure.Caption>
							</Carousel.Item>
						</Carousel>
					</Container>
					<Container className={`cards ${styles.spacing} ${styles.styleCard}`}>
						<Row>
							<Col>
								<div>
									<b>Address: </b> {data.address}
								</div>
								<div>
									<b>Phone Number: </b> {data.phone}
								</div>
								<div>
									<b>Website: </b>
									<a href={data.website}>{data.website}</a>
								</div>
							</Col>
							<Col>
								<div>
									<b>Hours (in CT): </b> <br />
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
									data.name + '\n' + data.address + '\n' + data.phone
								)
							}
						>
							Copy Information
						</Button>
					</Container>
					<Container className={`cards ${styles.spacing} ${styles.styleCard}`}>
						<div>
							<b>Overall Rating: </b> {data.rating}
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
						<MapComponent name={data.name} address={data.address} latitude={data.latitude} longitude={data.longitude} />
						<TravelTime instanceLatitude={data.latitude} instanceLongitude={data.longitude} />
					</Container>
					<Container className={styles.spacing}>
						<Row>
							<Col className={`cards ${styles.spacing} ${styles.styleCard} ${styles.spacing_side}`}>
								<NearbyUniversity latitude={data.latitude} longitude={data.longitude} />
							</Col>
							<Col className={`cards ${styles.spacing} ${styles.styleCard} ${styles.spacing_side}`}>
								<NearbyCoffeeShop latitude={data.latitude} longitude={data.longitude} />
							</Col>
						</Row>
					</Container>
				</div>
			)}
		</>
	);
}

export default InstanceLibrary;