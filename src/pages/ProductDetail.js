import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, addToCart, getCart } from '../services/api';
import './ProductDetail.css';

const ProductDetail = ({ userId, setCartCount }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await getProductById(id);
      setProduct(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product:', error);
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    setAddingToCart(true);
    try {
      await addToCart(userId, product.id, quantity);
      const cartResponse = await getCart(userId);
      setCartCount(cartResponse.data.items.length);
      alert('Product added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart');
    }
    setAddingToCart(false);
  };

  if (loading) {
    return <div className="loading">Loading product...</div>;
  }

  if (!product) {
    return <div className="error">Product not found</div>;
  }

  return (
    <div className="product-detail">
      <div className="container">
        <button onClick={() => navigate(-1)} className="btn btn-secondary back-btn">
          ← Back
        </button>
        
        <div className="product-detail-content">
          <div className="product-detail-image">
            <img 
              src={product.imageUrl || 'https://via.placeholder.com/500'} 
              alt={product.name}
            />
          </div>
          
          <div className="product-detail-info">
            <h1>{product.name}</h1>
            <p className="product-category">{product.category}</p>
            <p className="product-price">${product.price.toFixed(2)}</p>
            
            <div className="product-description">
              <h3>Description</h3>
              <p>{product.description || 'No description available'}</p>
            </div>
            
            <div className="product-stock">
              {product.stockQuantity > 0 ? (
                <span className="in-stock">✓ In Stock ({product.stockQuantity} available)</span>
              ) : (
                <span className="out-of-stock">✗ Out of Stock</span>
              )}
            </div>
            
            {product.stockQuantity > 0 && (
              <div className="product-actions">
                <div className="quantity-selector">
                  <label>Quantity:</label>
                  <input
                    type="number"
                    min="1"
                    max={product.stockQuantity}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                  />
                </div>
                
                <button 
                  onClick={handleAddToCart} 
                  className="btn btn-primary add-to-cart-btn"
                  disabled={addingToCart}
                >
                  {addingToCart ? 'Adding...' : 'Add to Cart'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;