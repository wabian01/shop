// backend/config/db.js
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'electronics_store',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = db;