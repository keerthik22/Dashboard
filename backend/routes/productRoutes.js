const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Product = require('../models/Product');

// Get all products with filtering and sorting
router.get('/', async (req, res) => {
  const { filter, sort } = req.query;

  try {
    let query = {};
    
    // Filter products based on stock availability
    if (filter === 'inStock') {
      query.stock = { $gt: 0 }; // Products in stock
    } else if (filter === 'outOfStock') {
      query.stock = { $eq: 0 }; // Products out of stock
    }

    // Fetch products based on the query
    let products = await Product.find(query);

    // Sort products based on the query
    if (sort === 'price') {
      products = products.sort((a, b) => a.price - b.price);
    } else if (sort === 'stock') {
      products = products.sort((a, b) => a.stock - b.stock);
    }

    // Send the fetched products
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products', details: error.message });
  }
});

// Create a new product
router.post('/', async (req, res) => {
  const { name, price, stock, image } = req.body;

  try {
    // Create and save the new product
    const newProduct = new Product({ name, price, stock, image });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: 'Error creating product', details: error.message });
  }
});

// Delete a product by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid product ID format' });
    }

    // Attempt to delete the product
    const deletedProduct = await Product.findByIdAndDelete(id);

    // If product doesn't exist, return 404
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Successfully deleted
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', details: error.message });
  }
});


module.exports = router;
