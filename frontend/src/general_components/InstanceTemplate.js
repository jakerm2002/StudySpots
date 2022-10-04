import React from "react";
import Figure from 'react-bootstrap/Figure';
import {Route, Routes} from 'react-router-dom'
import Container from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Link } from 'react-router-dom';
import styles from './InstanceTemplate.module.css';

export default function getInstance(instance_info) {
	return renderPage(instance_info.Image, instance_info.Stats, instance_info.Body)
}

function renderPage(main_img, info_list, body_text) {
	const page =
		<>
		<Container className={styles.instance_temp_header} >
			<Row>
				<Col className={styles.instance_temp_image}>
					<Figure>
						<Figure.Image src={main_img} />
					</Figure>
				</Col>
				<Col className={styles.instance_temp_stats}>
				{info_list.map(event => <div className={styles.instance_temp_stat}> {event} </div> )}
				</Col>
			</Row>
		</Container>
		<Accordion className={styles.instance_temp_info}>
		<Accordion.Item eventKey="0">
			<Accordion.Header>Title</Accordion.Header>
			<Accordion.Body className={styles.instance_temp_body}> {body_text}
			</Accordion.Body>
		</Accordion.Item>
		</Accordion>
		</>
	return page
}

// export default Instance;
// export function renderHeader ()