import axios from 'axios';
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

async function generateContent(prompt: string): Promise<string> {
    const API_KEY = defineString("API_KEY_CLAUDE").value() || "";
    
    if (!API_KEY) {
        throw new Error("Missing Claude API key");
    }

    try {
        const response = await axios.post('https://api.anthropic.com/v1/messages', {
            messages: [{
                role: "user",
                content: prompt
            }],
            model: "claude-3.5-sonnet-20240229",
            max_tokens: 1000,
            temperature: 0.7,
            top_p: 0.95
        }, {
            headers: {
                'anthropic-version': '2023-06-01',
                'x-api-key': API_KEY,
                'Content-Type': 'application/json',
            },
        });

        return response.data.content[0].text.trim();
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('API Error:', error.response?.data || error.message);
        }
        throw error;
    }
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

export async function getMainActivity(activityDetails: ActivityDetails): Promise<string> {
    const { subject, category, time, amount, grade, gender, place } = activityDetails;
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
            promptOptions = [PLAY_PROMPT_M, PLAY_PROMPT_M, PLAY_PROMPT_M];
            break;
        default:
            promptOptions = [CONTANT_PROMPT_S, CONTANT_PROMPT_M, CONTANT_PROMPT_B];
            break;
    }

    console.log(" - - - - - - EYAL CHECK - - - - - - - ");
    
    const prompt = promptPerGrade(grade, promptOptions);
    const result = formatString(prompt, [time, subject, amount, grade, gender, place]);
    const result1 = await generateContent(result)
    console.log(`EYAL CHECK - - - - - - - - - - - ${result1}`);
    return result1
    //return await generateContent(result);
}
