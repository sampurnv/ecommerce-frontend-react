import React from 'react';
import { FaGoogle, FaFacebook, FaGithub } from 'react-icons/fa';
import './SocialLogin.css';

const SocialLogin = () => {
  const handleSocialLogin = (provider) => {
    // Redirect to backend OAuth2 endpoint
    window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
  };

  return (
    <div className="social-login">
      <div className="divider">
        <span>Or continue with</span>
      </div>
      
      <div className="social-buttons">
        <button 
          className="social-btn google"
          onClick={() => handleSocialLogin('google')}
        >
          <FaGoogle />
          <span>Google</span>
        </button>
        
        <button 
          className="social-btn facebook"
          onClick={() => handleSocialLogin('facebook')}
        >
          <FaFacebook />
          <span>Facebook</span>
        </button>
        
        <button 
          className="social-btn github"
          onClick={() => handleSocialLogin('github')}
        >
          <FaGithub />
          <span>GitHub</span>
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;