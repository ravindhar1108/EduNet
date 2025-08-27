import express from 'express';
import { register, login, verifyEmail, getMe, logout } from '../controllers/authController';
import { protect } from '../middleware/auth';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.get('/verify-email', verifyEmail);

// Protected routes
router.get('/me', protect, getMe);
router.post('/logout', protect, logout);

export default router; 