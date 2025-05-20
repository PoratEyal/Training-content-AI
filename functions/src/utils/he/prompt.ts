import { CONTANT_PROMPT_B } from "../../model/prompts/he/contant_B";
import { CONTANT_PROMPT_M } from "../../model/prompts/he/contant_M";
import { CONTANT_PROMPT_S } from "../../model/prompts/he/contant_S";
import { PLAY_PROMPT_M } from "../../model/prompts/he/playTime_M";
import { PLAY_PROMPT_S } from "../../model/prompts/he/playTime_S";
import { VIEW_PROMPT_M } from "../../model/prompts/he/pointOfView_M";
import { VIEW_PROMPT_S } from "../../model/prompts/he/pointOfView_S";
import { CONTANT_SPECIAL_PROMPT_M } from "../../model/prompts/he/contant_special_M";
import { CONTANT_SPECIAL_PROMPT_S } from "../../model/prompts/he/contant_special_S";
import { PLAY_SPECIAL_PROMPT_M } from "../../model/prompts/he/playTime_special_M";
import { PLAY_SPECIAL_PROMPT_S } from "../../model/prompts/he/playTime_special_S";
import {
    CONTANT_SECTION_120_IN,
    CONTANT_SECTION_120_OUT,
    CONTANT_SECTION_20_IN,
    CONTANT_SECTION_20_OUT,
    CONTANT_SECTION_30_IN,
    CONTANT_SECTION_30_OUT,
    CONTANT_SECTION_45_IN,
    CONTANT_SECTION_45_OUT,
    CONTANT_SECTION_60_IN,
    CONTANT_SECTION_60_OUT,
    CONTANT_SECTION_90_IN,
    CONTANT_SECTION_90_OUT,
    PLAY_SECTION,
    POINT_SECTION_120,
    POINT_SECTION_20,
    POINT_SECTION_30,
    POINT_SECTION_45,
    POINT_SECTION_60,
    POINT_SECTION_90,
    SURVIVAL_SECTION_120,
    SURVIVAL_SECTION_20,
    SURVIVAL_SECTION_30,
    SURVIVAL_SECTION_45,
    SURVIVAL_SECTION_60,
    SURVIVAL_SECTION_90,
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

const sectionPerPlace = (place: string): string[] => {
    switch (place) {
        case "במקום פתוח":
            return [
                CONTANT_SECTION_20_OUT,
                CONTANT_SECTION_30_OUT,
                CONTANT_SECTION_45_OUT,
                CONTANT_SECTION_60_OUT,
                CONTANT_SECTION_90_OUT,
                CONTANT_SECTION_120_OUT,
            ];

        default:
            return [
                CONTANT_SECTION_20_IN,
                CONTANT_SECTION_30_IN,
                CONTANT_SECTION_45_IN,
                CONTANT_SECTION_60_IN,
                CONTANT_SECTION_90_IN,
                CONTANT_SECTION_120_IN,
            ];
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
const setOptionsForContant = (): [string, string, string] => [
    CONTANT_PROMPT_S,
    CONTANT_PROMPT_M,
    CONTANT_PROMPT_B,
];

const setOptionsForSpecialKidsContant = (): [string, string, string] => [
    CONTANT_SPECIAL_PROMPT_S,
    CONTANT_SPECIAL_PROMPT_M,
    CONTANT_SPECIAL_PROMPT_M,
];

const setOptionsForSpecialKidsPlay = (): [string, string, string] => [
    PLAY_SPECIAL_PROMPT_S,
    PLAY_SPECIAL_PROMPT_M,
    PLAY_SPECIAL_PROMPT_M,
];

const setSectionForPointOfView = (time: string): string =>
    sectionPerTime(time, [
        POINT_SECTION_20,
        POINT_SECTION_30,
        POINT_SECTION_45,
        POINT_SECTION_60,
        POINT_SECTION_90,
        POINT_SECTION_120,
    ]);
const setSectionForSurvival = (time: string): string =>
    sectionPerTime(time, [
        SURVIVAL_SECTION_20,
        SURVIVAL_SECTION_30,
        SURVIVAL_SECTION_45,
        SURVIVAL_SECTION_60,
        SURVIVAL_SECTION_90,
        SURVIVAL_SECTION_120,
    ]);

const setSectionForPlayTime = (time: string): string =>
    sectionPerTime(time, [PLAY_SECTION, PLAY_SECTION, PLAY_SECTION, PLAY_SECTION, PLAY_SECTION]);

const setSectionForContant = (time: string, place: string): string =>
    sectionPerTime(time, sectionPerPlace(place));

/**
 * Returns a prompt based on the grade.
 * Grade split into three sections.
 * 1. small - S
 * 2. medium - M
 * 3. big - B
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
        case "contant":
            return setOptionsForContant();
        default:
            return ["", "", ""];
    }
};

export const getSpecialPromptOptions = (category: CategoryName): [string, string, string] => {
    switch (category) {
        case "contant":
            return setOptionsForSpecialKidsContant();
        case "playTime":
            return setOptionsForSpecialKidsPlay();
        default:
            return ["", "", ""];
    }
};

export const getSection = (category: CategoryName, time: string, place: string ): string => {
    switch (category) {
        case "pointOfView":
            return setSectionForPointOfView(time);
        case "survival":
            return setSectionForSurvival(time);
        case "playTime":
            return setSectionForPlayTime(time);
        case "contant":
            return setSectionForContant(time, place);
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
            case "contant":
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
    if(category === "pointOfView") return "";
    let safty: string = "- הפעולה חייבת להיות: ללא אלימות, ללא סיכונים";
    // if (touch === "לא") safty = safty + "אסור מגע בין הילדים! ";
    if (contest === "ללא חלוקה לקבוצות") safty = safty + ", ללא תחרויות וללא חלוקה לקבוצות.";
    return safty;
};



// export const getBehavior = (behavior: string | undefined): string => {
//     switch (behavior) {
//         case "רגוע":
//             return "אופי הקבוצה: רגוע";
//         case "רועש":
//             return "אופי הקבוצה: רועש";
//         case "שקט":
//             return "אופי הקבוצה: שקט";
//         case "מתפזר":
//             return "אופי הקבוצה: מתפזר";
//         default:
//             return "";
//     }
// };

// -------------------------------------------------------- //

// const setPromptForPointOfView = (time: string): [[string, string, string], string] => {
//     let promptOptions: [string, string, string] = ["", "", ""];
//     let section: string = "";

//     promptOptions = [VIEW_PROMPT_S, VIEW_PROMPT_M, VIEW_PROMPT_M];
//     section = sectionPerTime(time, [
//         POINT_SECTION_20,
//         POINT_SECTION_30,
//         POINT_SECTION_45,
//         POINT_SECTION_60,
//         POINT_SECTION_90,
//         POINT_SECTION_120,
//     ]);

//     return [promptOptions, section];
// };

// const setPromptForSurvival = (time: string): [[string, string, string], string] => {
//     let promptOptions: [string, string, string] = ["", "", ""];
//     let section: string = "";

//     promptOptions = [SURVIVAL_PROMPT_S, SURVIVAL_PROMPT_M, SURVIVAL_PROMPT_M];
//     section = sectionPerTime(time, [
//         SURVIVAL_SECTION_20,
//         SURVIVAL_SECTION_30,
//         SURVIVAL_SECTION_45,
//         SURVIVAL_SECTION_60,
//         SURVIVAL_SECTION_90,
//         SURVIVAL_SECTION_120,
//     ]);

//     return [promptOptions, section];
// };

// const setPromptForPlayTime = (time: string): [[string, string, string], string] => {
//     let promptOptions: [string, string, string] = ["", "", ""];
//     let section: string = "";

//     promptOptions = [PLAY_PROMPT_S, PLAY_PROMPT_M, PLAY_PROMPT_M];
//     section = sectionPerTime(time, [
//         PLAY_SECTION,
//         PLAY_SECTION,
//         PLAY_SECTION,
//         PLAY_SECTION,
//         PLAY_SECTION,
//         PLAY_SECTION,
//     ]);

//     return [promptOptions, section];
// };

// const setPromptForContant = (time: string, place: string): [[string, string, string], string] => {
//     let promptOptions: [string, string, string] = ["", "", ""];
//     let section: string = "";

//     promptOptions = [CONTANT_PROMPT_S, CONTANT_PROMPT_M, CONTANT_PROMPT_B];
//     section = sectionPerTime(
//         time,
//         place === "במקום פתוח"
//             ? [
//                   CONTANT_SECTION_20_OUT,
//                   CONTANT_SECTION_30_OUT,
//                   CONTANT_SECTION_45_OUT,
//                   CONTANT_SECTION_60_OUT,
//                   CONTANT_SECTION_90_OUT,
//                   CONTANT_SECTION_120_OUT,
//               ]
//             : [
//                   CONTANT_SECTION_20_IN,
//                   CONTANT_SECTION_30_IN,
//                   CONTANT_SECTION_45_IN,
//                   CONTANT_SECTION_60_IN,
//                   CONTANT_SECTION_90_IN,
//                   CONTANT_SECTION_120_IN,
//               ],
//     );

//     return [promptOptions, section];
// };

// export const promptOptionsAndSectionPerCategory = (
//     activityDetials: ActivityDetails,
// ): [[string, string, string], string] => {
//     const { category, time, place } = activityDetials;

//     switch (category) {
//         case "pointOfView":
//             return setPromptForPointOfView(time);
//         case "survival":
//             return setPromptForSurvival(time);
//         case "playTime":
//             return setPromptForPlayTime(time);
//         case "contant":
//             return setPromptForContant(time, place);
//         default:
//             return [["", "", ""], ""];
//     }
// };

// const setBehavior = (behavior: string | undefined) => {
//     switch (behavior) {
//         case "רגוע":
//             return "אופי הקבוצה: רגוע";
//         case "רועש":
//             return "אופי הקבוצה: רועש";
//         case "שקט":
//             return "אופי הקבוצה: שקט";
//         case "מתפזר":
//             return "אופי הקבוצה: מתפזר";
//         default:
//             return "";
//     }
// };

// const setInfo = (info: string | undefined) => {
//     if (!info || info === "") {
//         return "אין הערות נוספות";
//     }
//     return info;
// };

// const setTouchAndContest = (touch: string | undefined, contest: string | undefined) => {
//     let hasTouch: string = "";
//     let hasContest: string = "";
//     switch (touch) {
//         case "לא":
//             hasTouch = "אסור מגע בין הילדים!";
//             break;
//         case "כן":
//             hasTouch = "";
//         default: // לא משנה
//             hasTouch = "";
//             break;
//     }

//     switch (contest) {
//         case "לא":
//             hasContest = "אסור תחרות או קבוצות!";
//             break;
//         case "כן":
//             hasContest = "";
//         default: // לא משנה
//             hasContest = "";
//             break;
//     }

//     return hasTouch + hasContest;
// };

// export const setActivityMoreOptions = (activityDetials: ActivityDetails) => {
//     const { behavior, touch, contest, info } = activityDetials;
//     return [setBehavior(behavior), setInfo(info), setTouchAndContest(touch, contest)];
// };
