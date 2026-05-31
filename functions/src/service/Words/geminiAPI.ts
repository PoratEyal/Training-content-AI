import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import * as functions from "firebase-functions";
import { Lang } from "../../model/types/common";

const geminiConfig = functions.config()?.gemini;
const apiKey = geminiConfig?.apikey || process.env.API_KEY || "";
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

const langName: Record<Lang, string> = {
  he: "Hebrew",
  en: "English",
  ar: "Arabic",
  es: "Spanish",
  fr: "French",
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
export async function generateWordsAI(
  topic: string | null,
  pLearningLang: Lang,
  pUserLang: Lang,
  count: number = 10,
  retries = 3,
  delayMs = 1500
): Promise<string> {
  const requestedModel = "gemini-2.5-flash-lite";
  assertAllowedModel(requestedModel);
  assertNotImageModel(requestedModel);
  const generationConfig = {
    maxOutputTokens: 2000,
    responseMimeType: "application/json",
    responseSchema: {
      type: SchemaType.ARRAY as SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT as SchemaType.OBJECT,
        properties: {
          text: { type: SchemaType.STRING as SchemaType.STRING },
          pronunciation: { type: SchemaType.STRING as SchemaType.STRING },
          dist1: { type: SchemaType.STRING as SchemaType.STRING },
          dist2: { type: SchemaType.STRING as SchemaType.STRING },
          dist3: { type: SchemaType.STRING as SchemaType.STRING }
        },
        required: ["text", "pronunciation", "dist1", "dist2", "dist3"],
      }
    }
  };
  const model = genAI.getGenerativeModel({ model: requestedModel, generationConfig, });
  const prompt = buildPrompt(topic, pLearningLang, pUserLang, count);

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      const isTransient =
        errorMsg.includes("500") ||
        errorMsg.includes("503") ||
        errorMsg.includes("504") ||
        errorMsg.includes("429") ||
        errorMsg.toLowerCase().includes("internal error") ||
        errorMsg.toLowerCase().includes("service unavailable") ||
        errorMsg.toLowerCase().includes("overloaded") ||
        errorMsg.toLowerCase().includes("resource exhausted");
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
