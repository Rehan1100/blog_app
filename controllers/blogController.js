const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
    destination: './uploads/', // Adjust the path as necessary
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
});

// Check file type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

// Init upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // Limit size to 1MB
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).single('image');

// Ensure User is imported
const Blog = require('../models/Blog');
const User = require('../models/User');
const Category = require('../models/Category');

// Utility function to format blog data
const formatBlog = async (blog) => {
    try {
        const author = await User.findById(blog.author);
        const categories = await Category.find({ _id: { $in: blog.categories } });

        return {
            title: blog.title,
            description: blog.description,
            image: blog.image,
            content: blog.content,
            createdAt: blog.createdAt,
            updatedAt: blog.updatedAt,
            id: blog._id,
            author: {
                id: author._id,
                firstName: author.firstName,
                lastName: author.lastName,
                email: author.email,
                image: author.image,
                bio: author.bio
            },
            categories: categories.map(cat => ({
                id: cat._id,
                title: cat.title,
                description: cat.description,
                color: cat.color
            }))
        };
    } catch (err) {
        console.error("Error formatting blog:", err);
        throw err;
    }
};

exports.getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author').populate('categories');
        
        const formattedBlogs = await Promise.all(blogs.map(async (blog) => {
            if (!blog.author || !blog.categories) {
                console.error('Missing author or categories in blog:', blog);
                return null;
            }
            return await formatBlog(blog);
        }));
        
        const validBlogs = formattedBlogs.filter(blog => blog !== null);
        
        res.json({
            message: "Return all blogs!",
            data: validBlogs
        });
    } catch (err) {
        console.error(err);
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
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        const { title, description, content, author, categories } = req.body;
        const image = req.file ? req.file.path : null; // Save the file path to image

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
    });
};

exports.updateBlog = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        const { title, description, content, author, categories } = req.body;
        const image = req.file ? req.file.path : null;

        try {
            const blog = await Blog.findById(req.params.id);
            if (!blog) return res.status(404).json({ message: 'Blog not found' });
            blog.title = title;
            blog.description = description;
            if (image) blog.image = image; // Only update image if a new one is uploaded
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
    });
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
