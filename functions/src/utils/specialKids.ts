import { ActivityDetails } from "../model/types/activity";
import { Lang } from "../model/types/common";
import {
    getMoreInfo as getMoreInfo_he,
    getSpecialPromptOptions as getSpecialPromptOptions_he,
    getSafty as getSafty_he,
    getSection as getSection_he,
    getTools as getTools_he,
    promptPerGrade as promptPerGrade_he,
} from "./he/prompt";
import {
    getMoreInfo as getMoreInfo_en,
    getSpecialPromptOptions as getSpecialPromptOptions_en,
    getSafty as getSafty_en,
    getSection as getSection_en,
    getTools as getTools_en,
    promptPerGrade as promptPerGrade_en,
} from "./en/prompt";

export const getPromptAndDetailsForSpecialKids = (
    activityDetials: ActivityDetails,
    lang: Lang,
): [string, string[]] => {
    const { category, grade, time, subject, amount, gender, place } = activityDetials;
    const { religion, contest, tools: activityTools, info } = activityDetials;

    let moreInfo, tools, section, safty, promptOptions, prompt;
    if (lang === "he") {
        moreInfo = getMoreInfo_he(info);
        tools = getTools_he(category, activityTools, religion);
        section = getSection_he(category, time, place);
        safty = getSafty_he(category, contest);
        promptOptions = getSpecialPromptOptions_he(category);
        prompt = promptPerGrade_he(grade, promptOptions);
    } else {
        moreInfo = getMoreInfo_en(info);
        tools = getTools_en(category, activityTools, religion);
        section = getSection_en(category, time, place);
        safty = getSafty_en(category, contest);
        promptOptions = getSpecialPromptOptions_en(category);
        prompt = promptPerGrade_en(grade, promptOptions);
    }

    const details = [time, subject, amount, grade, gender, place, moreInfo, tools, section, safty];
    return [prompt, details];
};

//רמה קוגנטיבית: גבוהה בינונית נמוכה
//התייחסות למוגבלות: פיזית קוגנטיבית תקשורתית חושית
//
