import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';

const Blogs = () => {
  const { id } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/categories/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });
        console.log(response.data.data);
        setCategories(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/blogs/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });
        setBlogs(response.data.data);
        console.log("blos",response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategory();
    fetchBlogs();
  }, []);
  const category = categories.find((category) => category.id == id);

  if (!category) {
    return <div>Category not found</div>;
  }
  const categoryBlogs = blogs.filter((blog) => blog?.categories?.find(item=>item?.id==id));
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
      <div className="category-details-page">
        <h1>{category.title}</h1>
        <p>{category.description}</p>
        <div className="blog-internal-container">
          {categoryBlogs.length ? (
            categoryBlogs.map((blog) => (
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
                </div>
              </div>
            ))
          ) : (
            <p>No blogs available for this category.</p>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Blogs;
