import { Navbar, Nav, Container } from 'react-bootstrap';

const Navigation = () => {
    return (
        <>
            <Navbar bg='dark' variant='dark'>
                <Container>
                    <Nav>
                        <Nav.Link href='/'>Home</Nav.Link>
                        <Nav.Link href='/CoffeeShops'>Coffee Shops</Nav.Link>
                        <Nav.Link href='/Libraries'>Libraries</Nav.Link>
                        <Nav.Link href='/Universities'>Universities</Nav.Link>
                        <Nav.Link href='/About'>About</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default Navigation