import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import translationEN from "./en/translation.json";
import translationHE from "./he/translation.json";
import { Lng } from "../models/types/common";

const resources: Record<Lng, { translation: any; ns1: any }> = {
    en: {
        translation: translationEN,
        ns1: translationEN,
    },
    he: {
        translation: translationHE,
        ns1: translationHE,
    },
};

i18n.use(initReactI18next).use(LanguageDetector).init({
    resources,
    supportedLngs: ["en", "he"],
    fallbackLng: "en", // fallback language for unsupported languages
    detection: {
        order: ["navigator", "cookie", "localStorage"],
        caches: ["cookie"]
    },
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
