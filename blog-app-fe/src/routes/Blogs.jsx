import React from 'react';
import { useParams, Link } from 'react-router-dom';

const Blogs = ({ categories, blogs }) => {
  const { id } = useParams();
  const category = categories.find((category) => category.id === parseInt(id));
  
  if (!category) {
    return <div>Category not found</div>;
  }

  const categoryBlogs = blogs.filter((blog) => blog.categories.includes(category.title));

  return (
    <div className="category-details-page">
      <h1>{category.title}</h1>
      <p>{category.description}</p>
      <div className="blog-internal-container">
        {categoryBlogs.length ? (
          categoryBlogs.map((blog) => (
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
  );
};

export default Blogs;
