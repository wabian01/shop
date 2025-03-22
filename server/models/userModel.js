// backend/models/userModel.js
const db = require('../config/db');

const User = {
  // Tìm user bằng username
  findByUsername: async (username) => {
    const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0];
  },

  // Tạo user mới
  create: async (username, password, role = 'user') => {
    const [result] = await db.query(
      'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
      [username, password, role]
    );
    return result.insertId;
  },
};

module.exports = User;