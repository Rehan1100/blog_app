import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';

const DeleteBlogs = () => {
  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/blogs/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });
        setBlogs(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const deleteBlog = async (blogId) => {
    try {
      await axios.delete(`http://localhost:5001/blogs/${blogId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      // Remove the deleted blog from the state
      setBlogs(blogs.filter(blog => blog.id !== blogId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <div className="category-details-page">
        <div className="blog-internal-container">
          {blogs.length ? (
            blogs.map((blog) => (
              <div className="blog" key={blog.id}>
                <div className="blog-image">
                  <Link to={`/blog/${blog.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <img className='homeImg' src={`data:image/jpeg;base64,${arrayBufferToBase64(blog.image?.data)}`} alt={blog.title} />
                  </Link>
                </div>
                <div className="blog-details-container">
                  <div className="blog-author">
                    <p className="author-name">
                      {blog.author?.firstName + " " + blog.author?.lastName}. <span>{blog.createdAt.split("T")[0].split("-")?.reverse().join("/")}</span>
                    </p>
                  </div>
                  <div className="blog-details">
                    <h3 className="blog-title">{blog.title}</h3>
                    <p className="blog-description">{blog.description}</p>
                  </div>
                  <div className="blog-category">
                   {blog.categories.map((val) => (

                     <span className='b-cat'>{val.title} </span>
                   )
                     
                     )}
                   
                  </div>
                <Button variant="danger" className='mt-4' onClick={() => deleteBlog(blog.id)}>Delete Blog</Button>
                </div>
              </div>
            ))
          ) : (
            <p>No blogs available.</p>
          )}
        </div>
      </div>
    </Container>
  );
};

export default DeleteBlogs;
