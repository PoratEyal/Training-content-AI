import { useTranslation } from "react-i18next";
import { Lng } from "../models/types/common";

export const useLanguage = () => {
    const { t, i18n } = useTranslation();

    const lang = i18n.language as Lng;
    const isHebrew = lang === "he";
    const isEnglish = lang === "en";
    const isSpanish = lang === "es";
    const isArabic = lang === "ar";
    const dir = isHebrew || isArabic ? "rtl" : "ltr" as "rtl" | "ltr";
    const textAlign = isHebrew || isArabic ? "right" : "left" as "right" | "left";

    const changeLang = (lang: string) => {
        i18n.changeLanguage(lang);
    };

    return { t, lang, isHebrew, isEnglish, isSpanish, isArabic, dir, textAlign, changeLang };
};
