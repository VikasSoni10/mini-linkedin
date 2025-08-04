const express = require('express');
const router = express.Router();
const {
  createPost,
  getAllPosts,
  getUserPosts,
} = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');

// Apply the 'protect' middleware to all routes in this file
router.use(protect);

router.route('/').post(createPost).get(getAllPosts);
router.route('/user/:userId').get(getUserPosts);

module.exports = router;