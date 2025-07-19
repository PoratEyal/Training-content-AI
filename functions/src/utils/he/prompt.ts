import { CONTENT_PROMPT_M } from "../../model/prompts/he/content_M";
import { CONTENT_PROMPT_S } from "../../model/prompts/he/content_S";
import { PLAY_PROMPT_M } from "../../model/prompts/he/playTime_M";
import { PLAY_PROMPT_S } from "../../model/prompts/he/playTime_S";
import { VIEW_PROMPT_M } from "../../model/prompts/he/pointOfView_M";
import { VIEW_PROMPT_S } from "../../model/prompts/he/pointOfView_S";
import { CONTENT_SPECIAL_PROMPT_M } from "../../model/prompts/he/content_special_M";
import { CONTENT_SPECIAL_PROMPT_S } from "../../model/prompts/he/content_special_S";
import { PLAY_SPECIAL_PROMPT_M } from "../../model/prompts/he/playTime_special_M";
import { PLAY_SPECIAL_PROMPT_S } from "../../model/prompts/he/playTime_special_S";
import {
    CONTENT_SECTION_30, CONTENT_SECTION_60, CONTENT_SECTION_90,
    PLAY_SECTION,
    POINT_SECTION_30, POINT_SECTION_60, POINT_SECTION_90,
    SURVIVAL_SECTION_30, SURVIVAL_SECTION_60, SURVIVAL_SECTION_90,
} from "../../model/prompts/he/sections";
import { SURVIVAL_PROMPT_M } from "../../model/prompts/he/survival_M";
import { SURVIVAL_PROMPT_S } from "../../model/prompts/he/survival_S";
import { CategoryName } from "../../model/types/movement";

/**
 * Returns a activity parts based on the time given.
 * Each time return defferent activity parts. with defferent time length and amount of sections.
 * @param time - The time of the activity.
 * @param section - An array of activity parts, one for each time.
 * @returns The activity parts for the given time.
 */
const sectionPerTime = (time: string, section: string[]): string => {

    switch (time) {
        case "חצי שעה":
            return section[0];
        case "שעה":
            return section[1];
        case "שעה וחצי":
            return section[2];
        default:
            return "";
    }
};

const setOptionsForPointOfView = (): [string, string, string] => [
    VIEW_PROMPT_S,
    VIEW_PROMPT_M,
    VIEW_PROMPT_M,
];
const setOptionsForSurvival = (): [string, string, string] => [
    SURVIVAL_PROMPT_S,
    SURVIVAL_PROMPT_M,
    SURVIVAL_PROMPT_M,
];
const setOptionsForPlayTime = (): [string, string, string] => [
    PLAY_PROMPT_S,
    PLAY_PROMPT_M,
    PLAY_PROMPT_M,
];
const setOptionsForContent = (): [string, string, string] => [
    CONTENT_PROMPT_S,
    CONTENT_PROMPT_M,
    CONTENT_PROMPT_M,
];

const setOptionsForSpecialKidsContent = (): [string, string, string] => [
    CONTENT_SPECIAL_PROMPT_S,
    CONTENT_SPECIAL_PROMPT_M,
    CONTENT_SPECIAL_PROMPT_M,
];

const setOptionsForSpecialKidsPlay = (): [string, string, string] => [
    PLAY_SPECIAL_PROMPT_S,
    PLAY_SPECIAL_PROMPT_M,
    PLAY_SPECIAL_PROMPT_M,
];

const setSectionForPointOfView = (time: string): string =>
    sectionPerTime(time, [POINT_SECTION_30, POINT_SECTION_60, POINT_SECTION_90,]);

const setSectionForSurvival = (time: string): string =>
    sectionPerTime(time, [SURVIVAL_SECTION_30, SURVIVAL_SECTION_60, SURVIVAL_SECTION_90,]);

const setSectionForPlayTime = (time: string): string =>
    sectionPerTime(time, [PLAY_SECTION, PLAY_SECTION, PLAY_SECTION]);

const setSectionForContent = (time: string): string =>
    sectionPerTime(time, [CONTENT_SECTION_30, CONTENT_SECTION_60, CONTENT_SECTION_90]);

/**
 * Returns a prompt based on the grade.
 * Grade split into three sections.
 * @param grade - The grade of the kids.
 * @param prompts - An array of three prompts, one for each grade section.
 * @returns The prompt for the given grade section.
 */
export const promptPerGrade = (grade: string, prompts: [string, string, string]): string => {
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
};

export const getPromptOptions = (category: CategoryName): [string, string, string] => {
    switch (category) {
        case "pointOfView":
            return setOptionsForPointOfView();
        case "survival":
            return setOptionsForSurvival();
        case "playTime":
            return setOptionsForPlayTime();
        case "content":
            return setOptionsForContent();
        default:
            return ["", "", ""];
    }
};

export const getSpecialPromptOptions = (category: CategoryName): [string, string, string] => {
    switch (category) {
        case "content":
            return setOptionsForSpecialKidsContent();
        case "playTime":
            return setOptionsForSpecialKidsPlay();
        default:
            return ["", "", ""];
    }
};

export const getSection = (category: CategoryName, time: string): string => {
    switch (category) {
        case "pointOfView":
            return setSectionForPointOfView(time);
        case "survival":
            return setSectionForSurvival(time);
        case "playTime":
            return setSectionForPlayTime(time);
        case "content":
            return setSectionForContent(time);
        default:
            return "";
    }
};

export const getMoreInfo = (info: string | undefined): string => {
    if (!info || info === "") return "אין הערות נוספות";
    return info;
};

export const getTools = (category: CategoryName, tools: string | undefined, religion: string | undefined): string => {
    if (tools === "ללא ציוד") return "**ציוד נדרש:** אסור להשתמש בציוד!";
    else if (religion === "מותאם לשומרי שבת") return "**ציוד נדרש:** (אין להשתמש בחומרי גלם יקרים, מצגת, סרטון, טלפונים כלי עבודה או כלי נגינה)!";
    else {
        switch (category) {
            case "pointOfView":
                return "**ציוד נדרש:** (אם יש, אין להשתמש בחומרי גלם יקרים, מצגת או סרטון)";
            case "survival":
                return "**ציוד נדרש:** (אם יש, אין להשתמש בחומרי גלם יקרים, מצגת או סרטון - לרשותך ציוד בניה, ציוד שטח וכלי עבודה)";
            case "playTime":
                return "**ציוד נדרש:** (אם יש, אין להשתמש בחומרי גלם יקרים, מצגת או סרטון)";
            case "content":
                return "**ציוד נדרש:** (אם יש, אין להשתמש בחומרי גלם יקרים, מצגת או סרטון)";
            default:
                return "**ציוד נדרש:** אסור להשתמש בציוד!";
        }
    }
};

export const getSafty = (
    category: CategoryName,
    contest: string | undefined,
) => {
    if (category === "pointOfView") return "";
    let safety: string = "- הפעולה חייבת להיות: ללא אלימות, ללא סיכונים";
    if (contest === "ללא חלוקה לקבוצות") safety = safety + ", ללא תחרויות וללא חלוקה לקבוצות.";
    return safety;
};