import { useEffect, useState } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function CreateBlog() {

  const [categories, setCategories] = useState([]);
  const [blogData, setBlogData] = useState({
    title: '',
    description: '',
    image: '',
    content: '',
    author: '',
    category: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try { 
        const response = await axios.get('http://10.50.1.187:5001/categories/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });
        console.log(response.data.data)
        setCategories (response.data.data);
        console.log(categories)
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData({
      ...blogData,
      [name]: value,
    });
  };

  const handleContentChange = (content) => {
    setBlogData({
      ...blogData,
      content: content,
    });
  };

  const onDrop = (acceptedFiles) => {
    setBlogData({
      ...blogData,
      image: acceptedFiles[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', blogData.title);
    formData.append('description', blogData.description);
    formData.append('image', blogData.image);
    formData.append('content', blogData.content);
    formData.append('author', blogData.author);
    formData.append('category', blogData.category);
    try {
      const token = localStorage.getItem('token'); // Assuming you store the JWT token in local storage
      const response = await axios.post('http://10.50.1.187:5001/blogs', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 201) {
        alert('Blog created successfully!');
        setBlogData({
          title: '',
          description: '',
          image: '',
          content: '',
          author: '',
          category: '',
        });
      }
    } catch (err) {
      console.error(err.message);
      alert('Failed to create blog.');
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' });

  return (
    <Container>
      <h2>Create New Blog</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={blogData.title}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formDescription" className="mt-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={blogData.description}
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
        <Form.Group controlId="formContent" className="mt-3">
          <Form.Label>Content</Form.Label>
          <ReactQuill
            theme="snow"
            value={blogData.content}
            onChange={handleContentChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formAuthor" className="mt-3">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            name="author"
            value={blogData.author}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formCategory" className="mt-3">
          <Form.Label>Category</Form.Label>
          <Form.Select
            name="category"
            value={blogData.category}
            onChange={handleChange}
            required
          >
            {/* <option key={"akdhak"} value="">Select a category</option> */}
            {categories?.map((category,index) => (
              
              <option key={index} value={category.id}>
                {category.title}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-4">
          Create Blog
        </Button>
      </Form>
    </Container>
  );
}

export default CreateBlog;
