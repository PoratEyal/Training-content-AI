import { GoogleGenerativeAI } from "@google/generative-ai";
import { Lang } from "../../model/types/common";
import * as functions from "firebase-functions";

const geminiConfig = functions.config()?.gemini;
const apiKey = geminiConfig?.apikey || process.env.API_KEY || "";   // Dev Emulator: process.env.API_KEY
const genAI = new GoogleGenerativeAI(apiKey);

// Allow only specific models for security reasons
const ALLOWED_MODELS = new Set([
  "gemini-2.5-flash-lite"
]);

function assertAllowedModel(model: string) {
  if (!ALLOWED_MODELS.has(model)) {
    throw new Error(`Model "${model}" is not allowed`);
  }
}

// Extra guard – block any image-capable models by name pattern
function assertNotImageModel(model: string) {
  if (/imagen|image-preview|image|photo|vision/i.test(model)) {
    throw new Error("Image generation models are blocked");
  }
}

const buildPrompt = (topic: string, count: number, lang: Lang): string => {
  const langDisplayName = {
    he: "Hebrew",
    en: "English",
    ar: "Arabic",
    es: "Spanish",
    fr: "French"
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

export async function generatePracticeAI(
  topic: string,
  count: number = 10,
  lang: Lang,
  retries = 3,
  delayMs = 1500
): Promise<string> {
  const requestedModel = "gemini-2.5-flash-lite";
  assertAllowedModel(requestedModel);
  assertNotImageModel(requestedModel);
  const generationConfig = { maxOutputTokens: 2000, };
  const model = genAI.getGenerativeModel({ model: requestedModel, generationConfig, });
  const prompt = buildPrompt(topic, count, lang);

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      const isTransient = errorMsg.includes("503") || errorMsg.toLowerCase().includes("service unavailable") || errorMsg.toLowerCase().includes("overloaded");
      if (isTransient && attempt < retries) {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
        delayMs *= 2;
      } else {
        throw error;
      }
    }
  }
  throw new Error("Failed to generate content after retries");
}
