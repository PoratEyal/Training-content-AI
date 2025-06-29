import { detectLanguage, SupportedLang } from "./detectLanguage"

const voiceMap: Partial<Record<SupportedLang, string>> = {
  ar: "Arabic Male",
  he: "Hebrew Male",
  en: "UK English Male",
  es: "Spanish Male",
  fr: "French Male",
  ru: "Russian Male",
  de: "Deutsch Male",
  it: "Italian Male",
  pt: "Portuguese Male",
  ja: "Japanese Male",
  ko: "Korean Male",
  hi: "Hindi Male",
  zh: "Chinese Male",
  bn: "Bangla Male",
  tr: "Turkish Male",
}

export function speakText(text: string, lang: string) {
  if (!window.responsiveVoice || typeof text !== "string" || !text.trim()) return
  const voice = voiceMap[lang] || "UK English Male"
  window.responsiveVoice.speak(text, voice, { rate: 0.8 })
}

