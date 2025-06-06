//
// This hook sets up the language and text direction for the site
// It helps detect which language is active and switch between them
//
import { useEffect } from "react";
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
  const dir: "rtl" | "ltr" = isRTL ? "rtl" : "ltr";
  const textAlign: "right" | "left" = isRTL ? "right" : "left";

  const changeLang = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  // 🔄 Update <html> tag when lang changes
  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("lang", lang);
    html.setAttribute("dir", dir);
  }, [lang, dir]);

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
