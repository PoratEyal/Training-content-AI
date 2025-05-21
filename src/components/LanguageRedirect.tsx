import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import route from "../router/route.json";
import { useLanguage } from "../i18n/useLanguage";

/**
 * Redirects to the correct home route based on language if needed.
 * - If on `/` and language is English, redirect to `/en`
 * - If on `/en` and language is Hebrew, redirect to `/`
 * - Otherwise, render nothing
 */
const LanguageRedirect = () => {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === route.home && lang === "en") {
      navigate(route.homeEn, { replace: true });
    } else if (location.pathname === route.homeEn && lang === "he") {
      navigate(route.home, { replace: true });
    }
    // else: do nothing
  }, [lang, location.pathname, navigate]);

  return null;
};

export default LanguageRedirect;
