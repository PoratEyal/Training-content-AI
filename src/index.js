import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { detectCountry } from "./utils/geo";
import { initI18n } from "./i18n/i18n";

const bootstrap = async () => {
  const country = await detectCountry();
  const defaultLng = country === "IL" ? "he" : "en";
  await initI18n(defaultLng);

  const rootEl = document.getElementById("root");
  if (!rootEl) return;
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

bootstrap();
