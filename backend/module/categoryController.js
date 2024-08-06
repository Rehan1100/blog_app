const Category = require('../models/Category');

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: 'Category not found' });
        res.json(category);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createCategory = async (req, res) => {
    const { name, description } = req.body;
    try {
        const newCategory = new Category({ name, description });
        const category = await newCategory.save();
        res.status(201).json(category);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateCategory = async (req, res) => {
    const { name, description } = req.body;
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: 'Category not found' });
        category.name = name;
        category.description = description;
        const updatedCategory = await category.save();
        res.json(updatedCategory);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: 'Category not found' });
        await category.remove();
        res.json({ message: 'Category removed' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
