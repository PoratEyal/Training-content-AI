// src/i18n/i18n.ts

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// ייבוא של קבצי התרגום
import translationEN from './en/translation.json';
import translationHE from './he/translation.json';

const resources = {
  en: {
    translation: translationEN
  },
  he: {
    translation: translationHE
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'he',          // שפת ברירת מחדל
    fallbackLng: 'en',  // שפה חלופית במקרה שאין מפתח תרגום
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
