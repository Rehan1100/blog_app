const Blog = require('../models/Blog');
const Author = require('../models/Author');
const Category = require('../models/Category');

// Utility function to format blog data
const formatBlog = async (blog) => {
    try {
        const author = await Author.findById(blog.author);
        const categories = await Category.find({ _id: { $in: blog.categories } });

        return {
            title: blog.title,
            description: blog.description,
            image: blog.image,
            content: blog.content,
            createdAt: blog.createdAt,
            updatedAt: blog.updatedAt,
            id: blog._id,
            author: author ? {
                id: author._id,
                firstName: author.firstName,
                lastName: author.lastName,
                email: author.email,
                image: author.image,
                bio: author.bio
            } : null,  // Handle the case where author is not found
            categories: categories.map(cat => ({
                id: cat._id,
                title: cat.title,
                description: cat.description,
                color: cat.color
            })) || []  // Handle the case where no categories are found
        };
    } catch (error) {
        throw new Error(`Error formatting blog: ${error.message}`);
    }
};


exports.getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author').populate('categories');
        const formattedBlogs = await Promise.all(blogs.map(formatBlog));
        res.json({
            message: "Return all blogs!",
            data: formattedBlogs
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('author').populate('categories');
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        const formattedBlog = await formatBlog(blog);
        res.json({
            message: "Return blog by ID!",
            data: formattedBlog
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createBlog = async (req, res) => {
    const { title, description, image, content, author, categories } = req.body;
    try {
        const newBlog = new Blog({ title, description, image, content, author, categories });
        const blog = await newBlog.save();
        const formattedBlog = await formatBlog(blog);
        res.status(201).json({
            message: "Blog created successfully!",
            data: formattedBlog
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateBlog = async (req, res) => {
    const { title, description, image, content, author, categories } = req.body;
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        blog.title = title;
        blog.description = description;
        blog.image = image;
        blog.content = content;
        blog.author = author;
        blog.categories = categories;
        blog.updatedAt = Date.now();
        const updatedBlog = await blog.save();
        const formattedBlog = await formatBlog(updatedBlog);
        res.json({
            message: "Blog updated successfully!",
            data: formattedBlog
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        await blog.remove();
        res.json({
            message: "Blog removed successfully!"
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
