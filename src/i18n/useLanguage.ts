import { useTranslation } from "react-i18next";

export const useLanguage = () => {
    const { t, i18n } = useTranslation();
    
    const lang = i18n.language;
    const isHebrew = lang === "he";
    const isEnglish = lang === "en";
    const dir = isHebrew ? "rtl" : "ltr" as "rtl" | "ltr";
    const textAlign = isHebrew ? "right" : "left" as "right" | "left";

    const changeLang = (lang: string) => {
        i18n.changeLanguage(lang);
    }

    return { t, lang, isHebrew, isEnglish, dir, textAlign, changeLang };
}