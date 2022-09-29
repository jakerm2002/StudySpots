import React from "react";
// {useState}
// import Carousel from 'react-bootstrap/Carousel';
// import { SliderData } from "../images/SliderData";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Row } from "react-bootstrap";

const Splash = () => {
    // const [current,setCurrent] = useState(0)
    // const length = slides.length
    return (
       <div>
            <Row style={{padding: '2rem'}}>
                <Card style={{ width: '26rem' }}>
                    <div style={{marginTop: '2rem'}}>
                        <Card.Img variant="top" src="https://images.unsplash.com/photo-1531259736756-6caccf485f81?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHVuaXZlcnNpdHl8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60" />
                        <Card.Body>
                            <Card.Title>Universities</Card.Title>
                            <Card.Text>
                                Find your university!
                            </Card.Text>
                            <Button variant="primary">Learn more</Button>
                        </Card.Body>
                    </div>
                </Card>
                <Card style={{ width: '26rem'}}>
                    <div style={{marginTop: '2rem'}}>
                        <Card.Img variant="top" src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y29mZmVlJTIwc2hvcHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60" />
                        <Card.Body>
                            <Card.Title>Coffee Shops</Card.Title>
                            <Card.Text>
                                Find coffee shops near you!
                            </Card.Text>
                            <Button variant="primary">Learn more</Button>
                        </Card.Body>
                    </div>
                </Card>
                <Card style={{ width: '26rem' }}>
                    <div style={{marginTop: '2rem'}}>
                        <Card.Img variant="top" src="https://images.unsplash.com/photo-1588580000645-4562a6d2c839?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGxpYnJhcnl8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60" />
                        <Card.Body>
                            <Card.Title>Libraries</Card.Title>
                            <Card.Text>
                                Find Libraries near you!
                            </Card.Text>
                            <Button variant="primary">Learn more</Button>
                        </Card.Body>
                    </div>
                </Card>
            </Row>
            
       </div>
    );
};

 // <>
            
        //     {/* {SliderData.map((slide, index) => {
        //         return (
        //             <img src={slide.image}
        //             alt="tthis is the alt" />
        //         )
        //     })} */}
        // </>

export default Splash;
