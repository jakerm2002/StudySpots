import { Navbar, Nav, Container } from 'react-bootstrap';
import './Navigation.css';

const Navigation = () => {
    return (
        <>
            <Navbar className="navBar">
                <Container>
                    <Nav >
                        <Nav.Link className="Nav-link" href='/'>Home</Nav.Link>
                        <Nav.Link className="Nav-link" href="/Search">Search</Nav.Link>
                        <Nav.Link className="Nav-link" href='/CoffeeShops'>Coffee Shops</Nav.Link>
                        <Nav.Link className="Nav-link" href='/Libraries'>Libraries</Nav.Link>
                        <Nav.Link className="Nav-link" href='/Universities'>Universities</Nav.Link>
                        <Nav.Link className="Nav-link" href='/About'>About</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default Navigation