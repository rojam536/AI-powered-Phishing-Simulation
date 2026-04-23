const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ success: false, error: 'User already exists' });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'employee'
    });

    res.status(201).json({
      success: true,
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    console.log('Login attempt for email:', email);
    console.log('Password provided:', password ? 'Yes' : 'No');

    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      console.log('User not found:', email);
      return res.status(401).json({ success: false, error: 'User not found. Please register an account.' });
    }

    console.log('User found:', user.email);

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    console.log('Password match result:', isMatch);

    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Incorrect password. Please try again.' });
    }

    res.json({
      success: true,
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    next(error);
  }
};

// @desc    Get all users
// @route   GET /api/auth/users
// @access  Private/Admin
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');

    res.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    next(error);
  }
};
