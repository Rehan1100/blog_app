const Category = require('../models/Category');

// Utility function to format category data
const formatCategory = (category) => {
    return {
        title: category.name,  // Assuming 'name' is the title
        description: category.description,
        color: category.color,  // Ensure 'color' field is present in your model
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
        id: category._id
    };
};

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json({
            message: "Return all categories!",
            data: categories.map(formatCategory)
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: 'Category not found' });
        res.json({
            message: "Return category by ID!",
            data: formatCategory(category)
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createCategory = async (req, res) => {
    const { name, description, color } = req.body;
    try {
        const newCategory = new Category({ name, description, color });
        const category = await newCategory.save();
        res.status(201).json({
            message: "Category created successfully!",
            data: formatCategory(category)
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateCategory = async (req, res) => {
    const { name, description, color } = req.body;
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: 'Category not found' });
        category.name = name;
        category.description = description;
        category.color = color;
        const updatedCategory = await category.save();
        res.json({
            message: "Category updated successfully!",
            data: formatCategory(updatedCategory)
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: 'Category not found' });
        await category.remove();
        res.json({
            message: "Category removed successfully!"
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
