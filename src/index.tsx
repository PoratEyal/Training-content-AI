/**
 * App entry point.
 * - Detects language and initializes i18n.
 * - Detects product type from URL and sets ProductContext.
 * - Renders the app with both contexts ready.
 */
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import { initI18n } from "./i18n/i18n"

import { ProductContext } from "./context/ProductContext"
import { ProductType } from "./context/ProductType"
import { StorageKey } from "./models/enum/storage";

// Detect current product from URL path
const detectProductFromPath = (path: string): ProductType => {
  if (path.includes("/practice")) return ProductType.Practice
  if (path.includes("/youth")) return ProductType.Youth
  if (path.includes("/words")) return ProductType.Words
  return ProductType.Youth
}

const detectCountryAndInit = async () => {
  let detectedLang

  // detect language
  const siteLang = localStorage.getItem(StorageKey.SITE_LANG)
  if (siteLang) {
    detectedLang = siteLang
  } else {
    try {
      const response = await fetch("https://ipapi.co/json/")
      const data = await response.json()
      const countryCode = data.country_code
      const spanishSpeakingCountries = [
        "AR", "BO", "CL", "CO", "CR", "CU", "DO", "EC",
        "SV", "GQ", "GT", "HN", "MX", "NI", "PA", "PY",
        "PE", "PR", "ES", "UY", "VE"
      ]
      const arabicSpeakingCountries = [
        "DZ", "BH", "EG", "IQ", "JO", "KW", "LB", "LY",
        "MA", "OM", "QA", "SA", "SD", "SY", "TN", "AE",
        "YE"
      ]

      if (countryCode === "IL") detectedLang = "he"
      else if (spanishSpeakingCountries.includes(countryCode)) detectedLang = "es"
      else if (arabicSpeakingCountries.includes(countryCode)) detectedLang = "ar"
      else detectedLang = "en"
    } catch {
      detectedLang = "en"
    }
  }

  await initI18n(detectedLang)

  const rootEl = document.getElementById("root")
  if (!rootEl) return
  const root = ReactDOM.createRoot(rootEl)

  const product = detectProductFromPath(window.location.pathname)

  root.render(
    <React.StrictMode>
      <ProductContext.Provider value={product}>
        <App />
      </ProductContext.Provider>
    </React.StrictMode>
  )
}

detectCountryAndInit()
