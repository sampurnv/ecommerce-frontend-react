# E-Commerce Frontend - React

Modern, responsive e-commerce frontend built with React.js.

## Features

- **Hero Section**: Eye-catching landing page with call-to-action
- **Product Catalog**: Browse products with search and category filters
- **Product Details**: Detailed product pages with add to cart
- **Shopping Cart**: Manage cart items, update quantities
- **Checkout**: Complete checkout flow with shipping and payment
- **Order History**: View past orders and their status
- **Responsive Design**: Mobile-friendly UI

## Tech Stack

- React 18
- React Router DOM 6
- Axios for API calls
- React Icons
- CSS3 with modern layouts

## Prerequisites

- Node.js 14+ and npm

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/sampurnv/ecommerce-frontend-react.git
cd ecommerce-frontend-react
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure API Endpoint

The frontend is configured to connect to the backend at `http://localhost:8080/api`.

If your backend runs on a different port, update `src/services/api.js`:

```javascript
const API_BASE_URL = 'http://localhost:YOUR_PORT/api';
```

### 4. Start Development Server

```bash
npm start
```

The application will open at `http://localhost:3000`

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.js       # Navigation bar
│   └── ProductCard.js  # Product card component
├── pages/              # Page components
│   ├── Home.js         # Landing page
│   ├── Products.js     # Product listing
│   ├── ProductDetail.js # Product details
│   ├── Cart.js         # Shopping cart
│   ├── Checkout.js     # Checkout page
│   └── Orders.js       # Order history
├── services/           # API services
│   └── api.js          # Axios configuration
├── App.js              # Main app component
└── index.js            # Entry point
```

## Available Scripts

- `npm start` - Run development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## Features Breakdown

### Home Page
- Hero section with CTA
- Feature highlights
- Category navigation

### Products Page
- Product grid layout
- Search functionality
- Category filtering

### Product Detail
- Large product images
- Detailed descriptions
- Add to cart with quantity
- Stock availability

### Shopping Cart
- View cart items
- Update quantities
- Remove items
- Price calculations
- Proceed to checkout

### Checkout
- Shipping information form
- Payment method selection
- Order summary
- Place order

### Orders
- Order history
- Order status tracking
- Order details
- Item information

## Connecting to Backend

Make sure the Spring Boot backend is running on `http://localhost:8080` before starting the frontend.

The frontend will automatically connect to these endpoints:
- Products: `/api/products`
- Cart: `/api/cart`
- Orders: `/api/orders`
- Users: `/api/users`

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Deployment

The build folder can be deployed to:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

## License

MIT License