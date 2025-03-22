// backend/controllers/productController.js
const Product = require('../models/productModel');

const productController = {
  // Lấy tất cả sản phẩm
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.findAll();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching products.' });
    }
  },

  // Lấy chi tiết sản phẩm bằng ID
  getProductById: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found.' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching product.' });
    }
  },

  // Tạo sản phẩm mới (Admin only)
  createProduct: async (req, res) => {
    try {
      const { name, description, price, category, image_url } = req.body;
      const productId = await Product.create(name, description, price, category, image_url);
      res.status(201).json({ message: 'Product created successfully.', productId });
    } catch (error) {
      res.status(500).json({ message: 'Error creating product.' });
    }
  },

  // Cập nhật sản phẩm (Admin only)
  updateProduct: async (req, res) => {
    try {
      const { name, description, price, category, image_url } = req.body;
      await Product.update(req.params.id, name, description, price, category, image_url);
      res.json({ message: 'Product updated successfully.' });
    } catch (error) {
      res.status(500).json({ message: 'Error updating product.' });
    }
  },

  // Xóa sản phẩm (Admin only)
  deleteProduct: async (req, res) => {
    try {
      await Product.delete(req.params.id);
      res.json({ message: 'Product deleted successfully.' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting product.' });
    }
  },
};

module.exports = productController;