import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand as={Link} to="/" >Blog-App</Navbar.Brand>
          <Nav >
            <Nav.Link as={Link} to={"/"} >Home</Nav.Link>
            <Nav.Link as={Link} to={"/categories"} >Categories</Nav.Link>
            <Nav.Link as={Link} to={"/blogs"}>Blogs</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  );
}

export default Navigation;