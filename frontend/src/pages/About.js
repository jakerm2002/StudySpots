import React, { useEffect, useState } from 'react';
import './About.css';
import { Card, Row } from 'react-bootstrap';
import JoanneChenImg from '../images/joanne_chen.png';

const teamMembers = [
    {
        "name" : "Bianca Alavrado",
        "photo": "",
        "bio" : "",
        "responsibility": "",
        "username": "",
        "commits": 0,
        "issues": 0,
        "tests": 0,
    },
    {
        "name" : "Joanne Chen",
        "photo": JoanneChenImg,
        "bio" : "I'm a junior majoring in CS and minoring in Philosophy and Chinese (hopefully!). I'm from Frisco, TX. I enjoy cooking, random crafts like crochet, and just trying new things in general whether that be traveling or restaurants!",
        "responsibility": "Full-Stack + Phase I Leader",
        "username": "joannejchen",
        "commits": 0,
        "issues": 0,
        "tests": 0,
    },
    {
        "name" : "Vincent Chen",
        "photo": "",
        "bio" : "",
        "responsibility": "",
        "username": "",
        "commits": 0,
        "issues": 0,
        "tests": 0,
    },
    {
        "name" : "Amritha Iyer",
        "photo": "",
        "bio" : "",
        "responsibility": "",
        "username": "",
        "commits": 0,
        "issues": 0,
        "tests": 0,
    },
    {
        "name" : "Jake Medina",
        "photo": "",
        "bio" : "",
        "responsibility": "",
        "username": "",
        "commits": 0,
        "issues": 0,
        "tests": 0,
    },
];

// Make requets 
async function fetchCommitAndIssuesInfo() {
    let numCommits = 0;
    const commitResponse = await fetch("https://gitlab.com/api/v4/projects/39620976/repository/commits?per_page=100");
    const commitInfo = await commitResponse.json();
    
    commitInfo.forEach((commit) => {
        numCommits += 1
        teamMembers.forEach((member) => {
            if(commit.author_name == member["username"]
            || commit.author_name == member["name"]) {
                member["commits"] += 1;
            }
        }) 
    });

    let numIssues = 0;
    const issueResponse = await fetch("https://gitlab.com/api/v4/projects/39620976/issues?per_page=100");
    const issueInfo = await issueResponse.json();
    
    issueInfo.forEach((issue) => {
        numIssues += 1;
        teamMembers.forEach((member) => {
            issue.assignees.forEach((assignee) => {
                if (assignee.name == member["name"] || assignee.username == member["username"]) {
                    member["issues"] += 1;
                }
            });
        }) 
    });

    return {
        "numCommits" : numCommits,
        "numIssues" : numIssues,
    };

}

const Profile = (props) => {

    return (
        <Card className="profileCard">
            <Card.Body>
                <Card.Img variant="top" src={props.person["photo"]}/>
                <Card.Title>{props.person["name"]}</Card.Title>
                <Card.Text>{props.person["bio"]}</Card.Text>
                <Card.Text><b>Responsibility: </b>{props.person["responsibility"]}</Card.Text>
                <Card.Text><b>Commits: </b>{props.person["commits"]}</Card.Text>
                <Card.Text><b>Issues: </b>{props.person["issues"]}</Card.Text>
            </Card.Body>
        </Card>
    )
};

const About = () => {
    const [isFetched, setFetched] = useState(false);
    const [numCommits, setNumCommits] = useState();
    const [numIssues, setNumIssues] = useState();

    useEffect(() => {
        const fetchInfo = async() => {
            if (!isFetched) {
                let info = await fetchCommitAndIssuesInfo();
                setNumCommits(info["totalCommits"]);
                setNumIssues(info["numIssues"]);
                setFetched(true);
            }
        }
        fetchInfo();
    });

    // Don't load page yet until the stats have been fetched.
    if (!isFetched) {
        return <></>
    }

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
