const { registerUser, loginUser } = require('../services/authService');
const logger = require('../utils/logger');

const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Username, email, and password are required.' });
  }

  try {
    const user = await registerUser(username, email, password);
    logger.info(`User registered: ${user.username}`);
    res.status(201).json({ message: 'User registered successfully.', user });
  } catch (error) {
    if (error.message.includes('already exists')) {
      // Handle duplicate key error gracefully
      return res.status(409).json({ error: error.message });
    }
    logger.error(`Error registering user: ${error.message}`);
    return res.status(500).json({ error: 'User registration failed.' });
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    const { token, user } = await loginUser(email, password);
    logger.info(`User logged in: ${user.username}`);
    res.status(200).json({
      message: 'Login successful.',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    if (error.message.includes('Invalid email or password')) {
      logger.warn(`Failed login attempt: ${email}`);
      return res.status(401).json({ error: 'Invalid email or password.' }); // Unauthorized
    }

    logger.error(`Error logging in user: ${error.message}`);
    return res.status(500).json({ error: 'User login failed.' });
  }
};

module.exports = { register, login };
