import express from 'express';

const router = express.Router();

// @route   GET /api/communities
// @desc    Get all communities
// @access  Public
router.get('/', (req, res) => {
  res.json({ message: 'Get all communities - TODO' });
});

// @route   POST /api/communities
// @desc    Create new community
// @access  Private
router.post('/', (req, res) => {
  res.json({ message: 'Create new community - TODO' });
});

export default router; 