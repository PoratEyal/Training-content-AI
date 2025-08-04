import * as functions from "firebase-functions";
import express from "express";

// Handle redirect Languageת Used in firebase.json rewrites
const redirectApp = express();

redirectApp.get("*", async (req, res) => {
  let lang = "he"; // Default fallback

  try {
    const ip = (req.headers["x-forwarded-for"] || "").toString().split(",")[0].trim();
    const geo = await fetch(`https://ipapi.co/${ip}/json/`).then(r => r.json());
    const countryCode = geo?.country_code?.toUpperCase() || "";

    const spanishSpeakingCountries = ["AR", "BO", "CL", "CO", "CR", "CU", "DO", "EC", "SV", "GQ", "GT", "HN", "MX", "NI", "PA", "PY", "PE", "PR", "ES", "UY", "VE"];
    const arabicSpeakingCountries = ["DZ", "BH", "EG", "IQ", "JO", "KW", "LB", "LY", "MA", "OM", "QA", "SA", "SD", "SY", "TN", "AE", "YE"];

    if (countryCode === "IL") lang = "he";
    else if (spanishSpeakingCountries.includes(countryCode)) lang = "es";
    else if (arabicSpeakingCountries.includes(countryCode)) lang = "ar";
    else lang = "en";

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