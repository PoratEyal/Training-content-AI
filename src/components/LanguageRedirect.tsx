import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "../i18n/useLanguage";

const LanguageRedirect = () => {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const currentLangPrefix = path.split("/")[1];
    const supportedLangs = ["en", "he", "es", "ar"];

    // If the URL already has a language prefix
    if (supportedLangs.includes(currentLangPrefix)) {
      if (currentLangPrefix !== lang) {
        // Replace the language prefix with the current language
        const newPath = `/${lang}${path.substring(currentLangPrefix.length + 1)}`;
        navigate(newPath + location.search, { replace: true });
      }
    } else {
      // If there is no language prefix, add the current language prefix
      const newPath = `/${lang}${path === "/" ? "" : path}`;
      navigate(newPath + location.search, { replace: true });
    }
  }, [lang, location.pathname, location.search, navigate]);

  return null;
};

export default LanguageRedirect;
