import { ActivityDetails } from "../model/types/activity";
import {
    getMoreInfo,
    getSpecialPromptOptions,
    getSafty,
    getSection,
    getTools,
    promptPerGrade,
} from "./prompt";

export const getPromptAndDetailsForSpecialKids = (
    activityDetials: ActivityDetails,
): [string, string[]] => {
    const { category, grade, time, subject, amount, gender, place } = activityDetials;
    const { religion, contest, tools: activityTools, info } = activityDetials;

    const moreInfo = getMoreInfo(info);
    const tools = getTools(category, activityTools, religion);
    const section = getSection(category, time, place);
    const safty = getSafty(category, contest);
    const promptOptions = getSpecialPromptOptions(category);
    const prompt = promptPerGrade(grade, promptOptions);
    const details = [time, subject, amount, grade, gender, place, moreInfo, tools, section, safty];
    return [prompt, details];
};

//רמה קוגנטיבית: גבוהה בינונית נמוכה
//התייחסות למוגבלות: פיזית קוגנטיבית תקשורתית חושית
//