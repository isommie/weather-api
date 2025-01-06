const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('../utils/logger');

const registerUser = async (username, email, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    logger.info(`User registered: ${username}`);
    return newUser;
  } catch (error) {
    logger.error(`Error registering user: ${error.message}`);
    throw new Error('User registration failed.');
  }
};

const loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ email }).exec();
    if (!user) throw new Error('Invalid email or password.');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Invalid email or password.');

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    logger.info(`User logged in: ${user.username}`);
    return { token, user };
  } catch (error) {
    logger.error(`Error logging in user: ${error.message}`);
    throw new Error('User login failed.');
  }
};

module.exports = { registerUser, loginUser };
