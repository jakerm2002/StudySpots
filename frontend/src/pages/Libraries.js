import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Row } from "react-bootstrap";
import {Link} from 'react-router-dom';
import './Splash.css';

const Libraries = () => {

    return (
        <div>
            <div className = "title">
                <h1>Libraries</h1>
            </div>
             <Row className = "modelCardsContainer">
                <div class = "col-4">
                    <Card className="modelCard">
                        <div className="image">
                            <Card.Img variant="top" src="https://lh5.googleusercontent.com/p/AF1QipMvucsEJ4bZ8K_kHeFNzmOEauWp-4xycpitkq96=w408-h276-k-no" />
                            <Card.Body>
                                <Card.Title>Fondren Library</Card.Title>
                                <Card.Text>
                                    Rice University
                                </Card.Text>
                                <div>
                                    <Link to='/Universities'>
                                        <Button variant="primary">Learn more </Button>
                                    </Link>
                                </div>
                            </Card.Body>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">6100 South Main Street, Houston, TX 77005</li>
                            <li class="list-group-item">Monday, 7AM–9PM</li>
                            <li class="list-group-item">https://library.rice.edu/</li>
                            <li class="list-group-item">+17133485698</li>
                        </ul>
                    </Card>
                 </div>
                 <div class = "col-4">
                    <Card className="modelCard">
                        <div className="image">
                            <Card.Img variant="top" src="https://lh5.googleusercontent.com/p/AF1QipNcdFVf9PA5qgniYjxf4ISKSx6FO0E55YmgXTNA=w408-h287-k-no" />
                            <Card.Body>
                                <Card.Title>Austin Central Library</Card.Title>
                                <Card.Text>
                                    University of Texas
                                </Card.Text>
                                <div>
                                    <Link to='/CoffeeShops'>
                                        <Button variant="primary">Learn more </Button>
                                    </Link>
                                </div>
                            </Card.Body>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">710 W Cesar Chavez St, Austin, TX 78701</li>
                            <li class="list-group-item">Monday, 9AM–8PM</li>
                            <li class="list-group-item">http://library.austintexas.gov/central-library</li>
                            <li class="list-group-item">+15129747400</li>
                        </ul>
                    </Card>
                 </div>
                 <div class = "col-4">
                    <Card className="modelCard">
                        <div className="image">
                            <Card.Img variant="top" src="https://www.eyrc.com/hubfs/EYRC_June2021/Images/439-wbl-phf06-tb-lrg11.jpg" />
                            <Card.Body>
                                <Card.Title>Westwood Branch Library</Card.Title>
                                <Card.Text>
                                    University of California, Los Angeles
                                </Card.Text>
                                <div>
                                    <Link to='/Libraries'>
                                        <Button variant="primary">Learn more </Button>
                                    </Link>
                                </div>
                            </Card.Body>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">1246 Glendon Ave, Los Angeles, CA 90024</li>
                            <li class="list-group-item">Monday, 10AM–8PM</li>
                            <li class="list-group-item">http://www.lapl.org/branches/westwood</li>
                            <li class="list-group-item">+13104741739</li>
                            
                        </ul>
                    </Card>
                 </div>
             </Row>
             
        </div>
     );
};

export default Libraries;
