import React from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const Blog = ({ blogs }) => {
  const { id } = useParams();
  const blog = blogs.find((blog) => blog.id === parseInt(id));

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <Container>
    <div className="blog-details-page">
      <img src={blog.image} alt={blog.title} />
      <h1>{blog.title}</h1>
      <p>{blog.author}</p>
      <p>{blog.date}</p>
      <p>{blog.description}</p>
      <div>
        {blog.categories.map((category, index) => (
          <span key={index}>{category}</span>
        ))}
      </div>
    </div>
    </Container>
  );
};

export default Blog;
