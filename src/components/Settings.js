import React from 'react';
import { FaMoon, FaSun, FaGlobe } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import './Settings.css';

const Settings = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { language, changeLanguage, t } = useLanguage();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' }
  ];

  return (
    <div className="settings-panel">
      <h2>{t('settings')}</h2>
      
      {/* Dark Mode Toggle */}
      <div className="settings-item">
        <div className="settings-label">
          {isDarkMode ? <FaMoon /> : <FaSun />}
          <span>{t('darkMode')}</span>
        </div>
        <label className="toggle-switch">
          <input 
            type="checkbox" 
            checked={isDarkMode} 
            onChange={toggleTheme}
          />
          <span className="slider"></span>
        </label>
      </div>

      {/* Language Selector */}
      <div className="settings-item">
        <div className="settings-label">
          <FaGlobe />
          <span>{t('language')}</span>
        </div>
        <div className="language-selector">
          {languages.map(lang => (
            <button
              key={lang.code}
              className={`language-btn ${language === lang.code ? 'active' : ''}`}
              onClick={() => changeLanguage(lang.code)}
            >
              <span className="flag">{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;