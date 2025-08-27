import express from 'express';

const router = express.Router();

// @route   GET /api/posts
// @desc    Get all posts
// @access  Public
router.get('/', (req, res) => {
  res.json({ message: 'Get all posts - TODO' });
});

// @route   POST /api/posts
// @desc    Create new post
// @access  Private
router.post('/', (req, res) => {
  res.json({ message: 'Create new post - TODO' });
});

export default router; 