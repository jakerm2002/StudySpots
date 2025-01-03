import React, { useEffect, useState } from 'react';
import { Button, Card, Row, Table } from 'react-bootstrap';
import styles from './About.module.css';
import JoanneChenImg from '../images/joanne_chen.png';
import AmiImg from '../images/AmiIyer.png';
import BiancaAlvImg from '../images/bianca_alvarado.png';
import VincentImg from "../images/vincent.png";
import JakeImg from "../images/jake_medina.png"
import AWSImg from '../images/aws.png';
import CollegeImg from '../images/college_logo.png';
import DockerImg from '../images/docker.png';
import GitLabImg from '../images/gitlab_logo.png';
import FlaskImg from '../images/flask_logo.png'
import NamecheapImg from '../images/namecheap_logo.svg'
import PostgreSQLImg from '../images/postgresql_logo.png'
import MUIImg from '../images/MUI_logo.png'
import BlackImg from '../images/black_logo.png'
import FlaskSQLAlchemyImg from '../images/flaskSQLalchemy_logo.webp'
import SQLAlchemyImg from '../images/SQLalchemy_logo.jpeg'
import GoogleMapsImg from '../images/google_maps.png';
import ReactBootstrapImg from '../images/react_bootstrap.png';
import ReactImg from '../images/react_logo.png';
import ReactRouterImg from '../images/react_router_logo.png';
import YelpImg from '../images/yelp_logo.png';

const teamMembers = [
    {
        "name" : "Bianca Alvarado",
        "photo": BiancaAlvImg,
        "bio" : "I'm a senior CS major with a minor in Business! I'm from Houston, TX. In my free time I enjoy playing board games and binge watching shows with friends :)",
        "responsibility": "Frontend",
        "possible_names": ["Bianca Alvarado", "bianca.alvarado", "Bianca M Alvarado"],
        "commits": 0,
        "issues": 0,
        "tests": 0,
    },
    {
        "name" : "Joanne Chen",
        "photo": JoanneChenImg,
        "bio" : "I'm a junior majoring in CS and minoring in Philosophy and Chinese (hopefully!). I'm from Frisco, TX. I enjoy cooking, random crafts like crochet, and just trying new things in general whether that be traveling or restaurants!",
        "responsibility": "Full-Stack + Phase I Leader",
        "possible_names": ["Joanne Chen", "joannejchen", "chen.joanne", "Joanne J Chen"],
        "commits": 0,
        "issues": 0,
        "tests": 0,
    },
    {
        "name" : "Vincent Chen",
        "photo": VincentImg,
        "bio" : "My name is Vincent Chen and I'm a junior majoring in computer science and minoring in scientific computation and data sciences. I'm from Allen, Texas, and my free time, I like to watch TV, play video games, or lift weights.",
        "responsibility": "Frontend",
        "possible_names": ["Vincent Chen", "vincentchen913"],
        "commits": 0,
        "issues": 0,
        "tests": 0,
    },
    {
        "name" : "Ami Iyer",
        "photo": AmiImg,
        "bio" : "Hello! I'm Ami, a junior majoring in CS and Linguistics with a minor in French. I went to school in Plano, TX and I really enjoy cooking, singing, and decorating my apartment in my free time :)",
        "responsibility": "Full-Stack + Phase III Leader",
        "possible_names": ["Ami Iyer", "Amritha Iyer", "amrithaiyer02"],
        "commits": 0,
        "issues": 0,
        "tests": 0,
    },
    {
        "name" : "Jake Medina",
        "photo": JakeImg,
        "bio" : "Hey! I'm Jake and I'm a junior majoring in CS with a minor in business. I grew up here in Austin and I love hiking, photography, and the gym.",
        "responsibility": "Full-Stack + Phase II Leader",
        "possible_names": ["Jake Medina", "jakem02"],
        "commits": 0,
        "issues": 0,
        "tests": 0,
    },
];

const tools = [
    {
        "name": "React",
        "image": ReactImg,
        "link": "https://reactjs.org/",
        "description": "We used React to create the overall website UI and design. ",
    },
    {
        "name": "React Router",
        "image": ReactRouterImg,
        "link": "https://reactrouter.com/en/main",
        "description": "We used React Router in order to create connections and allow navigation between the different pages.",
    },
    {
        "name": "React Bootstrap",
        "image": ReactBootstrapImg,
        "link": "https://react-bootstrap.github.io/",
        "description": "We used React Bootstrap since it already included some basic components that we could use.",
    },
    {
        "name": "AWS Amplify",
        "image": AWSImg,
        "link": "https://aws.amazon.com/amplify/",
        "description": "We used AWS Amplify to host the website.",
    },
    {
        "name": "Docker",
        "image": DockerImg,
        "link": "https://www.docker.com/",
        "description": "We used Docker to be able to create the environment and all the installations necessary for development.",
    },
    {
        "name": "GitLab",
        "image": GitLabImg,
        "link": "https://gitlab.com/",
        "description": "We used GitLab for source control, collaboration, and to keep track of issues.",
    },
    {
        "name": "Flask",
        "image": FlaskImg,
        "link": "https://flask.palletsprojects.com/en/2.2.x/",
        "description": "We used Flask to create the backend API application that runs on our web server.",
    },
    {
        "name": "Namecheap",
        "image": NamecheapImg,
        "link": "https://www.namecheap.com/",
        "description": "We used Namecheap to get a free domain for our AWS Amplify frontend.",
    },
    {
        "name": "PostgreSQL",
        "image": PostgreSQLImg,
        "link": "https://www.postgresql.org/",
        "description": "We used PostgreSQL as our backend relational database system.",
    },
    {
        "name": "Material UI",
        "image": MUIImg,
        "link": "https://mui.com/",
        "description": "We used Material UI for frontend components like dropdowns and sliders.",
    },
    {
        "name": "Black",
        "image": BlackImg,
        "link": "https://github.com/psf/black",
        "description": "We used Black to format our Python code.",
    },
]

const apis = [
    {
        "name": "GitLab API",
        "image": GitLabImg,
        "link": "https://docs.gitlab.com/ee/api/",
        "description": "We used the GitLab API to fetch information about the number of commits and issues on the repo."
    },
    {
        "name": "Google Maps API",
        "image": GoogleMapsImg,
        "link": "https://developers.google.com/maps",
        "description": "We used the Google Maps API to fetch information for each of the library instances.",
    },
    {
        "name": "Yelp API",
        "image": YelpImg,
        "link": "https://www.yelp.com/developers",
        "description": "We used the Yelp API to display information for each of the coffee shops.",
    },
    {
        "name": "College Score Card API",
        "image": CollegeImg,
        "link": "https://collegescorecard.ed.gov/data/",
        "description": "We used the College Score Card API to display information for each of the university instances.",
    },
]

// Make requets 
async function fetchCommitAndIssuesInfo() {
    let numCommits = 0;
    const commitResponse = await fetch("https://gitlab.com/api/v4/projects/39620976/repository/contributors");
    const contributorInfo = await commitResponse.json();
    
    contributorInfo.forEach((contributor) => {
        numCommits += contributor.commits;
        teamMembers.forEach((member) => {
            let isMember = false;
            member["possible_names"].forEach((name) => {
                if(contributor.name === name) {
                    isMember = true;
                }
            })
            if(isMember) {
                member["commits"] = contributor.commits;
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
                let isMember = false;
                member["possible_names"].forEach((name) => {
                    if(assignee.name === name || assignee.username === name) {
                        isMember = true;
                    }
                })
                if(isMember) {
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
        <Card className={`cards ${styles.profileCard}`} style={{ width: '425px' }}>
            <Card.Img className='mt-3' variant="top" src={props.person["photo"]}/>
            <Card.Body className="text">
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
        <Card className={`cards`} style = {{width: '15rem', height: '20rem'}}>
            <Card.Img className={styles.toolCard} variant="top" src={props.tool["image"]}/>
            <Card.Body className="text">
                <a href={props.tool["link"]}>
                    <Card.Title>{props.tool["name"]}</Card.Title>
                </a>
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

    // // Don't load page yet until the stats have been fetched.
    // if (!isFetched) {
    //     return <></>
    // }

    return[
        <div className={styles.info}>
            <h1 className="text">About StudySpots</h1>
            <h3 className="text">Mission</h3>
            <div className={styles.center}>
                <p className="text">StudySpots focuses on helping college students explore the areas around their campus while finding less busy places to work. StudySpots aims at helping college students quickly find locations nearby them and locations that meet all of the requirements for their standards to help them quickly get their work done.</p>
            </div>
        </div>,
        <div className={styles.teamInfo}>
            <h1 className="text">Meet the Team</h1>
            <h3 className="text">Members</h3>
            {
                isFetched ? (
                    <div>
                        <Row xs={4} md={4} className={styles.profiles}>
                            {teamMembers.map(teamMember => (
                                <Profile person={teamMember}/>
                            ))}
                        </Row>
                        <h3 className="text">Team Stats</h3>
                        <Card style = {{width: '75%'}} className={`cards ${styles.team}`}>
                            <Card.Body className="text">
                                <Card.Text><b>Commits: </b>{numCommits}</Card.Text>
                                <Card.Text><b>Issues: </b>{numIssues}</Card.Text>
                                <Card.Text><b>Tests: </b>{numTests}</Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                ) : (<div></div>)}
            
        </div>,
        <div className={styles.techInfo}>
            <h1 className="text">Technology Used</h1>
            <h3 className="text">Tools</h3>
            <div className={styles.center}>
                <Table className={styles.aboutTable}>
                    <tbody className='cardsBackground'>
                        <tr>
                        {tools.map(tool => (
                            <td key={tool.name}><Tool tool={tool}/></td>
                        ))}
                        </tr>                    
                    </tbody>
                </Table>
            </div>
            <h3 className="text">APIs Scraped</h3>
            <div className={styles.center}>
                <Table className={styles.aboutTable}>
                    <tbody className='cardsBackground'>
                        <tr>
                            {apis.map(api => (
                                <td key={api.name}><Tool tool={api}/></td>
                            ))}
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>,
        <div className={styles.project_links}>
            <h3 className="text">Project Links</h3>
            <Button href="https://gitlab.com/jakem02/cs373-idb" variant="dark">GitLab Project Repository</Button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button href="https://documenter.getpostman.com/view/23653833/2s83tGoBu1" variant="dark">Postman API Documentation</Button>
        </div>,
    ];
}

export default About;
