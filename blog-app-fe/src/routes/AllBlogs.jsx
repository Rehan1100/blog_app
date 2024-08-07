import React from 'react';
import { Container } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';

const Blogs = ({  blogs }) => {
  const { id } = useParams();
//   const category = categories.find((category) => category.id === parseInt(id));
  
//   if (!category) {
//     return <div>Category not found</div>;
//   }

//   const categoryBlogs = blogs.filter((blog) => blog.categories.includes(category.title));

  return (
    <Container>
    <div className="category-details-page">
      <div className="blog-internal-container">
        {blogs.length ? (
          blogs.map((blog) => (
            <div className="blog" key={blog.id}>
              <div className="blog-image">
                <Link to={`/blog/${blog.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <img src={blog.image} alt={blog.title} />
                </Link>
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
