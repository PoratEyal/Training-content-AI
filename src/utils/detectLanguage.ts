//
// Detects the most likely language of a given text input based on Unicode character patterns or unique language-specific letters.
//
export type SupportedLang =
  | "he" | "ar" | "en" | "es" | "fr" | "ru" | "de"
  | "tr" | "it" | "pt" | "zh" | "ja" | "ko" | "hi" | "bn"
  | "unknown"

export function detectLanguage(text: string): SupportedLang {
  if (!text || typeof text !== "string") return "unknown"

  const tests: { lang: SupportedLang; regex: RegExp }[] = [
    { lang: "ar", regex: /[\u0600-\u06FF]/ },                            // Arabic
    { lang: "he", regex: /[\u0590-\u05FF]/ },                            // Hebrew
    { lang: "ru", regex: /[\u0400-\u04FF]/ },                            // Russian
    { lang: "hi", regex: /[\u0900-\u097F]/ },                            // Hindi (Devanagari)
    { lang: "bn", regex: /[\u0980-\u09FF]/ },                            // Bengali
    { lang: "zh", regex: /[\u4E00-\u9FFF]/ },                            // Chinese
    { lang: "ja", regex: /[\u3040-\u30FF\u31F0-\u31FF]/ },               // Japanese (Hiragana, Katakana)
    { lang: "ko", regex: /[\uAC00-\uD7AF]/ },                            // Korean (Hangul)
    { lang: "fr", regex: /\b(le|la|les|de|des|un|une|et|à|en|est|pas|je|tu|il|elle|nous|vous|ils|elles|bonjour|merci|s'il|vous|plaît|combien|ça|coûte|nourriture|toilettes|entrée|aide|eau)\b|[àâçéèêëîïôûùüÿœæ]/i },   // French
    { lang: "es", regex: /[ñ¿¡áéíóú]/i },                                // Spanish
    { lang: "pt", regex: /[ãõâêôáéíóúç]/i },                             // Portuguese
    { lang: "de", regex: /[äöüß]/i },                                    // German
    { lang: "tr", regex: /[şğçüöıİ]/i },                                 // Turkish
    { lang: "it", regex: /\b(il|la|lo|un|una|che|come|per|con|ciao|e|non|sono|noi|voi|loro)\b|[àèéìòù]/i }, // Italian
    { lang: "en", regex: /^[\x00-\x7F\s.,!?'"()\-\u200f\u200e]+$/ },     // English (ASCII)
  ]

  for (const { lang, regex } of tests) {
    if (regex.test(text)) return lang
  }

  return "unknown"
}
