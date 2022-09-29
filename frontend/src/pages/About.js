import React, { useEffect, useState } from 'react';
import { Card, Row, Table } from 'react-bootstrap';
import './About.css';
import JoanneChenImg from '../images/joanne_chen.png';
import AWSImg from '../images/aws.png';
import CollegeImg from '../images/college_logo.png';
import DockerImg from '../images/docker.png';
import GitLabImg from '../images/gitlab_logo.png';
import GoogleMapsImg from '../images/google_maps.png';
import ReactBootstrapImg from '../images/react_bootstrap.png';
import ReactImg from '../images/react_logo.png';
import ReactRouterImg from '../images/react_router_logo.png';
import YelpImg from '../images/yelp_logo.png';

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
        "name" : "Ami Iyer",
        "photo": "",
        "bio" : "",
        "responsibility": "",
        "username": "Amritha Iyer",
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

const tools = [
    {
        "name": "React",
        "image": ReactImg,
        "description": "We used React to create the overall website UI and design. ",
    },
    {
        "name": "React Router",
        "image": ReactRouterImg,
        "description": "We used React Router in order to create connections and allow navigation between the different pages.",
    },
    {
        "name": "React Bootstrap",
        "image": ReactBootstrapImg,
        "description": "We used React Bootstrap since it already included some basic components that we could use.",
    },
    {
        "name": "AWS Amplify",
        "image": AWSImg,
        "description": "We used AWS Amplify to host the website.",
    },
    {
        "name": "Docker",
        "image": DockerImg,
        "description": "We used Docker to be able to create the environment and all the installations necessary for development.",
    },
    {
        "name": "GitLab",
        "image": GitLabImg,
        "description": "We used GitLab for source control, collaboration, and to keep track of issues.",
    },
]

const apis = [
    {
        "name": "GitLab API",
        "image": GitLabImg,
        "description": "We used the GitLab API to fetch information about the number of commits and issues on the repo."
    },
    {
        "name": "Google Maps API",
        "image": GoogleMapsImg,
        "description": "We used the Google Maps API to fetch information for each of the library instances.",
    },
    {
        "name": "Yelp API",
        "image": YelpImg,
        "description": "We used the Yelp API to display information for each of the coffee shops.",
    },
    {
        "name": "College Score Card API",
        "image": CollegeImg,
        "description": "We used the College Score Card API to display information for each of the university instances.",
    },
]

// Make requets 
async function fetchCommitAndIssuesInfo() {
    let numCommits = 0;
    const commitResponse = await fetch("https://gitlab.com/api/v4/projects/39620976/repository/commits?per_page=100");
    const commitInfo = await commitResponse.json();
    
    commitInfo.forEach((commit) => {
        numCommits += 1
        teamMembers.forEach((member) => {
            if(commit.author_name === member["username"]
            || commit.author_name === member["name"]) {
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
                if (assignee.name === member["name"] || assignee.username === member["username"]) {
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

function aggregateTests() {
    let numTests = 0;
    teamMembers.forEach((member) => {
        numTests += member["tests"];
    })
    return numTests;
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
                <Card.Text><b>Tests: </b>{props.person["tests"]}</Card.Text>
            </Card.Body>
        </Card>
    )
};

const Tool = (props) => {
    return (
        <Card style = {{ width: '15rem'}}>
            <Card.Body>
                <Card.Img variant="top" src={props.tool["image"]}/>
                <Card.Title>{props.tool["name"]}</Card.Title>
                <Card.Text>{props.tool["description"]}</Card.Text>
            </Card.Body>
        </Card>
    )
}

const About = () => {
    const [isFetched, setFetched] = useState(false);
    const [numCommits, setNumCommits] = useState();
    const [numIssues, setNumIssues] = useState();
    const numTests = aggregateTests();

    useEffect(() => {
        const fetchInfo = async() => {
            if (!isFetched) {
                let info = await fetchCommitAndIssuesInfo();
                setNumCommits(info["numCommits"]);
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
            <div className="center">
                <p>StudySpots focuses on helping college students explore the areas around their campus while finding less busy places to work. StudySpots aims at helping college students quickly find locations nearby them and locations that meet all of the requirements for their standards to help them quickly get their work done.</p>
            </div>
            <h3>Discovery</h3>
            <div className='center'>
                <p>When creating these connections between different libraries, universities, and coffee shops, we noticed...</p>
            </div>
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
            <Card style = {{width: '75%'}} className="team">
                <Card.Body>
                    <Card.Text><b>Commits: </b>{numCommits}</Card.Text>
                    <Card.Text><b>Issues: </b>{numIssues}</Card.Text>
                    <Card.Text><b>Tests: </b>{numTests}</Card.Text>
                </Card.Body>
            </Card>
        </div>,
        <div className="techInfo">
            <h1>Technology Used</h1>
            <h3>Tools</h3>
            <div className="center">
                <Table>
                    <tbody>
                        <tr>
                        {tools.map(tool => (
                            <td><Tool tool={tool}/></td>
                        ))}
                        </tr>                    
                    </tbody>
                </Table>
            </div>
            <h3>APIs Scraped</h3>
            <div className="center">
                <Table>
                    <tbody>
                        <tr>
                            {apis.map(api => (
                                <td><Tool tool={api}/></td>
                            ))}
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    ];
}

export default About;
