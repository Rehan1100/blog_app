import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
function CategoryList({categoryList}) {
  return (
   <>
   <Container>
     <div className="categories-container">
        <h2>Categories</h2>
        <div className="categories-internal-container">
          {categoryList.map((category) => (
            <div className="category" key={category.id}>
              <Link to={`/category/${category.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="cat-title">
                  <h4>{category.title}</h4>
                </div>
                <div className="cat-description">
                  <p>{category.description}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      </Container>
   </>
  )
}

export default CategoryList