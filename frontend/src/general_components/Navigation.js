import { Navbar, Nav, Container } from 'react-bootstrap';
import './Navigation.css';

const Navigation = () => {
    return (
        <>
            <Navbar collapseOnSelect expand='lg' className="navBar">
                <Container>
                    <Navbar.Brand className="Title-text" href="/" style={{ color: 'white', fontWeight:600 }}>
                        StudySpots
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Nav>
                            <Nav.Link className="Nav-link" href='/'>Home</Nav.Link>
                            <Nav.Link className="Nav-link" href="/Search">Search</Nav.Link>
                            <Nav.Link className="Nav-link" href='/CoffeeShops'>Coffee Shops</Nav.Link>
                            <Nav.Link className="Nav-link" href='/Libraries'>Libraries</Nav.Link>
                            <Nav.Link className="Nav-link" href='/Universities'>Universities</Nav.Link>
                            <Nav.Link className="Nav-link" href="/Visualizations">Visualizations</Nav.Link>
                            <Nav.Link className="Nav-link" href="/ProviderVisualizations">Provider Visualizations</Nav.Link>
                            <Nav.Link className="Nav-link" href='/About'>About</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Navigation