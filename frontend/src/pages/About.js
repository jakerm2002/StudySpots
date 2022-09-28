import React from 'react';
import './About.css';
import { Card, Row } from 'react-bootstrap';

const teamMembers = [
    {
        "name" : "Bianca Alavrado",
        "photo": "",
        "bio" : "",
        "responsibility": "",
    },
    {
        "name" : "Joanne Chen",
        "photo": "",
        "bio" : "",
        "responsibility": "",
    },
    {
        "name" : "Vincent Chen",
        "photo": "",
        "bio" : "",
        "responsibility": "",
    },
    {
        "name" : "Ami Iyer",
        "photo": "",
        "bio" : "",
        "responsibility": "",
    },
    {
        "name" : "Jake Medina",
        "photo": "",
        "bio" : "",
        "responsibility": "",
    },
];

const Profile = (props) => {
    return (
        <Card className="profileCard">
            <Card.Body>
                <Card.Title>{props.person["name"]}</Card.Title>
                <Card.Text>{props.person["bio"]}</Card.Text>
                <Card.Text>Responsibility: {props.person["responsibility"]}</Card.Text>
            </Card.Body>
        </Card>
    )
};

const About = () => {
    return[
        <div className="info">
            <h1>StudySpots</h1>
            <h3>Mission</h3>
            <p></p>
            <h3>Discovery</h3>
        </div>,
        <div className="teamInfo">
            <h1>Meet the Team</h1>
            <h3>Members</h3>
            <Row xs={4} md={4} className="profiles">
                {teamMembers.map(teamMember => (
                    <Profile person={teamMember}/>
                ))}
            </Row>
            <h3>Team Stats</h3>
        </div>,
        <div className="techInfo">
            <h1>Technology Used</h1>
            <h3>Tools</h3>
            <h3>APIs Scraped</h3>
        </div>
    ];
}

export default About;
