const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
    getBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog
} = require('../controllers/blogController');

const router = express.Router();

router.route('/')
    .get(protect, getBlogs)
    .post(protect, createBlog);

router.route('/:id')
    .get(protect, getBlogById)
    .put(protect, updateBlog)
    .delete(protect, deleteBlog);

module.exports = router;
