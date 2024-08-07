import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Assuming you have login function to set auth state

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/users/login', { email, password });

      // Destructure token and role from the response
      const { token, role,_id,firstName,lastName } = response.data;
      console.log(role)
      // Store token in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('_id',_id)
      localStorage.setItem('name',firstName+" "+lastName)

      // Set authentication state
      login(role);

      // Redirect based on the role
      if (role === "author") {
        navigate('/admin');
      } else {
        navigate('/'); // Redirect to home or other page for non-admin users
      }
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <Container>
      <h2 className="mt-4">Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
        <p style={{marginTop:"10px"}}>Dont have an account?  <Link to="/signup">signup now</Link> </p>
      </Form>
    </Container>
  );
}

export default Login;
