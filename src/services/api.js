import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Product APIs
export const getAllProducts = () => api.get('/products');
export const getProductById = (id) => api.get(`/products/${id}`);
export const getProductsByCategory = (category) => api.get(`/products/category/${category}`);
export const searchProducts = (keyword) => api.get(`/products/search?keyword=${keyword}`);
export const createProduct = (product) => api.post('/products', product);
export const updateProduct = (id, product) => api.put(`/products/${id}`, product);
export const deleteProduct = (id) => api.delete(`/products/${id}`);

// User APIs
export const getAllUsers = () => api.get('/users');
export const getUserById = (id) => api.get(`/users/${id}`);
export const createUser = (user) => api.post('/users', user);
export const updateUser = (id, user) => api.put(`/users/${id}`, user);

// Cart APIs
export const getCart = (userId) => api.get(`/cart/${userId}`);
export const addToCart = (userId, productId, quantity) => 
  api.post('/cart/add', { userId, productId, quantity });
export const updateCartItem = (userId, itemId, quantity) => 
  api.put('/cart/update', { userId, itemId, quantity });
export const removeFromCart = (userId, itemId) => 
  api.delete(`/cart/${userId}/item/${itemId}`);
export const clearCart = (userId) => api.delete(`/cart/${userId}/clear`);

// Order APIs
export const getAllOrders = () => api.get('/orders');
export const getOrderById = (id) => api.get(`/orders/${id}`);
export const getUserOrders = (userId) => api.get(`/orders/user/${userId}`);
export const createOrder = (userId, shippingAddress, paymentMethod) => 
  api.post('/orders', { userId, shippingAddress, paymentMethod });
export const updateOrderStatus = (id, status) => 
  api.put(`/orders/${id}/status?status=${status}`);
export const updatePayment = (id, paymentId) => 
  api.put(`/orders/${id}/payment`, { paymentId });

export default api;