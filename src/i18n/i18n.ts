import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import translationEN from "./en/translation.json";
import translationHE from "./he/translation.json";
import { Lng } from "../models/types/common";

const resources: Record<Lng, { translation: any }> = {
  en: { translation: translationEN },
  he: { translation: translationHE },
};

export const initI18n = async () => {
  await i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
      resources,
      supportedLngs: ["en", "he"],
      fallbackLng: "en",
      detection: {
        order: ["cookie", "querystring", "localStorage", "navigator"],
        caches: ["cookie"],
      },
      interpolation: { escapeValue: false },
    });
};

export default i18n;
