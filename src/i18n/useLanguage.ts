//
// This hook sets up the language and text direction for the site
// It helps detect which language is active and switch between them
//
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Lng } from "../models/types/common";

export const useLanguage = () => {
    const { t, i18n } = useTranslation();

    const normalizedLang = i18n.language.includes("-")
        ? i18n.language.split("-")[0]
        : i18n.language;
    const lang = normalizedLang as Lng;

    const isHebrew = lang === "he";
    const isEnglish = lang === "en";
    const isSpanish = lang === "es";
    const isArabic = lang === "ar";
    const isRTL = isHebrew || isArabic;
    const dir = isRTL ? "rtl" : ("ltr" as "rtl" | "ltr");
    const textAlign = isRTL ? "right" : ("left" as "right" | "left");

    // 🔄 Update <html> tag when lang changes
    useEffect(() => {
        const html = document.documentElement;
        html.setAttribute("lang", lang);
        html.setAttribute("dir", dir);
    }, [lang, dir]);

    const changeLang = (lang: string) => {
        i18n.changeLanguage(lang);
    };

    return {
        t,
        lang,
        isHebrew,
        isEnglish,
        isSpanish,
        isArabic,
        isRTL,
        dir,
        textAlign,
        changeLang,
    };
};
