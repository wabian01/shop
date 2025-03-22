// backend/models/productModel.js
const db = require('../config/db');

const Product = {
  // Lấy tất cả sản phẩm
  findAll: async () => {
    const [rows] = await db.query('SELECT * FROM products');
    return rows;
  },

  // Tìm sản phẩm bằng ID
  findById: async (id) => {
    const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
    return rows[0];
  },

  // Tạo sản phẩm mới
  create: async (name, description, price, category, image_url) => {
    const [result] = await db.query(
      'INSERT INTO products (name, description, price, category, image_url) VALUES (?, ?, ?, ?, ?)',
      [name, description, price, category, image_url]
    );
    return result.insertId;
  },

  // Cập nhật sản phẩm
  update: async (id, name, description, price, category, image_url) => {
    await db.query(
      'UPDATE products SET name = ?, description = ?, price = ?, category = ?, image_url = ? WHERE id = ?',
      [name, description, price, category, image_url, id]
    );
  },

  // Xóa sản phẩm
  delete: async (id) => {
    await db.query('DELETE FROM products WHERE id = ?', [id]);
  },
};

module.exports = Product;