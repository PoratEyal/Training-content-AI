import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import route from "../router/route.json";
import { useLanguage } from "../i18n/useLanguage";

/**
 * Redirects to the correct route based on language for all pages.
 * - If language is English and path does not start with /en, redirect to /en + path
 * - If language is Hebrew and path starts with /en, redirect to path without /en
 * - Otherwise, render nothing
 */
const LanguageRedirect = () => {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (lang === "en" && !path.startsWith("/en")) {
      // Redirect to English route
      navigate(`/en${path === "/" ? "" : path}` + location.search, { replace: true });
    } else if (lang === "he" && path.startsWith("/en")) {
      // Redirect to Hebrew route
      const newPath = path.replace(/^\/en/, "") || "/";
      navigate(newPath + location.search, { replace: true });
    }
    // else: do nothing
  }, [lang, location.pathname, location.search, navigate]);

  return null;
};

export default LanguageRedirect;
