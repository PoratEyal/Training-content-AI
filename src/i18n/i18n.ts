import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./en/translation.json";
import translationHE from "./he/translation.json";
import translationES from "./es/translation.json";
import translationAR from "./ar/translation.json"; 
import { Lng } from "../models/types/common";

const resources: Record<Lng, { translation: any }> = {
  en: { translation: translationEN },
  he: { translation: translationHE },
  es: { translation: translationES },
  ar: { translation: translationAR }, // תוסיף את זה!
};

export const initI18n = async (detectedLang: Lng) => {
  await i18n
    .use(initReactI18next)
    .init({
      lng: detectedLang,
      resources,
      supportedLngs: ["en", "he", "es", "ar"], // תוסיף את זה!
      fallbackLng: "en",
      interpolation: { escapeValue: false },
    });
};

export default i18n;
