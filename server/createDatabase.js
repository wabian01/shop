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
      `CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        total_amount DECIMAL(10, 2) NOT NULL,
        status ENUM('pending', 'completed', 'cancelled') NOT NULL DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );`,
      `CREATE TABLE IF NOT EXISTS order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        product_id INT NOT NULL,
        quantity INT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders(id),
        FOREIGN KEY (product_id) REFERENCES products(id)
      );`,
    ];

    await executeQueries(connection, createTableQueries);
    console.log('Tables created successfully.');

    // Hash passwords for sample users
    const adminPassword = await hashPassword('admin123'); // Hash password for admin
    const userPassword = await hashPassword('user123');   // Hash password for user

    // Insert sample data into `users` table
    await connection.query(
      `INSERT INTO users (username, password, role) VALUES (?, ?, ?), (?, ?, ?);`,
      ['admin', adminPassword, 'admin', 'user1', userPassword, 'user']
    );
    console.log('Sample users inserted successfully.');

    // Insert sample data into `products` table
    await connection.query(
      `INSERT INTO products (name, description, price, category, image_url) VALUES
      ('Gaming PC', 'High-end gaming PC with RTX 3080', 1500.00, 'PC', 'https://example.com/pc1.jpg'),
      ('MacBook Pro', 'Apple MacBook Pro 16-inch', 2000.00, 'Laptop', 'https://example.com/macbook.jpg'),
      ('iPhone 13', 'Apple iPhone 13 128GB', 799.00, 'Smartphone', 'https://example.com/iphone13.jpg');`
    );
    console.log('Sample products inserted successfully.');

    // Insert sample data into `orders` table
    await connection.query(
      `INSERT INTO orders (user_id, total_amount, status) VALUES (?, ?, ?);`,
      [2, 799.00, 'completed']
    );
    console.log('Sample orders inserted successfully.');

    // Insert sample data into `order_items` table
    await connection.query(
      `INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?);`,
      [1, 3, 1, 799.00]
    );
    console.log('Sample order items inserted successfully.');

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