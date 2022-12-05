import { Navbar, Nav, Container } from 'react-bootstrap';
import './Navigation.css';
import Button from 'react-bootstrap/Button';

const Navigation = (props) => {
    return (
        <>
            <Navbar collapseOnSelect expand='lg' className="navBar">
                <Container>
                    <Navbar.Brand className="Nav-link" href="/" style={{ fontWeight: 600 }}>
                        StudySpots
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Nav className="me-auto">
                            <Nav.Link className="Nav-link" href='/'>Home</Nav.Link>
                            <Nav.Link className="Nav-link" href="/Search">Search</Nav.Link>
                            <Nav.Link className="Nav-link" href='/CoffeeShops'>Coffee Shops</Nav.Link>
                            <Nav.Link className="Nav-link" href='/Libraries'>Libraries</Nav.Link>
                            <Nav.Link className="Nav-link" href='/Universities'>Universities</Nav.Link>
                            <Nav.Link className="Nav-link" href="/Visualizations">Visualizations</Nav.Link>
                            <Nav.Link className="Nav-link" href="/ProviderVisualizations">Provider Visualizations</Nav.Link>
                            <Nav.Link className="Nav-link" href='/About'>About</Nav.Link>
                        </Nav>
                        <Nav>
                            <div className='switchButton'>
                                <label>{props.theme === "light" ? "Light Mode" : "Dark Mode"} </label>
                                <Button onClick={props.toggleTheme} />
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Navigation