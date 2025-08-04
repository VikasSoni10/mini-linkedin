const Post = require('../models/Post');
const User = require('../models/User');

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
const createPost = async (req, res) => {
  if (!req.body.content) {
    return res.status(400).json({ message: 'Content cannot be empty' });
  }

  const post = await Post.create({
    content: req.body.content,
    author: req.user.id, // from protect middleware
  });

  res.status(201).json(post);
};

// @desc    Get all posts
// @route   GET /api/posts
// @access  Private
const getAllPosts = async (req, res) => {
  const posts = await Post.find({})
    .populate('author', 'name') // 'author' is the field in Post model, 'name' is the field to show from User model
    .sort({ timestamp: -1 }); // Sort by newest first

  res.json(posts);
};

// @desc    Get all posts by a specific user
// @route   GET /api/posts/user/:userId
// @access  Private
const getUserPosts = async (req, res) => {
  const posts = await Post.find({ author: req.params.userId })
    .populate('author', 'name')
    .sort({ timestamp: -1 });

  res.json(posts);
};

module.exports = {
  createPost,
  getAllPosts,
  getUserPosts,
};