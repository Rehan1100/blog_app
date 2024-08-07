const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const {
    registerUser,
    loginUser,
    getUserProfile,
    getBlogsByUser
} = require('../controllers/userController');

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/profile').get(protect, getUserProfile);
router.route('/:id/blogs').get(protect, getBlogsByUser);

module.exports = router;
