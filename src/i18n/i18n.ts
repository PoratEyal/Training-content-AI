import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./en/translation.json";
import translationHE from "./he/translation.json";
import { Lng } from "../models/types/common";

const resources: Record<Lng, { translation: any }> = {
    en: {
        translation: translationEN,
    },
    he: {
        translation: translationHE,
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: "he", // default language
    fallbackLng: "en", // fallback language
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
