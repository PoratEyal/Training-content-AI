//
// This hook sets up the language and text direction for the site
//
import { useTranslation } from "react-i18next";
import { Lng } from "../models/types/common";

export const useLanguage = () => {
    const { t, i18n } = useTranslation();

    const normalizedLang = i18n.language.includes("-")
        ? i18n.language.split("-")[0]
        : i18n.language;
    const lang = normalizedLang as Lng;

    const isHebrew = lang === "he";
    const isRTL = lang === "he" || lang === "ar";
    const dir = isRTL ? "rtl" : ("ltr" as "rtl" | "ltr");
    const textAlign = isRTL ? "right" : ("left" as "right" | "left");

    const changeLang = (lang: string) => {
        i18n.changeLanguage(lang);
    };

    return { t, lang, isHebrew, isRTL, dir, textAlign, changeLang };
};
