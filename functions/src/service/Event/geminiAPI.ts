import { GoogleGenerativeAI } from "@google/generative-ai";
import { Lang } from "../../model/types/common";
import * as functions from "firebase-functions";

// Production: geminiConfig?.apikey
// Dev Emulator: process.env.API_KEY
const geminiConfig = functions.config()?.gemini;
const apiKey = geminiConfig?.apikey || process.env.API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

type EventDetails = {
  event: string;
  moreDetails: string;
  age: string;
  amount: string;
  gender: string;
  place: string;
  time: string;
};

const buildPrompt = (eventDetails: EventDetails, lang: Lang): string => {
  const langDisplayName = {
    he: "Hebrew",
    en: "English",
    ar: "Arabic",
    es: "Spanish"
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
- Age Group: ${eventDetails.age}
- Number of Participants: ${eventDetails.amount}
- Gender: ${eventDetails.gender}
- Location: ${eventDetails.place}
- Duration: ${eventDetails.time}

JSON format:
{
  "title": "string (event title)",
  "summary": "string (short engaging paragraph)",
  "materials": ["string", "string", "..."],
  "flow": [
    {
      "title": "string (stage name)",
      "description": "string (what happens in this stage)",
      "duration": "optional string like '10 minutes'"
    }
  ],
  "tips": ["string", "string", "..."]
}

Rules:
- Prioritize games, group challenges, or hands-on activities over long explanations.
- No violence, no risk. Keep it fun, age-appropriate, and inclusive.
- Use simple materials that are easy to find.
`.trim();
};

export async function generateEvent(event: string, moreDetails: string, age: string, amount: string, gender: string, place: string, time: string, lang: Lang): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const prompt = buildPrompt({ event, moreDetails, age, amount, gender, place, time }, lang);
  const result = await model.generateContent(prompt);
  console.log(result.response.text())
  return result.response.text();
}
