import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ProductRecommendations.css';

const ProductRecommendations = ({ userId, productId, type = 'personalized' }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecommendations();
  }, [userId, productId, type]);

  const fetchRecommendations = async () => {
    try {
      let url = 'http://localhost:8080/api/recommendations/';
      
      switch(type) {
        case 'personalized':
          url += `personalized/${userId}?limit=6`;
          break;
        case 'similar':
          url += `similar/${productId}?limit=6`;
          break;
        case 'popular':
          url += 'popular?limit=6';
          break;
        case 'frequently-bought':
          url += `frequently-bought-together/${productId}?limit=4`;
          break;
        default:
          url += 'popular?limit=6';
      }
      
      const response = await axios.get(url);
      setRecommendations(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setLoading(false);
    }
  };

  const getTitle = () => {
    switch(type) {
      case 'personalized':
        return 'Recommended For You';
      case 'similar':
        return 'Similar Products';
      case 'popular':
        return 'Popular Products';
      case 'frequently-bought':
        return 'Frequently Bought Together';
      default:
        return 'You May Also Like';
    }
  };

  if (loading) {
    return <div className="recommendations-loading">Loading recommendations...</div>;
  }

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="product-recommendations">
      <h2>{getTitle()}</h2>
      <div className="recommendations-grid">
        {recommendations.map(product => (
          <Link 
            key={product.id} 
            to={`/product/${product.id}`}
            className="recommendation-card"
          >
            <div className="recommendation-image">
              <img 
                src={product.imageUrl || 'https://via.placeholder.com/200'} 
                alt={product.name}
              />
            </div>
            <div className="recommendation-info">
              <h4>{product.name}</h4>
              <p className="recommendation-price">${product.price.toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductRecommendations;