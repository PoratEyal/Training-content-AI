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
- No risk. Keep it fun, age-appropriate, and inclusive.
- Use simple materials that are easy to find.
- Limit the "materials" list to a maximum of 4 items.
- Provide a **detailed explanation** for each activity in the "flow" section. Each description should include: what the facilitator does, what the participants do, and what the goal of the stage is. Avoid vague or general descriptions.
- Include at least 4 distinct stages in the "flow" section unless otherwise implied by duration.
`.trim();
};

export async function generateEventActivityAI(event: string, moreDetails: string, age: string, amount: string, gender: string, place: string, time: string, lang: Lang): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const prompt = buildPrompt({ event, moreDetails, age, amount, gender, place, time }, lang);
  const result = await model.generateContent(prompt);
  return result.response.text();
}
