import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { initI18n } from "./i18n/i18n";

const bootstrap = async () => {
  await initI18n();

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
