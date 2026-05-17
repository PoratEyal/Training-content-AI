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

type EventDetails = {
  event: string;
  moreDetails: string;
  duration: string;
  age: string;
  amount: string;
  gender: string;
  place: string;
  materials: string;
};

const buildPrompt = (eventDetails: EventDetails, lang: Lang): string => {
  const langDisplayName = {
    he: "Hebrew",
    en: "English",
    ar: "Arabic",
    es: "Spanish",
    fr: "French"
  }[lang];

  return `
You are a creative and practical event planner.
Your task is to generate a full and original event plan based on the following parameters.

- Return ONLY a valid raw JSON object (no markdown, no explanation, no intro, no comments).
- The content must be written in ${langDisplayName}.
- Make sure the result is well-formatted and readable.

Event Parameters:
- Event Type: ${eventDetails.event}
- Additional Details: ${eventDetails.moreDetails || "None"}
- Duration: ${eventDetails.duration}
- Age Group: ${eventDetails.age}
- Number of Participants: ${eventDetails.amount}
- Gender: ${eventDetails.gender}
- Location: ${eventDetails.place}
- Materials Constraint: ${eventDetails.materials}

JSON format:
{
  "title": "string (event title)",
  "summary": "string (short engaging paragraph)",
  "materials": ["string", "string", "..."],
  "flow": [
    {
      "title": "string (stage name)",
      "description": "string (what happens in this stage)",
      "duration": "optional string in ${langDisplayName} like '10 דקות' or '45 minutes'",
    }
  ],
  "tips": ["string", "string", "..."]
}

Rules:
- Prioritize games, group challenges, or hands-on activities over long explanations.
- No risk. Keep it fun, age-appropriate, and inclusive.
- Use simple materials that are easy to find.
- If "Materials Constraint" is "no materials", avoid using any physical items in the activity steps. If it's "any", you may use simple items.
- Provide a detailed explanation for each activity in the "flow" section. Each description should include: what the facilitator does, what the participants do, and what the goal of the stage is. Avoid vague or general descriptions.
- If a stage includes any discussion questions, quiz questions, or example prompts, include at least 2 specific examples (clearly written, not placeholders).
- Include at least 4 distinct stages in the "flow" section.
- Do not include a concluding recap or discussion stage
- If the event includes a trivia or quiz stage, add this link at the end of that stage’s description: “https://activitywiz.com/practice”
`.trim();
};

export async function generateEventActivityAI(event: string, moreDetails: string, duration: string, age: string, amount: string, gender: string, place: string, materials: string, lang: Lang): Promise<string> {
  const requestedModel = "gemini-2.5-flash-lite";
  assertAllowedModel(requestedModel);
  assertNotImageModel(requestedModel);
  const generationConfig = { maxOutputTokens: 2000, };
  const model = genAI.getGenerativeModel({ model: requestedModel, generationConfig, });
  const prompt = buildPrompt({ event, moreDetails, duration, age, amount, gender, place, materials }, lang);
  const result = await model.generateContent(prompt);
  return result.response.text();
}
