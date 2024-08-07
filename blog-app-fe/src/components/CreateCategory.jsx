// CreateBlog.js
import { useState } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function CreateCategory() {
  const [categoryData, setCategoryData] = useState({
    name: '',
    description: '',
    color: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({
      ...categoryData,
      [name]: value,
    });
  };

  const handleContentChange = (content) => {
    setCategoryData({
      ...categoryData,
      content: content,
    });
  };

  const onDrop = (acceptedFiles) => {
    setCategoryData({
      ...categoryData,
      image: acceptedFiles[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', categoryData.name);
    formData.append('description', categoryData.description);
    formData.append('color', categoryData.color);
  
    console.log(formData)
    try {
      const token = localStorage.getItem('token'); // Assuming you store the JWT token in local storage
      const response = await axios.post('http://localhost:5001/categories', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 201) {
        alert('Category created successfully!');
        setCategoryData({
          name: '',
          description: '',
          color: '',
        
        });
      }
      console.log(formData)
    } catch (err) {
      console.error(err.message);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' });

  return (
    <Container>
      <h2>Create New Category</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={categoryData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formDescription" className="mt-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={categoryData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formColor" className="mt-3">
          <Form.Label>Color</Form.Label>
          <Form.Control
            type="text"
            name="color"
            value={categoryData.color}
            onChange={handleChange}
            required
          />
        </Form.Group>
        {/* <Form.Group controlId="formImage" className="mt-3">
          <Form.Label>Image</Form.Label>
          <div {...getRootProps({ className: 'dropzone' })} className="border p-2">
            <input {...getInputProps()} />
            {blogData.image ? (
              <p>{blogData.image.name}</p>
            ) : (
              <p>Drag 'n' drop an image, or click to select one</p>
            )}
          </div>
        </Form.Group> */}
       
        <Button variant="primary" type="submit" className="mt-4">
          Create Category
        </Button>
      </Form>



    
    </Container>
  );
}

export default CreateCategory;
