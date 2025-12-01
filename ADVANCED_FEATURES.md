# Advanced Features Documentation - Frontend

## 🚀 Overview

This document covers all the advanced features added to the E-Commerce React frontend application.

## 🌙 Dark Mode

### Features
- Toggle between light and dark themes
- Persistent theme preference (localStorage)
- Smooth transitions
- Complete UI coverage

### Usage
```javascript
import { useTheme } from './context/ThemeContext';

function Component() {
  const { isDarkMode, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      {isDarkMode ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}
```

### Implementation
- Theme context provider wraps entire app
- CSS classes applied to body element
- All components styled for both themes

## 🌍 Multi-Language Support

### Supported Languages
1. **English** (en) 🇺🇸
2. **Spanish** (es) 🇪🇸
3. **French** (fr) 🇫🇷

### Features
- Dynamic language switching
- Persistent language preference
- Complete UI translation
- Easy to add new languages

### Usage
```javascript
import { useLanguage } from './context/LanguageContext';

function Component() {
  const { language, changeLanguage, t } = useLanguage();
  
  return (
    <div>
      <h1>{t('welcome')}</h1>
      <button onClick={() => changeLanguage('es')}>
        Español
      </button>
    </div>
  );
}
```

### Adding New Languages
1. Open `src/translations/index.js`
2. Add new language object:
```javascript
de: {
  welcome: 'Willkommen',
  products: 'Produkte',
  // ... more translations
}
```
3. Update language selector in Settings

## 💬 Live Chat Support

### Features
- Real-time messaging via WebSocket
- Multiple users support
- Join/leave notifications
- Message timestamps
- Online/offline status
- Typing indicators
- Floating chat widget

### Technical Details
- Uses SockJS for WebSocket fallback
- STOMP protocol for messaging
- Automatic reconnection
- Message history

### Configuration
WebSocket endpoint: `http://localhost:8080/ws`

### Usage
Component automatically connects when opened. No additional configuration needed.

## 💳 Payment Gateway Integration

### Supported Gateways
1. **Stripe** - Credit/Debit cards
2. **PayPal** - PayPal accounts
3. **Razorpay** - Multiple payment methods

### Features
- Visual gateway selection
- Card details form
- Secure payment processing
- Real-time validation
- Payment confirmation

### Usage
```javascript
import PaymentGateway from './components/PaymentGateway';

<PaymentGateway
  amount={99.99}
  orderId={123}
  onSuccess={(response) => console.log('Payment successful', response)}
  onError={(error) => console.log('Payment failed', error)}
/>
```

### Test Cards
- **Stripe**: 4242 4242 4242 4242
- **Expiry**: Any future date
- **CVV**: Any 3 digits

## 🤖 AI-Based Product Recommendations

### Types of Recommendations

#### 1. Personalized Recommendations
Based on user's purchase history and preferences.
```javascript
<ProductRecommendations 
  userId={userId} 
  type="personalized" 
/>
```

#### 2. Similar Products
Products in same category with similar price range.
```javascript
<ProductRecommendations 
  productId={productId} 
  type="similar" 
/>
```

#### 3. Popular Products
Trending and best-selling items.
```javascript
<ProductRecommendations 
  type="popular" 
/>
```

#### 4. Frequently Bought Together
Products often purchased with current item.
```javascript
<ProductRecommendations 
  productId={productId} 
  type="frequently-bought" 
/>
```

### Features
- Dynamic loading
- Responsive grid layout
- Click to view product details
- Automatic updates

## 🔐 Social Media Login

### Supported Providers
1. **Google** - Google accounts
2. **Facebook** - Facebook accounts
3. **GitHub** - GitHub accounts

### Features
- One-click authentication
- Secure OAuth2 flow
- Automatic account creation
- Profile data import

### Usage
```javascript
import SocialLogin from './components/SocialLogin';

<SocialLogin />
```

### Setup Requirements
Backend OAuth2 configuration must be completed first. See backend documentation.

## ⚙️ Settings Panel

### Features
- Dark mode toggle
- Language selector
- Visual feedback
- Persistent preferences

### Access
Navigate to `/settings` or click settings icon in navbar.

## 📦 New Dependencies

```json
{
  "sockjs-client": "^1.6.1",
  "@stomp/stompjs": "^7.0.0"
}
```

### Installation
```bash
npm install sockjs-client @stomp/stompjs
```

## 🎨 Styling

### Dark Mode CSS
All components have dark mode variants in `src/styles/darkmode.css`

### Color Scheme
- **Light Mode**: White backgrounds, dark text
- **Dark Mode**: Dark backgrounds (#1a1a1a), light text (#e0e0e0)
- **Accent**: Purple gradient (#667eea to #764ba2)

## 🔧 Configuration

### API Endpoints
Update in `src/services/api.js`:
```javascript
const API_BASE_URL = 'http://localhost:8080/api';
```

### WebSocket URL
Update in `LiveChat.js`:
```javascript
const socket = new SockJS('http://localhost:8080/ws');
```

## 📱 Responsive Design

All advanced features are fully responsive:
- Mobile-optimized chat widget
- Responsive payment forms
- Adaptive recommendation grids
- Mobile-friendly settings panel

## 🚀 Performance Optimizations

1. **Lazy Loading**: Components load on demand
2. **Caching**: Language and theme preferences cached
3. **Debouncing**: Chat typing indicators debounced
4. **Memoization**: Recommendation results cached

## 🐛 Troubleshooting

### Dark Mode not persisting
- Check browser localStorage
- Clear cache and reload

### Language not changing
- Verify translation keys exist
- Check console for errors

### Chat not connecting
- Verify backend WebSocket is running
- Check CORS configuration
- Inspect browser console for errors

### Payment failing
- Verify backend payment service is configured
- Check API keys
- Use test card numbers

### Recommendations not loading
- Ensure backend recommendation service is running
- Check network tab for API errors
- Verify user/product IDs are valid

## 📚 Component Structure

```
src/
├── components/
│   ├── LiveChat.js          # Real-time chat widget
│   ├── PaymentGateway.js    # Payment processing
│   ├── ProductRecommendations.js  # AI recommendations
│   ├── Settings.js          # Settings panel
│   └── SocialLogin.js       # OAuth2 login
├── context/
│   ├── ThemeContext.js      # Dark mode state
│   └── LanguageContext.js   # i18n state
├── translations/
│   └── index.js             # All translations
└── styles/
    └── darkmode.css         # Dark mode styles
```

## 🎯 Best Practices

1. **Always wrap app with providers**:
```javascript
<ThemeProvider>
  <LanguageProvider>
    <App />
  </LanguageProvider>
</ThemeProvider>
```

2. **Use translation function for all text**:
```javascript
const { t } = useLanguage();
<h1>{t('welcome')}</h1>
```

3. **Test in both themes**:
- Toggle dark mode during development
- Verify all components render correctly

4. **Handle WebSocket disconnections**:
- Implement reconnection logic
- Show connection status to users

5. **Validate payment inputs**:
- Check card number format
- Validate expiry date
- Verify CVV length

## 🔐 Security Considerations

1. **Never store payment details** in state or localStorage
2. **Use HTTPS** in production for OAuth2
3. **Validate all user inputs** before sending to backend
4. **Implement CSRF protection** for forms
5. **Sanitize chat messages** to prevent XSS

## 📈 Future Enhancements

- [ ] Voice messages in chat
- [ ] File sharing in chat
- [ ] More payment gateways (Apple Pay, Google Pay)
- [ ] More languages (German, Italian, Portuguese)
- [ ] Custom theme colors
- [ ] Accessibility improvements (ARIA labels)
- [ ] Progressive Web App (PWA) support
- [ ] Push notifications

## 📝 Testing

### Manual Testing Checklist
- [ ] Dark mode toggles correctly
- [ ] Language changes apply immediately
- [ ] Chat connects and sends messages
- [ ] Payment gateway processes test payments
- [ ] Recommendations load and display
- [ ] Social login redirects correctly
- [ ] Settings persist after refresh

### Browser Compatibility
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 📞 Support

For issues or questions:
1. Check this documentation
2. Review backend ADVANCED_FEATURES.md
3. Check browser console for errors
4. Verify backend services are running

## 🎉 Conclusion

All advanced features are production-ready and fully integrated. Follow the configuration steps and best practices for optimal performance.