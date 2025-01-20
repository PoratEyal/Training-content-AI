import { GoogleGenerativeAI } from "@google/generative-ai";
import { ActivityDetails } from "../model/types/activity";
import { defineString } from "firebase-functions/params";
import { formatString } from "../utils/format";
import { getBehavior, getMoreInfo, getPromptOptions, getSafty, getSection, getTools, promptPerGrade } from "../utils/prompt";

const genAI = new GoogleGenerativeAI(defineString("API_KEY").value() || "");

async function generateContent(prompt: string): Promise<string> {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    return text;
}

const getPromptAndDetails = (activityDetials: ActivityDetails): [string, string[]] => {
    const { category, grade, time, subject, amount, gender, place } = activityDetials;
    const { behavior: activityBehavior, touch, contest, tools: activityTools, info } = activityDetials;

    const behavior = getBehavior(activityBehavior);
    const moreInfo = getMoreInfo(info);
    const tools = getTools(category, activityTools);
    const section = getSection(category, time, place);
    const safty = getSafty(category, contest, touch);
    const promptOptions = getPromptOptions(category);
    const prompt = promptPerGrade(grade, promptOptions);
    const details = [
        time,
        subject,
        amount,
        grade,
        gender,
        place,
        behavior,
        moreInfo,
        tools,
        section,
        safty,
    ];
    return [prompt, details];
};

export async function getMainActivity(activityDetials: ActivityDetails): Promise<string> {
    const [prompt, details] = getPromptAndDetails(activityDetials);
    const result = formatString(prompt, details);
    return await generateContent(result);
}
