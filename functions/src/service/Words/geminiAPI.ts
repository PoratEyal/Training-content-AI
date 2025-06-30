import { GoogleGenerativeAI } from "@google/generative-ai";
import * as functions from "firebase-functions";
import { Lang } from "../../model/types/common";

const geminiConfig = functions.config()?.gemini;
const apiKey = geminiConfig?.apikey || process.env.API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

const langName: Record<Lang, string> = {
  he: "Hebrew",
  en: "English",
  ar: "Arabic",
  es: "Spanish",
};

const buildPrompt = (
  topic: string | null,
  pLearningLang: Lang,
  pUserLang: Lang,
  count: number
): string => {

  const learningLang = langName[pLearningLang] || pLearningLang;
  const userLang = langName[pUserLang] || pUserLang;

  const topicPart = topic?.trim()
    ? `based on the topic: "${topic.trim()}".`
    : `that are useful for a beginner.`;

  return `
Generate a list of ${count} useful words or phrases in the language ${learningLang}, ${topicPart}

For each word/phrase, return a JSON object in the following structure:
{
  "text": "original word or phrase in ${learningLang}",
  "pronunciation": "how it sounds, written phonetically in ${userLang}",
  "dist1": "plausible distractor in ${userLang}",
  "dist2": "plausible distractor in ${userLang}",
  "dist3": "plausible distractor in ${userLang}"
}

Guidelines:
- The "pronunciation" field should show how to pronounce the word using ${userLang} script (not the translated meaning).
- The distractors (dist1–3) must be in ${userLang}, semantically or thematically similar, but clearly incorrect translations.
- Do NOT include the correct translation anywhere.
- All fields must be in plain UTF-8 text.
- Return **only** a JSON array of ${count} such objects.
- Do not include explanations or comments outside the JSON.
`.trim();
};

// Create the quiz with the provided parameters
export async function getWordsFromAI(topic: string | null, pLearningLang: Lang, pUserLang: Lang, count: number = 10): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const prompt = buildPrompt(topic, pLearningLang, pUserLang, count);
  const result = await model.generateContent(prompt);
  return result.response.text();
}
