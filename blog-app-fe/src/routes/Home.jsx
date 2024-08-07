import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CategoryList from '../components/CategoryList';
import axios from 'axios';

function Home() {
  
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try { 
        const response = await axios.get('http://localhost:5001/blogs/');
        console.log("blogs",response.data)
        setBlogs(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);
  const recentBlogs = blogs.slice(-3).reverse();
  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };
  return (
    <Container>
      <div className="RecentBlogContainer">
        <h2>Recent Blog Posts</h2>
        {blogs.length ?    <div className="blog-internal-container">
          {recentBlogs.map((blog) => (
            
            <div className="blog" key={blog.id}>
            <Link to={`/blog/${blog.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="blog-image">
               
                  <img className='homeImg' src={`data:image/jpeg;base64,${arrayBufferToBase64(blog.image?.data)}`} alt={blog.title} />
                
              </div>
              <div className="blog-details-container">
                <div className="blog-author">
                  <p className="author-name">
                    {blog.author.firstName+" "+blog.author.lastName}. <span>{blog.createdAt.split("T")[0].split("-")?.reverse().join("/")}</span>
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
              </div>
              </Link>
            </div>
       
          ))}
        </div>
        : <p style={{textAlign: 'center'}}>No Blogs Available</p>}
      </div>

     <CategoryList/>
    </Container>
  );
}

export default Home;
