const express = require('express');
const {
    registerUser,
    loginUser,
    getUserProfile,
    getBlogsByUser
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.get('/blogs/:id', getBlogsByUser);

module.exports = router;
