import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import logo from '../images/StudySpotsCircle.png';
import { Carousel, Row, Image } from "react-bootstrap";
import {Link} from 'react-router-dom';
import './Splash.css';


export const ModelCards = () => {
    return (
        <div>
             <Row className="modelCardsContainer">
                <h1 className="text">Model Cards</h1>
                 <Card className="modelCard">
                     <div className="image">
                         <Card.Img variant="top" src="https://images.unsplash.com/photo-1531259736756-6caccf485f81?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHVuaXZlcnNpdHl8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60" />
                         <Card.Body className="text">
                             <Card.Title>Universities</Card.Title>
                             <Card.Text>
                                 Find your university!
                             </Card.Text>
                             <div>
                                 <Link to='/Universities'>
                                     <Button variant="primary">Learn more </Button>
                                 </Link>
                             </div>
                         </Card.Body>
                     </div>
                 </Card>
                 <Card className="modelCard">
                     <div className="image">
                         <Card.Img variant="top" src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y29mZmVlJTIwc2hvcHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60" />
                         <Card.Body className="text">
                             <Card.Title>Coffee Shops</Card.Title>
                             <Card.Text>
                                 Find coffee shops near you!
                             </Card.Text>
                             <div>
                                 <Link to='/CoffeeShops'>
                                     <Button variant="primary">Learn more </Button>
                                 </Link>
                             </div>
                         </Card.Body>
                     </div>
                 </Card>
                 <Card className="modelCard">
                     <div className="image">
                         <Card.Img variant="top" src="https://images.unsplash.com/photo-1588580000645-4562a6d2c839?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGxpYnJhcnl8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60" />
                         <Card.Body  className="text">
                             <Card.Title>Libraries</Card.Title>
                             <Card.Text>
                                 Find Libraries near you!
                             </Card.Text>
                             <div>
                                 <Link to='/Libraries'>
                                     <Button variant="primary">Learn more </Button>
                                 </Link>
                             </div>
                         </Card.Body>
                     </div>
                 </Card>
             </Row>
        </div>
     );
}

export const AboutCard = () => {
    return (
        <div>
             <Row className="modelCardsContainer">
                <h1 className="text">About Us</h1>
                        <Card className="aboutCard" >
                            <div className="image">
                                <Card.Img variant="top" src={logo} />
                                <Card.Body className="text">
                                    <Card.Title>Meet Our Team</Card.Title>
                                    <Card.Text>
                                       Find out more about our team and our mission.
                                    </Card.Text>
                                    <div>
                                        <Link to='/About'>
                                            <Button variant="primary">Learn more </Button>
                                        </Link>
                                    </div>
                                </Card.Body>
                            </div>
                        </Card>
                </Row>
        </div>
    );

}

export const SlideShow = () => {
   return (
    <div className="slider">
        <Carousel interval={8000}>
            <Carousel.Item>
                <Image
                    className="slideImage"
                    src="https://images.unsplash.com/photo-1453614512568-c4024d13c247?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80"
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h1>Welcome to StudySpots!</h1>
                    <p> Connect with your community by discovering new coffee shops and libraries near your university</p>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <Image
                    className="slideImage"
                    src="https://images.unsplash.com/photo-1623771702313-39dc4f71d275?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    alt="Second slide"
                />
                <Carousel.Caption>
                    <h1>Welcome to StudySpots!</h1>
                    <p> Connect with your community by discovering new coffee shops and libraries near your university</p>
                </Carousel.Caption>

            </Carousel.Item>

            <Carousel.Item>
                <Image
                    className="slideImage"
                    src="https://images.unsplash.com/photo-1564981797816-1043664bf78d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
                    alt="Third slide"
                />
                <Carousel.Caption>
                    <h1>Welcome to StudySpots!</h1>
                    <p> Connect with your community by discovering new coffee shops and libraries near your university</p>
                </Carousel.Caption>

            </Carousel.Item>


        </Carousel>
    </div>
   );
}

const Splash = () => {

    return (
       <div>
            <SlideShow/>
            <ModelCards/>
            <AboutCard/>
            
       </div>
    );
};

export default Splash;
