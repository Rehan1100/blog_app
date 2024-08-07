const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/categoryController');

const router = express.Router();

router.route('/')
    .get(protect, getCategories)
    .post(protect, admin, createCategory); // Only admin can create

router.route('/:id')
    .get(protect, getCategoryById)
    .put(protect, admin, updateCategory)  // Only admin can update
    .delete(protect, admin, deleteCategory); // Only admin can delete

module.exports = router;
