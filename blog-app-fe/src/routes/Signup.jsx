import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';

import { Container, Form, Button, Alert } from 'react-bootstrap';

function Signup() {
  const navigate = useNavigate();

  const [blogData, setBlogData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    image: '',
    bio: '',
    password: '',
    role: ''
  });
  const [error,setError] = useState('')

  const handleSignup = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('firstName', blogData.firstName);
    formData.append('lastName', blogData.lastName);
    formData.append('email', blogData.email);
    formData.append('image', blogData.image);
    formData.append('bio', blogData.bio);
    formData.append('password', blogData.password);
    formData.append('role', blogData.role);
    try {
      debugger
      const resposne = await axios.post('http://localhost:5001/users/register', formData,{
        'Content-Type': 'multipart/form-data',

      });
      console.log(resposne);

      //if(resposne.status === 201)
     //{ 
      navigate('/login');//}
    } catch (err) {
      setError('Signup failed');
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData({
      ...blogData,
      [name]: value,
    });
  }; 


   const onDrop = (acceptedFiles) => {
    setBlogData({
      ...blogData,
      image: acceptedFiles[0],
    });
  };


  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' });

  return (
    <Container>
      <h2 className="mt-4">Signup</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSignup}>
      <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name='firstName'
            placeholder="Enter First Name"
            value={blogData.firstName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name='lastName'
            placeholder="Enter Last Name"
            value={blogData.lastName}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name='email'
            placeholder="Enter Email"
            value={blogData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formImage" className="mt-3">
          <Form.Label>Image</Form.Label>
          <div {...getRootProps({ className: 'dropzone' })} className="border p-2">
            <input {...getInputProps()} />
            {blogData.image ? (
              <p>{blogData.image.name}</p>
            ) : (
              <p>Drag 'n' drop an image, or click to select one</p>
            )}
          </div>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Bio</Form.Label>
          <Form.Control
            type="text"
            name='bio'
            placeholder="Enter Bio"
            value={blogData.bio}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name='password'
            placeholder="Password"
            value={blogData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Role</Form.Label>
          <Form.Control
            type="text"
            name='role'
            placeholder="Enter Role"
            value={blogData.role}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Signup
        </Button>
      </Form>
    </Container>
  );
}

export default Signup;
