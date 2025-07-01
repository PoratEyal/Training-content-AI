import { GoogleGenerativeAI } from "@google/generative-ai";
import { Lang } from "../../model/types/common";
import * as functions from "firebase-functions";

// Production: geminiConfig?.apikey
// Dev Emulator: process.env.API_KEY
const geminiConfig = functions.config()?.gemini;
const apiKey = geminiConfig?.apikey || process.env.API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

const buildPrompt = (topic: string, count: number, lang: Lang): string => {
  const langDisplayName = {
    he: "Hebrew",
    en: "English",
    ar: "Arabic",
    es: "Spanish"
  }[lang];

  return `
You are an educational content creator.
Write ${count} multiple-choice questions on the topic: "${topic}".
All questions and answer choices must be written in ${langDisplayName}.

For each question, return a JSON object in the following structure:
{
  "question": "question text",
  "correct": "correct answer",
  "dist1": "distractor 1",
  "dist2": "distractor 2",
  "dist3": "distractor 3"
}

Guidelines:
- The distractors (dist1–3) must be semantically or thematically similar, but clearly incorrect.
- Do NOT repeat the correct meaning in any of the distractors.
- Make sure all ${count} questions are different.
- Make sure all 4 answer options per question are unique — no duplicates.
- The correct answer must be factually accurate — do not guess or fabricate.
- Use clear and accessible language, suitable for a general audience.
- Return **only** a JSON array of ${count} such objects — no explanations, no formatting, no extra text.
`.trim();
};

export async function getSmartPracticeQuestions(topic: string, count: number = 10, lang: Lang): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const prompt = buildPrompt(topic, count, lang);
  const result = await model.generateContent(prompt);
  return result.response.text();
}
