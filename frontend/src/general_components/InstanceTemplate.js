import React from "react";
import Figure from 'react-bootstrap/Figure';
import Container from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Link } from 'react-router-dom';
import './InstanceTemplate.css';

export default function getInstance(instance_info) {
	return renderPage(instance_info.Image, instance_info.Stats, instance_info.Body)
}

function renderPage(main_img, info_list, body_text) {
	const page =
		<>
		<Container className="header" >
			<Row>
				<Col className="image">
					<Figure>
						<Figure.Image src={main_img} />
					</Figure>
				</Col>
				<Col className="stats">
				{info_list.map(event => <div className="stat"> {event} </div> )}
				</Col>
			</Row>
		</Container>
		<Accordion className="info">
		<Accordion.Item eventKey="0">
			<Accordion.Header>Title</Accordion.Header>
			<Accordion.Body className="body"> {body_text}
			</Accordion.Body>
		</Accordion.Item>
		</Accordion>
		</>
	return page
}

// export default Instance;
// export function renderHeader ()