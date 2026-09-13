declare global {
  interface Window {
    speakControlled?: (text: string, lang: string) => void;
  }
}

export function speakText(text: string, lang: string) {
  if (!window.speakControlled || typeof text !== "string" || !text.trim()) return;
  window.speakControlled(text, lang);
}
