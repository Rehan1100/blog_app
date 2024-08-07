import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const Blog = () => {
  const { id } = useParams();
  // const blog = blogs.find((blog) => blog.id === parseInt(id));

  // if (!blog) {
  //   return <div>Blog not found</div>;
  // }
  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };
  const [blog, getBlogs] = useState([]);
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/blogs/${id}`);
        console.log("getblogs",response.data.data)
        getBlogs(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBlog();
  }, []);
  return (
    <Container>
    <div className="blog-details-page">
    <img src={`data:image/jpeg;base64,${arrayBufferToBase64(blog.image?.data)}`} alt={blog.title} />
    <h1>{blog.title}</h1>
      <p>{blog?.author?.firstName+" "+blog?.author?.lastName}</p>
      <p>{blog.createdAt?.split("T")[0]?.split("-")?.reverse().join("/")}</p>
      <p>{blog.description}</p>
      <p dangerouslySetInnerHTML={{ __html: blog.content }}></p>
      <div>
        <strong>Category: </strong>
        {blog?.categories?.map((category, index) => (
           <span key={index}>{category.title}</span>
        ))}
      </div>
    </div>
    <div className='author-detail'>
        <div className='authorImg'>
          <img style={{width:'300px', aspectRatio: '1/1'}} className='imgauth'src={`data:image/jpeg;base64,${arrayBufferToBase64(blog.author?.image.data)}`} alt="" />
        </div>
        <div>
        <strong>Author Name: </strong>    <span>{blog?.author?.firstName+" "+blog?.author?.lastName}</span> 
        </div>
        <div>
        <strong>Bio:</strong>    <span>{blog?.author?.bio}</span> 

        </div>

    </div>
   
    </Container>
  );
};

export default Blog;
