const Post = require('../models/Post');

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('category');
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('category');
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createPost = async (req, res) => {
    const { title, content, category } = req.body;
    try {
        const newPost = new Post({ title, content, category });
        const post = await newPost.save();
        res.status(201).json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updatePost = async (req, res) => {
    const { title, content, category } = req.body;
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        post.title = title;
        post.content = content;
        post.category = category;
        const updatedPost = await post.save();
        res.json(updatedPost);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        await post.remove();
        res.json({ message: 'Post removed' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
