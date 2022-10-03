import React, {useState} from "react";
import { SliderData } from './SliderData';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import logo from '../images/StudySpotsCircle.png';
import { Row } from "react-bootstrap";
import {Link} from 'react-router-dom';
import './Splash.css';

const intervalTime = 10000; 


const ModelCards = () => {
    return (
        <div>
             <Row className="modelCardsContainer">
                <h1>Model Cards</h1>
                 <Card className="modelCard">
                     <div className="image">
                         <Card.Img variant="top" src="https://images.unsplash.com/photo-1531259736756-6caccf485f81?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHVuaXZlcnNpdHl8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60" />
                         <Card.Body>
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
                         <Card.Body>
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
                         <Card.Body>
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

const AboutCard = () => {
    return (
        <div>
            <div className="modelCardContainer" >
            <h1>About Us</h1>
                    <Card className="aboutCard" >
                        <div className="image">
                            <Card.Img variant="top" src={logo} />
                            <Card.Body>
                                <Card.Title>Meet Our Team</Card.Title>
                                <Card.Text>
                                    Find out more about our team and the goal behind StudySpots.
                                </Card.Text>
                                <div>
                                    <Link to='/About'>
                                        <Button variant="primary">Learn more </Button>
                                    </Link>
                                </div>
                            </Card.Body>
                        </div>
                    </Card>
                </div>
        </div>
    );

}

const ImageSlider = () => {
    const [slideIndex, setIndex] = useState(0);
    const length = SliderData.length;
    const timeoutRef = React.useRef(null);

    function resetTimeout() {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      }

    React.useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
            () => setIndex((prevIndex) =>
                    prevIndex === length -1 ? 0 : prevIndex + 1),
                    intervalTime
        );

        return () => {
            resetTimeout();
        };
    }, [slideIndex, length]);

    return (
        <section className="slider">


            {SliderData.map((slide, index) => {
                return (
                    <div className={index === slideIndex ? 'slide active' : 'slideAnimation'} key={index}>
                        {index === slideIndex && ( <img src={slide.image} alt="this is the alt" className="slideImage" />
                        )}
                        
                    </div>
                    )
                })}
        </section>
    );
}

const Splash = () => {

    return (
       <div>
            <h1 className="mainHeader">Welcome to Study Spots!</h1>
            <ImageSlider/>
            <ModelCards/>
            <AboutCard/>
            
       </div>
    );
};

export default Splash;
