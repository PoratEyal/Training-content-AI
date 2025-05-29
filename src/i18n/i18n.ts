import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./en/translation.json";
import translationHE from "./he/translation.json";
import { Lng } from "../models/types/common";

const resources: Record<Lng, { translation: any }> = {
  en: { translation: translationEN },
  he: { translation: translationHE },
};

// Accept a language override if available
export const initI18n = async (detectedLang: Lng) => {
  await i18n
    .use(initReactI18next)
    .init({
      lng: detectedLang, // you control this 100% now
      resources,
      supportedLngs: ["en", "he"],
      fallbackLng: "en",
      interpolation: { escapeValue: false },
    });
};

export default i18n;
