import { GoogleGenerativeAI } from "@google/generative-ai"
import * as functions from "firebase-functions"
import { Lang } from "../../model/types/common"

const geminiConfig = functions.config()?.gemini
const apiKey = geminiConfig?.apikey || process.env.API_KEY || ""
const genAI = new GoogleGenerativeAI(apiKey)

const langName: Record<Lang, string> = {
  he: "Hebrew",
  en: "English",
  ar: "Arabic",
  es: "Spanish",
}

const buildPrompt = (words: string, pLearningLang: Lang, pUserLang: Lang): string => {

  const learningLang = langName[pLearningLang]
  const userLang = langName[pUserLang]

  const wordList = words
    .split(/[\n,]/)
    .map(w => w.trim())
    .filter(Boolean)
    .slice(0, 35)
    .join(", ")

  return `
For each of the following words in ${learningLang}, generate a JSON object with 3 distractor words (wrong answers) in ${userLang} — the learner's native language.

Instructions:
- Do NOT include the correct translation.
- The distractors should be in ${userLang} only.
- Each distractor should be plausible (semantically or thematically related) but clearly incorrect.
- Return only a valid JSON array.
- For each word, return: { "text": original word, "dist1": ..., "dist2": ..., "dist3": ... }

Words:
${wordList}
  `
}

// Create the quiz with the provided words and languages
export async function getDistractorsWords(words: string, pLearningLang: Lang, pUserLang: Lang): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })
  const prompt = buildPrompt(words, pLearningLang, pUserLang)
  const result = await model.generateContent(prompt)
  return result.response.text()
}
