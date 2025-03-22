// backend/controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const dotenv = require('dotenv');

dotenv.config();

const authController = {
  // Đăng nhập
  login: async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findByUsername(username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid username or password.' });
    }

    const token = jwt.sign({ id: user.id,username:user.usernames, role: user.role }, process.env.JWT_SECRET
    //   ,{
    //   expiresIn: '10h',
    // }
  );

    res.json({ token });
  },

  // Đăng ký
  register: async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const userId = await User.create(username, hashedPassword);
      res.status(201).json({ message: 'User registered successfully.', userId });
    } catch (error) {
      res.status(400).json({ message: 'Username already exists.' });
    }
  },
};

module.exports = authController;