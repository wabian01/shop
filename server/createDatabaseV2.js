const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'electronics_store',
};

// Function to hash password
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10); // Generate a salt
  return await bcrypt.hash(password, salt); // Hash the password
}

// Function to execute SQL queries sequentially
async function executeQueries(connection, queries) {
  for (const query of queries) {
    await connection.query(query);
  }
}

// Function to create database and tables
async function createDatabase() {
  let connection;
  try {
    // Connect to MySQL server
    connection = await mysql.createConnection({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password,
    });

    console.log('Connected to MySQL server.');

    // Create database
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database};`);
    console.log(`Database "${dbConfig.database}" created or already exists.`);

    // Switch to the created database
    await connection.query(`USE ${dbConfig.database};`);
    console.log(`Using database "${dbConfig.database}".`);

    // Create tables
    const createTableQueries = [
      `CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'user') NOT NULL DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );`,
      `CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        category ENUM('PC', 'Laptop', 'Smartphone') NOT NULL,
        image_url VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );`,
    ];

    await executeQueries(connection, createTableQueries);
    console.log('Tables created successfully.');

    // Hash passwords for sample users
    const adminPassword = await hashPassword('admin'); // Hash password for admin

    // Insert sample data into `users` table
    await connection.query(
      `INSERT INTO users (username, password, role) VALUES (?, ?, ?), (?, ?, ?);`,
      ['admin', adminPassword, 'admin']
    );
    console.log('Created Admin successfully.');


    // Close the connection
    await connection.end();
    console.log('Connection closed.');
  } catch (error) {
    console.error('Error creating database and tables:', error);
    if (connection) await connection.end();
  }
}

// Run the function
createDatabase();