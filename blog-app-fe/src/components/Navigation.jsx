import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Dropdown, Image, Button } from 'react-bootstrap';
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
    {!auth.isAuthenticated ? 
      <Navbar.Brand as={Link} to="/">Blog-App</Navbar.Brand> : 
      <Navbar.Brand as={Link} to="/admin">Blog-App</Navbar.Brand>

    }
      {!auth.isAuthenticated ? (<Nav className="me-auto">
        
        <Nav.Link as={Link} to="/">Home</Nav.Link>
        <Nav.Link as={Link} to="/categories">Categories</Nav.Link>
        <Nav.Link as={Link} to="/allblogs">Blogs</Nav.Link>
      </Nav>) :<Nav.Link as={Link} to="/viewBlogs">View Blogs</Nav.Link>}
      
      {!auth.isAuthenticated ?<Nav.Link as={Link} to="/login">login</Nav.Link> : <span style={{cursor:'pointer'}} onClick={handleLogout}>Logout</span>}

      
    </Container>
  </Navbar>
  );
}

export default Navigation;