import express from 'express';

const router = express.Router();

// @route   GET /api/projects
// @desc    Get all projects
// @access  Public
router.get('/', (req, res) => {
  res.json({ message: 'Get all projects - TODO' });
});

// @route   POST /api/projects
// @desc    Create new project
// @access  Private
router.post('/', (req, res) => {
  res.json({ message: 'Create new project - TODO' });
});

// @route   GET /api/projects/:id
// @desc    Get project by ID
// @access  Public
router.get('/:id', (req, res) => {
  res.json({ message: 'Get project by ID - TODO' });
});

// @route   PUT /api/projects/:id
// @desc    Update project
// @access  Private
router.put('/:id', (req, res) => {
  res.json({ message: 'Update project - TODO' });
});

// @route   DELETE /api/projects/:id
// @desc    Delete project
// @access  Private
router.delete('/:id', (req, res) => {
  res.json({ message: 'Delete project - TODO' });
});

export default router; 