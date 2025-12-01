import React, { useState } from 'react';
import { FaCreditCard, FaPaypal } from 'react-icons/fa';
import { SiRazorpay, SiStripe } from 'react-icons/si';
import axios from 'axios';
import './PaymentGateway.css';

const PaymentGateway = ({ amount, orderId, onSuccess, onError }) => {
  const [selectedGateway, setSelectedGateway] = useState('stripe');
  const [processing, setProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    email: ''
  });

  const gateways = [
    { id: 'stripe', name: 'Stripe', icon: <SiStripe />, color: '#635BFF' },
    { id: 'paypal', name: 'PayPal', icon: <FaPaypal />, color: '#00457C' },
    { id: 'razorpay', name: 'Razorpay', icon: <SiRazorpay />, color: '#3395FF' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePayment = async () => {
    setProcessing(true);
    
    try {
      const response = await axios.post(`http://localhost:8080/api/payments/${selectedGateway}`, {
        amount: amount,
        currency: 'USD',
        paymentMethod: selectedGateway,
        orderId: orderId,
        ...cardDetails
      });

      if (response.data.success) {
        onSuccess(response.data);
      } else {
        onError(response.data.message);
      }
    } catch (error) {
      console.error('Payment error:', error);
      onError('Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="payment-gateway">
      <h3>Select Payment Method</h3>
      
      <div className="gateway-options">
        {gateways.map(gateway => (
          <button
            key={gateway.id}
            className={`gateway-btn ${selectedGateway === gateway.id ? 'active' : ''}`}
            onClick={() => setSelectedGateway(gateway.id)}
            style={{ borderColor: selectedGateway === gateway.id ? gateway.color : '#ddd' }}
          >
            <span className="gateway-icon" style={{ color: gateway.color }}>
              {gateway.icon}
            </span>
            <span>{gateway.name}</span>
          </button>
        ))}
      </div>

      {selectedGateway !== 'paypal' && (
        <div className="card-details-form">
          <div className="form-group">
            <label>Card Number</label>
            <input
              type="text"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={cardDetails.cardNumber}
              onChange={handleInputChange}
              maxLength="19"
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Expiry Date</label>
              <input
                type="text"
                name="cardExpiry"
                placeholder="MM/YY"
                value={cardDetails.cardExpiry}
                onChange={handleInputChange}
                maxLength="5"
              />
            </div>
            
            <div className="form-group">
              <label>CVV</label>
              <input
                type="text"
                name="cardCvv"
                placeholder="123"
                value={cardDetails.cardCvv}
                onChange={handleInputChange}
                maxLength="4"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              value={cardDetails.email}
              onChange={handleInputChange}
            />
          </div>
        </div>
      )}

      <div className="payment-summary">
        <div className="summary-row">
          <span>Amount to Pay:</span>
          <span className="amount">${amount.toFixed(2)}</span>
        </div>
      </div>

      <button 
        className="btn btn-success pay-btn"
        onClick={handlePayment}
        disabled={processing}
      >
        {processing ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
      </button>

      <div className="payment-security">
        <FaCreditCard /> Secure payment powered by {selectedGateway}
      </div>
    </div>
  );
};

export default PaymentGateway;