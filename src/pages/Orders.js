import React, { useState, useEffect } from 'react';
import { getUserOrders } from '../services/api';
import './Orders.css';

const Orders = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, [userId]);

  const fetchOrders = async () => {
    try {
      const response = await getUserOrders(userId);
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      PENDING: '#ffc107',
      CONFIRMED: '#17a2b8',
      SHIPPED: '#007bff',
      DELIVERED: '#28a745',
      CANCELLED: '#dc3545'
    };
    return colors[status] || '#6c757d';
  };

  if (loading) {
    return <div className="loading">Loading orders...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="no-orders">
        <div className="container">
          <h2>No orders yet</h2>
          <p>Start shopping to see your orders here!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="container">
        <h1>My Orders</h1>
        
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div>
                  <h3>Order #{order.id}</h3>
                  <p className="order-date">
                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div 
                  className="order-status"
                  style={{ backgroundColor: getStatusColor(order.status) }}
                >
                  {order.status}
                </div>
              </div>
              
              <div className="order-items">
                {order.items.map(item => (
                  <div key={item.id} className="order-item">
                    <img 
                      src={item.product.imageUrl || 'https://via.placeholder.com/80'} 
                      alt={item.product.name}
                    />
                    <div className="order-item-details">
                      <h4>{item.product.name}</h4>
                      <p>Quantity: {item.quantity}</p>
                      <p className="item-price">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="order-footer">
                <div className="order-info">
                  <p><strong>Shipping Address:</strong> {order.shippingAddress}</p>
                  <p><strong>Payment Method:</strong> {order.paymentMethod.toUpperCase()}</p>
                </div>
                <div className="order-total">
                  <strong>Total: ${order.totalAmount.toFixed(2)}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;