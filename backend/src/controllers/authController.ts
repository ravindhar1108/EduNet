import { Request, Response } from 'express';
import jwt, { SignOptions } from 'jsonwebtoken';
import { User, IUser } from '../models/User';
import { sendVerificationEmail, generateVerificationToken } from '../utils/emailService';
import mongoose from 'mongoose';

// Check if database is connected
const isDatabaseConnected = (): boolean => {
  return mongoose.connection.readyState === 1;
};

// Generate JWT Token
const generateToken = (userId: string): string => {
  const secret = process.env.JWT_SECRET || 'fallback-secret-key-for-development';
  
  if (!secret) {
    throw new Error('JWT_SECRET is not configured');
  }
  
  const options: jwt.SignOptions = {
    expiresIn: (process.env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn']) || '7d'
  };
  
  return jwt.sign({ userId }, secret as jwt.Secret, options);
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    // Check if database is connected
    if (!isDatabaseConnected()) {
      res.status(503).json({
        success: false,
        error: 'Database is not available. Please try again later.'
      });
      return;
    }

    const {
      email,
      password,
      firstName,
      lastName,
      username,
      university,
      major,
      graduationYear,
      bio
    } = req.body;

    // Check if user already exists
    let existingUser;
    try {
      existingUser = await User.findOne({
        $or: [{ email }, { username }]
      });
    } catch (dbError) {
      console.error('Database error during user lookup:', dbError);
      res.status(500).json({
        success: false,
        error: 'Database connection error. Please try again later.'
      });
      return;
    }

    if (existingUser) {
      res.status(400).json({
        success: false,
        error: existingUser.email === email 
          ? 'Email already registered' 
          : 'Username already taken'
      });
      return;
    }

    // Create user with email already verified (for now)
    const user = new User({
      email,
      password,
      firstName,
      lastName,
      username,
      university,
      major,
      graduationYear: parseInt(graduationYear),
      bio: bio || '',
      isEmailVerified: true, // Skip email verification for now
      // emailVerificationToken: verificationToken, // Commented out for now
      // emailVerificationExpires: verificationExpires // Commented out for now
    });

    try {
      await user.save();
    } catch (dbError) {
      console.error('Database error during user creation:', dbError);
      res.status(500).json({
        success: false,
        error: 'Failed to create user. Please try again later.'
      });
      return;
    }

    // TODO: Uncomment this when you want to add email verification back
    // // Generate verification token
    // const verificationToken = generateVerificationToken();
    // const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    // user.emailVerificationToken = verificationToken;
    // user.emailVerificationExpires = verificationExpires;
    // await user.save();

    // TODO: Uncomment this when you want to add email verification back
    // // Send verification email
    // try {
    //   await sendVerificationEmail(email, verificationToken, firstName);
    // } catch (emailError) {
    //   console.error('Email sending failed:', emailError);
    //   // Don't fail registration if email fails
    // }

    // Generate token
    const token = generateToken((user._id as string).toString());

    res.status(201).json({
      success: true,
      message: 'Registration successful! Welcome to EduNet AI Connect.',
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        university: user.university,
        major: user.major,
        graduationYear: user.graduationYear,
        bio: user.bio,
        isEmailVerified: user.isEmailVerified
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error during registration'
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find user by email
    let user;
    try {
      user = await User.findOne({ email }).select('+password');
    } catch (dbError) {
      console.error('Database error during user lookup:', dbError);
      res.status(500).json({
        success: false,
        error: 'Database connection error. Please try again later.'
      });
      return;
    }

    if (!user) {
      res.status(401).json({
        success: false,
        error: 'Invalid email or password'
      });
      return;
    }

    // Check if password matches
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        error: 'Invalid email or password'
      });
      return;
    }

    // TODO: Uncomment this when you want to add email verification back
    // // Check if email is verified
    // if (!user.isEmailVerified) {
    //   return res.status(401).json({
    //     success: false,
    //     error: 'Please verify your email before logging in'
    //   });
    // }

    // Generate token
    const token = generateToken((user._id as string).toString());

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        university: user.university,
        major: user.major,
        graduationYear: user.graduationYear,
        bio: user.bio,
        avatar: user.avatar,
        isEmailVerified: user.isEmailVerified
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error during login'
    });
  }
};

// @desc    Verify email (kept for future use)
// @route   GET /api/auth/verify-email
// @access  Public
export const verifyEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token } = req.query;

    if (!token || typeof token !== 'string') {
      res.status(400).json({
        success: false,
        error: 'Verification token is required'
      });
      return;
    }

    // Find user with this token
    let user;
    try {
      user = await User.findOne({
        emailVerificationToken: token,
        emailVerificationExpires: { $gt: Date.now() }
      });
    } catch (dbError) {
      console.error('Database error during user lookup:', dbError);
      res.status(500).json({
        success: false,
        error: 'Database connection error. Please try again later.'
      });
      return;
    }

    if (!user) {
      res.status(400).json({
        success: false,
        error: 'Invalid or expired verification token'
      });
      return;
    }

    // Mark email as verified
    user.isEmailVerified = true;
    user.emailVerificationToken = '';
    user.emailVerificationExpires = new Date();
    try {
      await user.save();
    } catch (dbError) {
      console.error('Database error during user update:', dbError);
      res.status(500).json({
        success: false,
        error: 'Failed to update user. Please try again later.'
      });
      return;
    }

    res.json({
      success: true,
      message: 'Email verified successfully'
    });

  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error during email verification'
    });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    let user;
    try {
      user = await User.findById(req.user?.userId);
    } catch (dbError) {
      console.error('Database error during user lookup:', dbError);
      res.status(500).json({
        success: false,
        error: 'Database connection error. Please try again later.'
      });
      return;
    }

    if (!user) {
      res.status(404).json({
        success: false,
        error: 'User not found'
      });
      return;
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        university: user.university,
        major: user.major,
        graduationYear: user.graduationYear,
        bio: user.bio,
        avatar: user.avatar,
        isEmailVerified: user.isEmailVerified
      }
    });

  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while fetching user data'
    });
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    // Since we're using JWT tokens, we don't need to do anything server-side
    // The client should remove the token from localStorage
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error during logout'
    });
  }
}; 