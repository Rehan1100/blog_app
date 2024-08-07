import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Dropdown, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import avatar from '../assets/react.svg';
import { useAuth } from '../context/AuthContext';
function Navigation() {
  const { logout,auth } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear JWT token from local storage
    logout(); // Update auth context
    navigate('/'); // Redirect to landing page
  };

  return (
    <Navbar bg="light" data-bs-theme="light">
    <Container>
      <Navbar.Brand as={Link} to="/">Blog-App</Navbar.Brand>
      {!auth.isAuthenticated ? (<Nav className="me-auto">
        <Nav.Link as={Link} to="/">Home</Nav.Link>
        <Nav.Link as={Link} to="/categories">Categories</Nav.Link>
        <Nav.Link as={Link} to="/allblogs">Blogs</Nav.Link>
      </Nav>) :<Nav.Link as={Link} to="/viewBlogs">View Blogs</Nav.Link>}
      <Nav className="ms-auto">
        <Dropdown align="end">
          <Dropdown.Toggle as={Nav.Item} className="d-flex align-items-center">
            <Image
              src={avatar}
              roundedCircle
              height="30"
              width="30"
              className="me-2"
            />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav>
      
    </Container>
  </Navbar>
  );
}

export default Navigation;