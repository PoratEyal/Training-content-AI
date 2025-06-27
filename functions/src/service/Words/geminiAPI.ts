import { GoogleGenerativeAI } from "@google/generative-ai"
import * as functions from "firebase-functions"
import { Lang } from "../../model/types/common"

// Production: geminiConfig?.apikey
// Dev Emulator: process.env.API_KEY
const geminiConfig = functions.config()?.gemini
const apiKey = geminiConfig?.apikey || process.env.API_KEY || ""
const genAI = new GoogleGenerativeAI(apiKey)

// LIOR - TO CHANGE A,B,C,D TO something generic
const langName: Record<Lang, string> = {
  he: "עברית",
  en: "English",
  ar: "Arabic",
  es: "Spanish",
}

// תוויות תשובות לכל שפה
const answerLabels: Record<Lang, string[]> = {
  he: ["א", "ב", "ג", "ד"],
  ar: ["أ", "ب", "ج", "د"],
  en: ["A", "B", "C", "D"],
  es: ["A", "B", "C", "D"],
}

const buildPrompt = (words: string, sourceLang: Lang, targetLang: Lang): string => {

  const wordList = words
    .split(/[\n,]/)
    .map(w => w.trim())
    .filter(Boolean)
    .slice(0, 20)
    .join(", ")

  const labels = answerLabels[targetLang] || ["A", "B", "C", "D"]

  return `
For each of the following words, generate one multiple-choice translation question.
The question should **only be the source word itself**, without any extra phrasing.
Use this format:
- Start each question with ~1~, ~2~, etc.
- The question is just the word, for example: ~1~ meal
- Provide 4 translation options into ${langName[targetLang]}, labeled ~${labels[0]}~, ~${labels[1]}~, etc.
- Highlight **only one** correct answer using double asterisks, e.g. ~${labels[1]}~ **אוכל**
- All 4 options must be plausible and different.
- Respond only with the questions and answers — no explanations.

Words:
${wordList}
  `
}

// Create the quiz with the provided words and languages
export async function getWordsQuiz(words: string, sourceLang: Lang, targetLang: Lang): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })
  const prompt = buildPrompt(words, sourceLang, targetLang)
  console.log("Generated prompt:", prompt)
  const result = await model.generateContent(prompt)
  return result.response.text()
}
