const express = require('express');
const { register, login } = require('../controllers/authController');
const { body } = require('express-validator');

const router = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post(
  '/register',
  [
    body('username').notEmpty().withMessage('Username is required.'),
    body('email').isEmail().withMessage('Valid email is required.'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
  ],
  register
);

/**
 * @route   POST /api/auth/login
 * @desc    Login a user and return a token
 * @access  Public
 */
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required.'),
    body('password').notEmpty().withMessage('Password is required.'),
  ],
  login
);

module.exports = router;
