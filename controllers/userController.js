const User = require('../models/User');
const Blog = require('../models/Blog');
const jwt = require('jsonwebtoken');

const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

exports.registerUser = async (req, res) => {
    const { firstName, lastName, email, password, role, image, bio } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({ firstName, lastName, email, password, role, image, bio });
        await user.save();

        res.status(201).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            image: user.image,
            bio: user.bio,
            token: generateToken(user._id, user.role),
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                image: user.image,
                bio: user.bio,
                token: generateToken(user._id, user.role),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



exports.getBlogsByUser = async (req, res) => {
    const userId = req.params.id;

    try {
        // Find all blogs where the author field matches the user ID
        const blogs = await Blog.find({ author: userId });

        // If no blogs are found, return a 404 response
        if (blogs.length === 0) {
            return res.status(404).json({ message: 'No blogs found for this user' });
        }

        // Return the list of blogs
        res.json({
            message: "Return all blogs for the user!",
            data: blogs
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};