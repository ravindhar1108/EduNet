import express from 'express';
import { getProfile, updateProfile, getUsers, getUserById } from '../controllers/userController';
import { protect } from '../middleware/auth';

const router = express.Router();

// All routes are protected
router.use(protect);

// Profile routes
router.get('/me', getProfile);
router.put('/me', updateProfile);

// User search/network routes
router.get('/', getUsers);
router.get('/:id', getUserById);

export default router; 