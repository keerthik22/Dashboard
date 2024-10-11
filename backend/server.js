const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const path = require('path'); // Import path module

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Allow requests from the frontend

// Serve static files from the 'app/images' directory
app.use('/images', express.static(path.join(__dirname, 'dasboardapp/app/images'))); // Serve images

// Routes
app.use('/api/products', productRoutes);

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/productdb')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('Error:', err));

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
