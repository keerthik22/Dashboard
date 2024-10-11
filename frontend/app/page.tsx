"use client"; // Mark this as a Client Component

import { useState, useEffect } from 'react';
import Link from 'next/link'; // Import Link component for navigation
import './globals.css'; // Make sure the path is correct based on your file structure

type Product = {
  _id: string;
  name: string;
  price: number;
  stock: number;
  image: string;
};

export default function Home() {
  const [sort, setSort] = useState('');
  const [filter, setFilter] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Fetch products based on sort and filter
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:5000/api/products?filter=${filter}&sort=${sort}`
        );
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError('Failed to load products.');
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [filter, sort]);

  // Function to determine image source
  const getImageSource = (image: string | undefined) => {
    if (!image) {
      return '/images/default.jpg'; // Path to a default image if no image is provided
    }
    if (image.startsWith('/')) {
      return `${window.location.origin}${image}`; // Local image
    }
    return image; // External image URL
  };

  // Handle product deletion by ID
  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this product?'
    );
    if (!confirmed) return;

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        const message = await res.text();
        throw new Error(`Failed to delete product: ${message}`);
      }
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
      setSuccessMessage('Product deleted successfully!');
    } catch (err) {
      setError((err as Error).message || 'Failed to delete product.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {/* Navbar */}
      <div className="navbar">
        <div className="brand">Product Dashboard</div>
        <div className="navbar-right">
          {/* Sort Dropdown */}
          <div className="sort-dropdown">
            <label htmlFor="sort">Sort by:</label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">Default</option>
              <option value="price">Price</option>
              <option value="stock">Stock</option>
              <option value="name">Name</option>
            </select>
          </div>

          {/* Filter Dropdown */}
          <div className="sort-dropdown">
            <label htmlFor="filter">Filter by Stock:</label>
            <select
              id="filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="">All</option>
              <option value="inStock">In Stock</option>
              <option value="outOfStock">Out of Stock</option>
            </select>
          </div>

          {/* Add Product Link */}
          <Link href="/addproduct">
            <button className="add-product-btn">Add Product</button>
          </Link>
        </div>
      </div>

      {/* Display Loading or Products */}
      {loading ? (
        <p>Loading products...</p>
      ) : products.length > 0 ? (
        <div className="product-list">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <img
                src={getImageSource(product.image)}
                alt={product.name}
              />
              <h2>{product.name}</h2>
              <p>${product.price.toFixed(2)}</p>
              <p>Stock: {product.stock}</p>
              {/* <button>Add to Cart</button> */}
              <button onClick={() => handleDelete(product._id)}>Delete</button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No products found.</p>
      )}
    </div>
  );
}
