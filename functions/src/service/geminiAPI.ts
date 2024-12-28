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
import {
    CONTANT_SECTION_20_IN,
    CONTANT_SECTION_30_IN,
    CONTANT_SECTION_45_IN,
    CONTANT_SECTION_60_IN,
    CONTANT_SECTION_90_IN,
    CONTANT_SECTION_120_IN,
    CONTANT_SECTION_20_OUT,
    CONTANT_SECTION_30_OUT,
    CONTANT_SECTION_45_OUT,
    CONTANT_SECTION_60_OUT,
    CONTANT_SECTION_90_OUT,
    CONTANT_SECTION_120_OUT,
    POINT_SECTION_20,
    POINT_SECTION_30,
    POINT_SECTION_45,
    POINT_SECTION_60,
    POINT_SECTION_90,
    POINT_SECTION_120,
    SURVIVAL_SECTION_20,
    SURVIVAL_SECTION_30,
    SURVIVAL_SECTION_45,
    SURVIVAL_SECTION_60,
    SURVIVAL_SECTION_90,
    SURVIVAL_SECTION_120,
    PLAY_SECTION
} from "../model/prompts/sections";

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

const sectionPerTime = (time: string, section: string[]) => {
    switch (time) {
        case "20 דקות":
            return section[0];
        case "חצי שעה":
            return section[1];
        case "45 דקות":
            return section[2];
        case "שעה":
            return section[3];
        case "שעה וחצי":
            return section[4];
        case "שעתיים":
            return section[5];
        default:
            return "";
    }
};

export async function getMainActivity(activityDetials: ActivityDetails): Promise<string> {
    const { subject, category, time, amount, grade, gender, place } = activityDetials;
    let promptOptions: [string, string, string] = ["", "", ""];
    let section: string = "";
    switch (category) {
        case "pointOfView":
            promptOptions = [VIEW_PROMPT_S, VIEW_PROMPT_M, VIEW_PROMPT_M];
            section = sectionPerTime(time, [
                POINT_SECTION_20,
                POINT_SECTION_30,
                POINT_SECTION_45,
                POINT_SECTION_60,
                POINT_SECTION_90,
                POINT_SECTION_120,
            ]);
            break;
        case "survival":
            promptOptions = [SURVIVAL_PROMPT_S, SURVIVAL_PROMPT_M, SURVIVAL_PROMPT_M];
            section = sectionPerTime(time, [
                SURVIVAL_SECTION_20,
                SURVIVAL_SECTION_30,
                SURVIVAL_SECTION_45,
                SURVIVAL_SECTION_60,
                SURVIVAL_SECTION_90,
                SURVIVAL_SECTION_120,
            ]);
            break;
        case "playTime":
            promptOptions = [PLAY_PROMPT_S, PLAY_PROMPT_M, PLAY_PROMPT_M];
            section = sectionPerTime(time, [
                PLAY_SECTION,
                PLAY_SECTION,
                PLAY_SECTION,
                PLAY_SECTION,
                PLAY_SECTION,
                PLAY_SECTION,
            ]);
            break;
        default: //contant
            promptOptions = [CONTANT_PROMPT_S, CONTANT_PROMPT_M, CONTANT_PROMPT_B];
            section = sectionPerTime(
                time,
                place === "במקום פתוח"
                    ? [
                          CONTANT_SECTION_20_OUT,
                          CONTANT_SECTION_30_OUT,
                          CONTANT_SECTION_45_OUT,
                          CONTANT_SECTION_60_OUT,
                          CONTANT_SECTION_90_OUT,
                          CONTANT_SECTION_120_OUT,
                      ]
                    : [
                          CONTANT_SECTION_20_IN,
                          CONTANT_SECTION_30_IN,
                          CONTANT_SECTION_45_IN,
                          CONTANT_SECTION_60_IN,
                          CONTANT_SECTION_90_IN,
                          CONTANT_SECTION_120_IN,
                      ],
            );
            break;
    }

    const prompt = promptPerGrade(grade, promptOptions);
    const result = formatString(prompt, [time, subject, amount, grade, gender, place, section]);
    return await generateContent(result);
}
