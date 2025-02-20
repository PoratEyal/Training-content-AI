import React, { useState } from 'react';
import { MdLanguage } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import styles from './LanguageSwitcherPopup.module.css';

const LanguageSwitcherPopup: React.FC = () => {
  const { i18n } = useTranslation();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(prev => !prev);
  };

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setIsPopupOpen(false);
  };

  return (
    <div className={styles.container}>
      <MdLanguage 
        size={24} 
        onClick={togglePopup} 
        className={styles.icon} 
      />
      {isPopupOpen && (
        <div className={styles.overlay} onClick={() => setIsPopupOpen(false)}>
          <div className={styles.popup} onClick={e => e.stopPropagation()}>
            <h3>Select Language</h3>
            <button onClick={() => changeLanguage('en')}>English</button>
            <button onClick={() => changeLanguage('he')}>עברית</button>
            {/* Add more languages as needed */}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcherPopup;
