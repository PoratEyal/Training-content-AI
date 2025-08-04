import * as functions from "firebase-functions";
import express from "express";

// Handle redirect Languageת Used in firebase.json rewrites
const redirectApp = express();

redirectApp.get("*", async (req, res) => {

  let lang = "he"; // Default fallback

  try {
    const ip = (req.headers["x-forwarded-for"] || "").toString().split(",")[0].trim();
    const geo = await fetch(`https://ipinfo.io/${ip}/json?token=ed3d1cc51b018b`).then(r => r.json());

    if (geo?.error) {
      console.error("[redirectToLang error] — using fallback");
      lang = "he";  // Default fallback, mostely used country for now
    }
    else {
      const countryCode = geo?.country?.toUpperCase() || "";
      const spanishSpeakingCountries = ["AR", "BO", "CL", "CO", "CR", "CU", "DO", "EC", "SV", "GQ", "GT", "HN", "MX", "NI", "PA", "PY", "PE", "PR", "ES", "UY", "VE"];
      const arabicSpeakingCountries = ["DZ", "BH", "EG", "IQ", "JO", "KW", "LB", "LY", "MA", "OM", "QA", "SA", "SD", "SY", "TN", "AE", "YE"];

      if (countryCode === "IL") lang = "he";
      else if (spanishSpeakingCountries.includes(countryCode)) lang = "es";
      else if (arabicSpeakingCountries.includes(countryCode)) lang = "ar";
      else lang = "en";
    }
  } catch (error) {
    console.error("[redirectToLang]: GeoIP lookup failed:", error);
    lang = "he"; // Fallback if GeoIP fails
  }

  const originalPath = req.path.replace(/^\/+/, "");
  const redirectTo = `/${lang}/${originalPath}`;
  res.redirect(301, redirectTo);
});

const redirectToLang = functions.https.onRequest(redirectApp);
export default redirectToLang;