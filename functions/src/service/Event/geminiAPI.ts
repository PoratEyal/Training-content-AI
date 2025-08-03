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
You are a creative event planner.
Create a unique and engaging event idea based on the following parameters.
The entire response must be written in ${langDisplayName}.

Parameters:
- Event type: ${eventDetails.event}
- Additional details: ${eventDetails.moreDetails}
- Participant age range: ${eventDetails.age}
- Number of participants: ${eventDetails.amount}
- Gender: ${eventDetails.gender}
- Location: ${eventDetails.place}
- Time of day: ${eventDetails.time}

The output should include:
1. A creative event name or theme
2. A short paragraph describing the event and its vibe
3. A suggested timeline or flow of the event activities
4. Tips for setup or any special considerations

Keep the tone fun and accessible. Avoid repeating the input parameters verbatim. Add value by expanding creatively on the idea.
`.trim();
};

export async function generateEvent(event: string, moreDetails: string, age: string, amount: string, gender: string, place: string, time: string, lang: Lang): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const prompt = buildPrompt({ event, moreDetails, age, amount, gender, place, time }, lang);
console.log("-------------------------------------------Prompt:\n", prompt);
  const result = await model.generateContent(prompt);
  return result.response.text();
}
