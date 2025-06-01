//
// This hook sets up the language and text direction for the site
// It helps detect which language is active and switch between them
//
import { useTranslation } from "react-i18next";
import { Lng } from "../models/types/common";

export const useLanguage = () => {
  const { t, i18n } = useTranslation();

  const lang = i18n.language as Lng;
  const isHebrew = lang === "he";
  const isEnglish = lang === "en";
  const isSpanish = lang === "es";
  const isArabic = lang === "ar";
  const isRTL = isHebrew || isArabic;
  const dir = isRTL ? "rtl" : "ltr" as "rtl" | "ltr";
  const textAlign = isRTL ? "right" : "left" as "right" | "left";

  const changeLang = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return { t, lang, isHebrew, isEnglish, isSpanish, isArabic, isRTL, dir, textAlign, changeLang };
};
