import * as functions from "firebase-functions";
import express from "express";

// Handle redirect Languageת Used in firebase.json rewrites
const redirectApp = express();

redirectApp.get("*", async (req, res) => {

  let lang = "en"; // Default fallback

  try {
    const ip = (req.headers["x-forwarded-for"] || "").toString().split(",")[0].trim();
    const geo = await fetch(`https://ipinfo.io/${ip}/json?token=ed3d1cc51b018b`).then(r => r.json());

    if (geo?.error) {
      console.error("[redirectToLang error] — using fallback");
      lang = "en";  // Default fallback
    }
    else {
      const countryCode = geo?.country?.toUpperCase() || "";
      const spanishSpeakingCountries = ["AR", "BO", "CL", "CO", "CR", "CU", "DO", "EC", "SV", "GQ", "GT", "HN", "MX", "NI", "PA", "PY", "PE", "PR", "ES", "UY", "VE"];
      const arabicSpeakingCountries = ["DZ", "BH", "EG", "IQ", "JO", "KW", "LB", "LY", "MA", "OM", "QA", "SA", "SD", "SY", "TN", "AE", "YE"];
      const frenchSpeakingCountries = ["FR", "BE", "CH", "LU", "CD", "CI", "CM", "SN", "MG", "BF", "NE", "ML", "GN", "TG", "BJ", "RW", "BI", "DJ", "KM", "SC", "MU", "GA", "CG", "CF", "TD", "MC"];
      const portugueseSpeakingCountries = ["BR", "PT", "AO", "MZ", "CV", "GW", "ST", "TL"];

      if (countryCode === "IL") lang = "he";
      else if (spanishSpeakingCountries.includes(countryCode)) lang = "es";
      else if (arabicSpeakingCountries.includes(countryCode)) lang = "ar";
      else if (frenchSpeakingCountries.includes(countryCode)) lang = "fr";
      else if (portugueseSpeakingCountries.includes(countryCode)) lang = "pt";
      else lang = "en";
    }
  } catch (error) {
    console.error("[redirectToLang]: GeoIP lookup failed:", error);
    lang = "en"; // Fallback if GeoIP fails
  }

  const originalPath = req.path.replace(/^\/+/, "");
  const redirectTo = `/${lang}/${originalPath}`;
  res.redirect(301, redirectTo);
});

const redirectToLang = functions.https.onRequest(redirectApp);
export default redirectToLang;