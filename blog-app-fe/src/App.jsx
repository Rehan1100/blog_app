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
import AllBlogs from './routes/AllBlogs';
import Blog from './components/Blog';
import React, { useState,useEffect } from 'react';
import axios from 'axios'
import DeleteBlogs from './components/deleteBlogs';

function App() {
  const { auth } = useAuth();
  
  



  return (
    
    <Router>
    <Navigation/>

      <Routes>
      <Route path="/" element={<Home />} />
      {!auth.isAuthenticated ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/allblogs" element={<AllBlogs  />} />
            
            <Route path="/blog/:id" element={<Blog />} />
            <Route path="/category/:id" element={<Blogs />} />

            <Route
              path="/admin"
              element={<ProtectedRoute element={<AdminPanel />} requiredRole="author" />}
            />
          </>
        ) : (
          <>
          <Route path="/viewBlogs" element={<DeleteBlogs/>} />
            <Route
              path="/admin"
              element={<ProtectedRoute element={<AdminPanel />} requiredRole="author" />}
            />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
