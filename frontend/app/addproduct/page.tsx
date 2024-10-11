"use client"; // Mark this as a Client Component
import React from 'react';
import { useState, useEffect } from 'react'; // Import React and useState

export default function AddProduct() {
  const [newProduct, setNewProduct] = useState({ name: '', price: 0, stock: 0, image: '' });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Handle product creation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true); // Set loading state to true
    try {
      const res = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });
      if (!res.ok) throw new Error('Failed to create product');
      const data = await res.json();
      setSuccessMessage('Product added successfully!'); // Success message
      setNewProduct({ name: '', price: 0, stock: 0, image: '' }); // Reset form after submission
      setImagePreview(null); // Reset image preview
    } catch (err) {
      const errorMessage = (err as Error).message || 'Failed to create product. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Handle image preview change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setNewProduct({ ...newProduct, image: reader.result as string }); // Set image URL
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h1 style={{ color: 'white' }}>Add Product</h1>
      {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {loading && <p>Loading...</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          required
          className="border border-gray-300 p-2 w-full"
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
          required
          min="0"
          className="border border-gray-300 p-2 w-full"
        />
        <input
          type="number"
          placeholder="Stock Quantity"
          value={newProduct.stock}
          onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })}
          required
          min="0"
          className="border border-gray-300 p-2 w-full"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
          className="border border-gray-300 p-2 w-full"
        />
        {imagePreview && <img src={imagePreview} alt="Image Preview" className="image-preview mt-4" />}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Product</button>
      </form>
    </div>
  );
}
