import { GoogleGenerativeAI } from "@google/generative-ai";
import { ActivityDetails } from "../model/types/activity";
import { defineString } from "firebase-functions/params";
import { formatString } from "../utils/format";
import { CONTANT_PROMPT_M } from "../model/prompts/contant_M";
import { CONTANT_PROMPT_S } from "../model/prompts/contant_S";
import { CONTANT_PROMPT_B } from "../model/prompts/contant_B";
import { VIEW_PROMPT_S } from "../model/prompts/pointOfView_S";
import { VIEW_PROMPT_M } from "../model/prompts/pointOfView_M";
import { PLAY_PROMPT_M } from "../model/prompts/playTime_M";
import { SURVIVAL_PROMPT_S } from "../model/prompts/survival_S";
import { SURVIVAL_PROMPT_M } from "../model/prompts/survival_M";
import { PLAY_PROMPT_S } from "../model/prompts/playTime_S";

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
    const { subject, category, time, amount, grade, gender, place } = activityDetials;
    let promptOptions: [string, string, string] = ["", "", ""];
    switch (category) {
        case "contant":
            promptOptions = [CONTANT_PROMPT_S, CONTANT_PROMPT_M, CONTANT_PROMPT_B];
            break;
        case "pointOfView":
            promptOptions = [VIEW_PROMPT_S, VIEW_PROMPT_M, VIEW_PROMPT_M];
            break;
        case "survival":
            promptOptions = [SURVIVAL_PROMPT_S, SURVIVAL_PROMPT_M, SURVIVAL_PROMPT_M];
            break;
        case "playTime":
            promptOptions = [PLAY_PROMPT_S, PLAY_PROMPT_M, PLAY_PROMPT_M];
            break;
        default:
            promptOptions = [CONTANT_PROMPT_S, CONTANT_PROMPT_M, CONTANT_PROMPT_B];
            break;
    }

    const prompt = promptPerGrade(grade, promptOptions);
    const result = formatString(prompt, [time, subject, amount, grade, gender, place]);
    return await generateContent(result);
}
