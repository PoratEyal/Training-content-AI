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

import {
  getMoreInfo as getMoreInfo_fr, getPromptOptions as getPromptOptions_fr, getSafty as getSafty_fr,
  getSection as getSection_fr, getTools as getTools_fr, promptPerGrade as promptPerGrade_fr,
} from "../../utils/fr/prompt";

import {
  getMoreInfo as getMoreInfo_pt, getPromptOptions as getPromptOptions_pt, getSafty as getSafty_pt,
  getSection as getSection_pt, getTools as getTools_pt, promptPerGrade as promptPerGrade_pt,
} from "../../utils/pt/prompt";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { ActivityDetails } from "../../model/types/activity";
import { formatString } from "../../utils/format";
//import { getPromptAndDetailsForSpecialKids } from "../../utils/specialKids";
import { GetActivityRequest } from "../../model/types/request";
import { Lang } from "../../model/types/common";
import { getPromptAndDetailsForAkiva } from "../../utils/akiva";
import * as functions from "firebase-functions";

const geminiConfig = functions.config()?.gemini;
const apiKey = geminiConfig?.apikey || process.env.API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

// Allow only specific models for security reasons
const ALLOWED_MODELS = new Set([
  "gemini-2.5-flash-lite"
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

async function generateContent(prompt: string, retries = 3, delayMs = 1500): Promise<string> {
  const requestedModel = "gemini-2.5-flash-lite";
  assertAllowedModel(requestedModel);
  assertNotImageModel(requestedModel);
  const generationConfig = { maxOutputTokens: 900 };
  const model = genAI.getGenerativeModel({ model: requestedModel, generationConfig });

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      return text;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      const isTransient =
        errorMsg.includes("500") ||
        errorMsg.includes("503") ||
        errorMsg.includes("504") ||
        errorMsg.includes("429") ||
        errorMsg.toLowerCase().includes("internal error") ||
        errorMsg.toLowerCase().includes("service unavailable") ||
        errorMsg.toLowerCase().includes("overloaded") ||
        errorMsg.toLowerCase().includes("resource exhausted");
      if (isTransient && attempt < retries) {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
        delayMs *= 2;
      } else {
        throw error;
      }
    }
  }
  throw new Error("Failed to generate content after retries");
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
  fr: {
    getMoreInfo: getMoreInfo_fr,
    getTools: getTools_fr,
    getSection: getSection_fr,
    getSafty: getSafty_fr,
    getPromptOptions: getPromptOptions_fr,
    promptPerGrade: promptPerGrade_fr,
  },
  pt: {
    getMoreInfo: getMoreInfo_pt,
    getTools: getTools_pt,
    getSection: getSection_pt,
    getSafty: getSafty_pt,
    getPromptOptions: getPromptOptions_pt,
    promptPerGrade: promptPerGrade_pt,
  },
};

const buildPrompt = (activityDetails: ActivityDetails, lang: Lang): [string, string[]] => {
  if (activityDetails.movement === "akiva")
    return getPromptAndDetailsForAkiva(activityDetails, lang);

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
  const aiResponse = await generateContent(result);

  const disclaimers: Record<string, string> = {
    he: "\n\n---\n**שימו לב: התוכן מבוסס בינה מלאכותית והוא בגדר הצעה בלבד – עברו על הפעולה, התאימו אותה לצרכים שלכם והבטיחו שהיא בטוחה ומתאימה לשטח.**",
    en: "\n\n---\n**Please note: The content is AI-based and is a suggestion only – review the activity and adapt it to your group's needs in the field.**",
    es: "\n\n---\n**Atención: El contenido se basa en inteligencia artificial y es solo una sugerencia – revise la actividad y adáptela a las necesidades de su grupo en el terreno.**",
    ar: "\n\n---\n**يرجى الملاحظة: المحتوى يعتمد على الذكاء الاصطناعي وهو مجرد اقتراح – راجع النشاط وقم بملاءمته لاحتياجات مجموعتك في الميدان.**",
    fr: "\n\n---\n**Veuillez noter: Le contenu est basé sur l'IA et n'est qu'une suggestion – révisez l'activité et adaptez-la aux besoins de votre groupe sur le terrain.**",
    pt: "\n\n---\n**Atenção: O conteúdo é baseado em Inteligência Artificial e serve apenas como sugestão – revise a atividade e adapte-a às necessidades do seu grupo em campo.**",
  };

  const disclaimer = disclaimers[lang] || disclaimers["en"];
  return aiResponse + disclaimer;
}
