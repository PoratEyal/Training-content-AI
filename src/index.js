/**
 * Main React entry point.
 * Detects user's preferred language:
 * 1. Uses localStorage if available.
 * 2. Otherwise, detects by country (IL => Hebrew, Spanish/Arabic countries => respective language, others => English).
 * 3. Defaults to English on error.
 * Initializes i18n and renders the app.
 */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { initI18n } from "./i18n/i18n";

const detectCountryAndInit = async () => {
  let detectedLang;

  // 1️⃣ Use localStorage if available
  const langFromLocalStorage = localStorage.getItem("i18nextLng");
  if (langFromLocalStorage) {
    detectedLang = langFromLocalStorage;
  } else {
    // 2️⃣ Detect language by country
    try {
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();
      const countryCode = data.country_code;

      // Spanish-speaking countries
      const spanishSpeakingCountries = [
        "ES", "MX", "AR", "CO", "PE", "VE", "CL", "EC", "GT", "CU", "BO",
        "DO", "HN", "PY", "SV", "NI", "CR", "PA", "UY", "GQ", "PR"
      ];

      // Arabic-speaking countries
      const arabicSpeakingCountries = [
        "SA", "AE", "DZ", "EG", "IQ", "JO", "KW", "LB", "LY", "MA", "OM",
        "QA", "SY", "TN", "YE", "BH", "SD", "MR", "DJ", "KM", "SO"
      ];

      if (countryCode === "IL") {
        detectedLang = "he";
      } else if (spanishSpeakingCountries.includes(countryCode)) {
        detectedLang = "es";
      } else if (arabicSpeakingCountries.includes(countryCode)) {
        detectedLang = "ar";
      } else {
        detectedLang = "en";
      }
    } catch (error) {
      detectedLang = "en";
    }
  }

  // Initialize i18n
  await initI18n(detectedLang);

  // Render the app
  const rootEl = document.getElementById("root");
  if (!rootEl) return;
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

detectCountryAndInit();
