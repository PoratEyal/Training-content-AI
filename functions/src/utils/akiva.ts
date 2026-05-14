import { ActivityDetails } from "../model/types/activity";
import { Lang } from "../model/types/common";
import { getMoreInfo as getMoreInfo_he, getSafty as getSafty_he, getSection as getSection_he, getTools as getTools_he, promptPerGrade as promptPerGrade_he, } from "./he/prompt";
import { AKIVA_CONTENT_PROMPT_M } from "../model/prompts/he/akiva_content_M";
import { AKIVA_CONTENT_PROMPT_S } from "../model/prompts/he/akiva_content_S";

/**
 * Bnei Akiva requires a specialized prompt to ensure activities align with "Torah and Work" values,
 * maintain a religious lifestyle (e.g., gender separation, Sabbath-appropriate content), 
 * and include relevant Torah-based objectives and sources.
 */
export const getPromptAndDetailsForAkiva = (
    activityDetails: ActivityDetails,
    lang: Lang,
): [string, string[]] => {
    const { category, grade, time, subject, amount, gender, place } = activityDetails;
    const { religion, contest, tools: activityTools, info } = activityDetails;

    if (lang !== "he") {
        // For other languages, we currently don't have Akiva-specific prompts
        // We can fall back to the default or handle them if needed later.
        return ["", []];
    }

    const moreInfo = getMoreInfo_he(info);
    const tools = getTools_he(category, activityTools, religion);
    const section = getSection_he(category, time);
    const safety = getSafty_he(category, contest);

    // Define prompt options for Akiva
    // For now we only have specialized 'content' prompts. 
    // For other categories, we might use default or adapt them.
    let promptOptions: [string, string, string];
    if (category === "content") {
        promptOptions = [
            AKIVA_CONTENT_PROMPT_S,
            AKIVA_CONTENT_PROMPT_M,
            AKIVA_CONTENT_PROMPT_M,
        ];
    } else {
        // Fallback to defaults from he/prompt.ts if needed, 
        // but let's assume we want specialized Akiva prompts for the main categories.
        // For now, let's just use the content ones as a base or define more.
        promptOptions = [
            AKIVA_CONTENT_PROMPT_S,
            AKIVA_CONTENT_PROMPT_M,
            AKIVA_CONTENT_PROMPT_M,
        ];
    }

    const prompt = promptPerGrade_he(grade, promptOptions);
    const details = [time, subject, amount, grade, gender, place, moreInfo, tools, section, safety];

    return [prompt, details];
};
