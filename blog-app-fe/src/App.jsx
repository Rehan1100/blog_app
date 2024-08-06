import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './routes/Login';
import Signup from './routes/Signup';
import Home from './routes/Home';
import AdminPanel from './routes/AdminPanel';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';
import Navigation from './components/Navigation';
import './App.css'
import Categories from './routes/Categories';
import Blogs from './routes/Blogs';
import Blog from './components/Blog';
import React, { useState } from 'react';

function App() {
  const { auth } = useAuth();
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: 'First Blog Post',
      description: 'This is the description for the first blog post.',
      author: 'John Doe',
      date: '2024-08-07',
      image: 'https://images.unsplash.com/photo-1719937050679-c3a2c9c67b0f?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      categories: ['Technology'],
    },
    {
      id: 2,
      title: 'Second Blog Post',
      description: 'This is the description for the second blog post.',
      author: 'Jane Doe',
      date: '2024-08-06',
      image: 'https://images.unsplash.com/photo-1719937050679-c3a2c9c67b0f?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      categories: ['Health'],
    },
  ]);

  const [categories, setCategories] = useState([
    {
      id: 1,
      title: 'Technology',
      description: 'Latest trends and news in technology.',
    },
    {
      id: 2,
      title: 'Health',
      description: 'Tips and advice for a healthy lifestyle.',
    },
    {
      id: 3,
      title: 'Travel',
      description: 'Explore new destinations and travel tips.',
    },
    {
      id: 4,
      title: 'Food',
      description: 'Delicious recipes and cooking tips.',
    },
  ]);


  return (
    
    <Router>
    <Navigation/>

      <Routes>
      <Route path="/" element={<Home blogs={blogs} categories={categories} />} />
      {!auth.isAuthenticated ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/categories" element={<Categories categoryList={categories} />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blog/:id" element={<Blog blogs={blogs} />} />
            <Route path="/category/:id" element={<Blogs categories={categories} blogs={blogs} />} />

            <Route
              path="/admin"
              element={<ProtectedRoute element={<AdminPanel />} requiredRole="admin" />}
            />
          </>
        ) : (
          <>
            <Route
              path="/admin"
              element={<ProtectedRoute element={<AdminPanel />} requiredRole="admin" />}
            />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
