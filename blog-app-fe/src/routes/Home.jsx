import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CategoryList from '../components/CategoryList';

function Home({ blogs , categories }) {
  


  const recentBlogs = blogs.slice(-3).reverse();

  return (
    <Container>
      <div className="RecentBlogContainer">
        <h2>Recent Blog Posts</h2>
        <div className="blog-internal-container">
          {recentBlogs.map((blog) => (
            
            <div className="blog" key={blog.id}>
            <Link to={`/blog/${blog.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="blog-image">
               
                  <img src={blog.image} alt={blog.title} />
                
              </div>
              <div className="blog-details-container">
                <div className="blog-author">
                  <p className="author-name">
                    {blog.author}. <span>{blog.date}</span>
                  </p>
                </div>
                <div className="blog-details">
                  <h3 className="blog-title">{blog.title}</h3>
                  <p className="blog-description">{blog.description}</p>
                </div>
                <div className="blog-category">
                  <p>{blog.categories.join(', ')}</p>
                </div>
              </div>
              </Link>
            </div>
       
          ))}
        </div>
      </div>

     <CategoryList categoryList={categories}/>
    </Container>
  );
}

export default Home;
