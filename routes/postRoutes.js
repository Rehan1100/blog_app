const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
} = require('../controllers/postController');

const router = express.Router();

router.route('/')
    .get(protect, getPosts)
    .post(protect, createPost);

router.route('/:id')
    .get(protect, getPostById)
    .put(protect, updatePost)
    .delete(protect, deletePost);

module.exports = router;
