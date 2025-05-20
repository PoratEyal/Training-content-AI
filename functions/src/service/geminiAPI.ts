import {
    getMoreInfo as getMoreInfo_he,
    getPromptOptions as getPromptOptions_he,
    getSafty as getSafty_he,
    getSection as getSection_he,
    getTools as getTools_he,
    promptPerGrade as promptPerGrade_he,
} from "../utils/he/prompt";
import {
    getMoreInfo as getMoreInfo_en,
    getPromptOptions as getPromptOptions_en,
    getSafty as getSafty_en,
    getSection as getSection_en,
    getTools as getTools_en,
    promptPerGrade as promptPerGrade_en,
} from "../utils/en/prompt";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ActivityDetails } from "../model/types/activity";
import { defineString } from "firebase-functions/params";
import { formatString } from "../utils/format";
import { getPromptAndDetailsForSpecialKids } from "../utils/specialKids";
import { GetActivityRequest } from "../model/types/request";
import { Lang } from "../model/types/common";

const genAI = new GoogleGenerativeAI(defineString("API_KEY").value() || "");

async function generateContent(prompt: string): Promise<string> {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    return text;
}

const getPromptAndDetails = (activityDetails: ActivityDetails, lang: Lang): [string, string[]] => {
    if (activityDetails.movement === "krembo")
        return getPromptAndDetailsForSpecialKids(activityDetails, lang);

    const { category, grade, time, subject, amount, gender, place } = activityDetails;
    const { religion, contest, tools: activityTools, info } = activityDetails;

    let moreInfo, tools, section, safty, promptOptions, prompt;
    if (lang === "he") {
        moreInfo = getMoreInfo_he(info);
        tools = getTools_he(category, activityTools, religion);
        section = getSection_he(category, time, place);
        safty = getSafty_he(category, contest);
        promptOptions = getPromptOptions_he(category);
        prompt = promptPerGrade_he(grade, promptOptions);
    } else {
        moreInfo = getMoreInfo_en(info);
        tools = getTools_en(category, activityTools, religion);
        section = getSection_en(category, time, place);
        safty = getSafty_en(category, contest);
        promptOptions = getPromptOptions_en(category);
        prompt = promptPerGrade_en(grade, promptOptions);
    }

    const details = [time, subject, amount, grade, gender, place, moreInfo, tools, section, safty];
    return [prompt, details];
};

export async function getMainActivity(data: GetActivityRequest): Promise<string> {
    const { lang, ...restData } = data;
    const activityDetails = restData as ActivityDetails;
    const [prompt, details] = getPromptAndDetails(activityDetails, lang);
    const result = formatString(prompt, details);
    return await generateContent(result);
}
