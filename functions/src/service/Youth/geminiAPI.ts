import {
  getMoreInfo as getMoreInfo_he, getPromptOptions as getPromptOptions_he, getSafty as getSafty_he,
  getSection as getSection_he, getTools as getTools_he, promptPerGrade as promptPerGrade_he,
} from "../../utils/he/prompt";

import {
  getMoreInfo as getMoreInfo_en, getPromptOptions as getPromptOptions_en, getSafty as getSafty_en,
  getSection as getSection_en, getTools as getTools_en, promptPerGrade as promptPerGrade_en,
} from "../../utils/en/prompt";

import {
  getMoreInfo as getMoreInfo_es, getPromptOptions as getPromptOptions_es, getSafty as getSafty_es,
  getSection as getSection_es, getTools as getTools_es, promptPerGrade as promptPerGrade_es,
} from "../../utils/es/prompt";

import {
  getMoreInfo as getMoreInfo_ar, getPromptOptions as getPromptOptions_ar, getSafty as getSafty_ar,
  getSection as getSection_ar, getTools as getTools_ar, promptPerGrade as promptPerGrade_ar,
} from "../../utils/ar/prompt";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { ActivityDetails } from "../../model/types/activity";
import { formatString } from "../../utils/format";
//import { getPromptAndDetailsForSpecialKids } from "../../utils/specialKids";
import { GetActivityRequest } from "../../model/types/request";
import { Lang } from "../../model/types/common";
import * as functions from "firebase-functions";

const geminiConfig = functions.config()?.gemini;
const apiKey = geminiConfig?.apikey || process.env.API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

// Allow only specific models for security reasons
const ALLOWED_MODELS = new Set([
  "gemini-2.0-flash"
]);

function assertAllowedModel(model: string) {
  if (!ALLOWED_MODELS.has(model)) {
    throw new Error(`Model "${model}" is not allowed`);
  }
}

// Extra guard – block any image-capable models by name pattern
function assertNotImageModel(model: string) {
  if (/imagen|image-preview|image|photo|vision/i.test(model)) {
    throw new Error("Image generation models are blocked");
  }
}

async function generateContent(prompt: string): Promise<string> {
  const requestedModel = "gemini-2.0-flash";
  assertAllowedModel(requestedModel);
  assertNotImageModel(requestedModel);
  const generationConfig = { maxOutputTokens: 2000, };
  const model = genAI.getGenerativeModel({ model: requestedModel, generationConfig, });
  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  return text;
}

const promptUtils = {
  he: {
    getMoreInfo: getMoreInfo_he,
    getTools: getTools_he,
    getSection: getSection_he,
    getSafty: getSafty_he,
    getPromptOptions: getPromptOptions_he,
    promptPerGrade: promptPerGrade_he,
  },
  en: {
    getMoreInfo: getMoreInfo_en,
    getTools: getTools_en,
    getSection: getSection_en,
    getSafty: getSafty_en,
    getPromptOptions: getPromptOptions_en,
    promptPerGrade: promptPerGrade_en,
  },
  es: {
    getMoreInfo: getMoreInfo_es,
    getTools: getTools_es,
    getSection: getSection_es,
    getSafty: getSafty_es,
    getPromptOptions: getPromptOptions_es,
    promptPerGrade: promptPerGrade_es,
  },
  ar: {
    getMoreInfo: getMoreInfo_ar,
    getTools: getTools_ar,
    getSection: getSection_ar,
    getSafty: getSafty_ar,
    getPromptOptions: getPromptOptions_ar,
    promptPerGrade: promptPerGrade_ar,
  },
};

const buildPrompt = (activityDetails: ActivityDetails, lang: Lang): [string, string[]] => {
  //if (activityDetails.movement === "krembo")
  //  return getPromptAndDetailsForSpecialKids(activityDetails, lang);

  const {
    category,
    grade,
    time,
    subject,
    amount,
    gender,
    place,
    religion,
    contest,
    tools: activityTools,
    info,
  } = activityDetails;

  const utils = promptUtils[lang] || promptUtils["en"];

  const moreInfo = utils.getMoreInfo(info);
  const tools = utils.getTools(category, activityTools, religion);
  const section = utils.getSection(category, time);
  const safety = utils.getSafty(category, contest);
  const promptOptions = utils.getPromptOptions(category);
  const prompt = utils.promptPerGrade(grade, promptOptions);

  const details = [time, subject, String(amount), grade, gender, place, moreInfo, tools, section, safety];
  return [prompt, details];
};

export async function generateYouthActivityAI(data: GetActivityRequest): Promise<string> {
  const { lang, ...restData } = data;
  const activityDetails = restData as ActivityDetails;
  const [prompt, details] = buildPrompt(activityDetails, lang);
  const result = formatString(prompt, details);
  return await generateContent(result);
}
