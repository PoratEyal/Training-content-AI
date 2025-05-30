import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "../i18n/useLanguage";

const LanguageRedirect = () => {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const currentLangPrefix = path.split("/")[1]; // e.g., 'en', 'he', 'es', 'ar'
    const supportedLangs = ["en", "he", "es", "ar"];

    if (supportedLangs.includes(currentLangPrefix)) {
      if (lang !== currentLangPrefix) {
        // If language doesn't match the path prefix, replace it
        const newPath = path.replace(/^\/(en|he|es|ar)/, `/${lang}`);
        navigate(newPath + location.search, { replace: true });
      }
    } else {
      // No language prefix, add it
      navigate(`/${lang}${path === "/" ? "" : path}` + location.search, { replace: true });
    }
  }, [lang, location.pathname, location.search, navigate]);

  return null;
};

export default LanguageRedirect;
