import axios from 'axios';
import { ActivityDetails } from "../model/types/activity";
import { defineString } from "firebase-functions/params";
import { formatString } from "../utils/format";
import { CONTANT_PROMPT_M } from "../model/prompts/he/contant_M";
import { CONTANT_PROMPT_S } from "../model/prompts/he/contant_S";
import { CONTANT_PROMPT_B } from "../model/prompts/he/contant_B";
import { VIEW_PROMPT_S } from "../model/prompts/he/pointOfView_S";
import { VIEW_PROMPT_M } from "../model/prompts/he/pointOfView_M";
import { PLAY_PROMPT_M } from "../model/prompts/he/playTime_M";
import { SURVIVAL_PROMPT_S } from "../model/prompts/he/survival_S";
import { SURVIVAL_PROMPT_M } from "../model/prompts/he/survival_M";
// -- NOT IN USE -- //

async function generateContent(prompt: string): Promise<string> {
    const API_KEY = defineString("API_KEY_CLAUDE").value() || "";

    try {
        const response = await axios({
            method: 'post',
            url: 'https://api.anthropic.com/v1/messages',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY,
                'anthropic-version': '2023-06-01'
            },
            data: {
                model: 'claude-3-5-haiku-20241022',
                // model: 'claude-3-sonnet-20240229',
                max_tokens: 1024,
                temperature: 0.6,
                messages: [{
                    role: 'user',
                    content: prompt
                }]
            }
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

    const prompt = promptPerGrade(grade, promptOptions);
    const result = formatString(prompt, [time, subject, amount, grade, gender, place]);
    return await generateContent(result);
}
