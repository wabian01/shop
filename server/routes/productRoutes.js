// backend/routes/productRoutes.js
const express = require('express');
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// Admin-only routes
router.post('/', authMiddleware.authenticate, authMiddleware.isAdmin, productController.createProduct);
router.put('/:id', authMiddleware.authenticate, authMiddleware.isAdmin, productController.updateProduct);
router.delete('/:id', authMiddleware.authenticate, authMiddleware.isAdmin, productController.deleteProduct);

module.exports = router;