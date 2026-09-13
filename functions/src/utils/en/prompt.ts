import { CONTENT_PROMPT_M } from "../../model/prompts/en/content_M";
import { CONTENT_PROMPT_S } from "../../model/prompts/en/content_S";
import { PLAY_PROMPT_M } from "../../model/prompts/en/playTime_M";
import { PLAY_PROMPT_S } from "../../model/prompts/en/playTime_S";
import { VIEW_PROMPT_M } from "../../model/prompts/en/pointOfView_M";
import { VIEW_PROMPT_S } from "../../model/prompts/en/pointOfView_S";
import { CONTENT_SPECIAL_PROMPT_M } from "../../model/prompts/en/content_special_M";
import { CONTENT_SPECIAL_PROMPT_S } from "../../model/prompts/en/content_special_S";
import { PLAY_SPECIAL_PROMPT_M } from "../../model/prompts/en/playTime_special_M";
import { PLAY_SPECIAL_PROMPT_S } from "../../model/prompts/en/playTime_special_S";
import {
    CONTENT_SECTION_30, CONTENT_SECTION_60, CONTENT_SECTION_90,
    PLAY_SECTION,
    POINT_SECTION_30, POINT_SECTION_60, POINT_SECTION_90,
    SURVIVAL_SECTION_30, SURVIVAL_SECTION_60, SURVIVAL_SECTION_90,
} from "../../model/prompts/en/sections";
import { SURVIVAL_PROMPT_M } from "../../model/prompts/en/survival_M";
import { SURVIVAL_PROMPT_S } from "../../model/prompts/en/survival_S";
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
        case "half hour":
            return section[0];
        case "hour":
            return section[1];
        case "hour and a half":
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
        case "grade 1":
        case "grade 2":
        case "grade 3":
        case "grade 4":
            return prompts[0];
        case "grade 5":
        case "grade 6":
        case "grade 7":
        case "grade 8":
            return prompts[1];
        case "grade 9":
        case "grade 10":
        case "grade 11":
        case "grade 12":
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
    if (!info || info === "") return "No additional information";
    return info;
};

export const getTools = (category: CategoryName, tools: string | undefined, religion: string | undefined): string => {
    if (tools === "without tools") return "**Materials Needed:** Do not use materials!";
    else {
        switch (category) {
            case "pointOfView":
                return "**Materials Needed:** (If there is, do not use expensive materials, projector, video)";
            case "survival":
                return "**Materials Needed:** (If there is, do not use expensive materials, projector, video - for your use, construction materials, floor materials, work tools)";
            case "playTime":
                return "**Materials Needed:** (If there is, do not use expensive materials, projector, video)";
            case "content":
                return "**Materials Needed:** (If there is, do not use expensive materials, projector, video)";
            default:
                return "**Materials Needed:** Do not use materials!";
        }
    }
};

export const getSafty = (
    category: CategoryName,
    contest: string | undefined,
) => {
    if (category === "pointOfView") return "";
    let safety: string = "- The activity must be: without violence, without danger";
    if (contest === "without groups") safety = safety + ", without competitions and without group division.";
    return safety;
};
