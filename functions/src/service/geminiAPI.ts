import { GoogleGenerativeAI } from "@google/generative-ai";
import { ActivityDetails } from "../model/types/activity";
import { defineString } from "firebase-functions/params";
import { MAIN_ACTIVITY_PROMPT_S } from "../model/prompts/mainActivity_S";
import { MAIN_ACTIVITY_PROMPT_M } from "../model/prompts/mainActivity_M";
import { MAIN_ACTIVITY_PROMPT_B } from "../model/prompts/mainActivity_B";
import { formatParts, formatString } from "../utils/format";
import { PLAY_PROMPT_M } from "../model/prompts/playing_M";
import { SURVIVE_PROMPT_M } from "../model/prompts/survive_M";
import { SURVIVE_PROMPT_S } from "../model/prompts/survive_S";
import { VIEW_PROMPT_M } from "../model/prompts/view_M";
import { VIEW_PROMPT_S } from "../model/prompts/view_S";

const genAI = new GoogleGenerativeAI(defineString("API_KEY").value() || "");

async function generateContent(prompt: string): Promise<string> {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    return text;
}

function promptPerGrade(grade: string, prompts: [string, string, string]): string {
    switch (grade) {
        case "כיתה א":
        case "כיתה ב":
        case "כיתה ג":
        case "כיתה ד":
            return prompts[0];
        case "כיתה ה":
        case "כיתה ו":
        case "כיתה ז":
        case "כיתה ח":
            return prompts[1];
        case "כיתה ט":
        case "כיתה י":
        case "כיתה יא":
        case "כיתה יב":
            return prompts[2];
        default:
            return "";
    }
}

export async function getMainActivity(activityDetials: ActivityDetails): Promise<string> {
    const { subject, parts, time, amount, grade, gender, place } = activityDetials;
    let result = "";

    if (parts.length === 1) {
        let promptsArray: [string, string, string] = ["", "", ""];
        if (parts[0].name === "pointOfView")
            promptsArray = [VIEW_PROMPT_S, VIEW_PROMPT_M, VIEW_PROMPT_M];
        else if (parts[0].name === "playTime")
            promptsArray = [PLAY_PROMPT_M, PLAY_PROMPT_M, PLAY_PROMPT_M];
        else if (parts[0].name === "survival")
            promptsArray = [SURVIVE_PROMPT_S, SURVIVE_PROMPT_M, SURVIVE_PROMPT_M];

        if(promptsArray[0] !== ""){
            const prompt = promptPerGrade(grade, promptsArray);
            result = formatString(prompt, [subject, time, amount, grade, gender, place]);
            return await generateContent(result);
        }
    }
    const partsString = formatParts(parts);
    const prompt = promptPerGrade(grade, [
        MAIN_ACTIVITY_PROMPT_S,
        MAIN_ACTIVITY_PROMPT_M,
        MAIN_ACTIVITY_PROMPT_B,
    ]);
    result = formatString(prompt, [subject, time, amount, grade, gender, place, partsString]);
    return await generateContent(result);
}



