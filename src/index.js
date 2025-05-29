import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { initI18n } from "./i18n/i18n";

const detectCountryAndInit = async () => {
  let detectedLang;

  // 1️⃣ Check localStorage first
  const langFromLocalStorage = localStorage.getItem("i18nextLng");
  if (langFromLocalStorage) {
    detectedLang = langFromLocalStorage;
  } else {
    // 2️⃣ No localStorage preference — do geolocation
    try {
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();
      const countryCode = data.country_code;

      if (countryCode === "IL") {
        detectedLang = "he";
      } else {
        detectedLang = "en";
      }
    } catch (error) {
      detectedLang = "en";
    }
  }

  // Initialize i18n with the detected language
  await initI18n(detectedLang);

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
