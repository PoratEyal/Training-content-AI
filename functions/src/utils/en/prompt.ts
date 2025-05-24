import { CONTANT_PROMPT_B } from "../../model/prompts/en/contant_B";
import { CONTANT_PROMPT_M } from "../../model/prompts/en/contant_M";
import { CONTANT_PROMPT_S } from "../../model/prompts/en/contant_S";
import { PLAY_PROMPT_M } from "../../model/prompts/en/playTime_M";
import { PLAY_PROMPT_S } from "../../model/prompts/en/playTime_S";
import { VIEW_PROMPT_M } from "../../model/prompts/en/pointOfView_M";
import { VIEW_PROMPT_S } from "../../model/prompts/en/pointOfView_S";
import { CONTANT_SPECIAL_PROMPT_M } from "../../model/prompts/en/contant_special_M";
import { CONTANT_SPECIAL_PROMPT_S } from "../../model/prompts/en/contant_special_S";
import { PLAY_SPECIAL_PROMPT_M } from "../../model/prompts/en/playTime_special_M";
import { PLAY_SPECIAL_PROMPT_S } from "../../model/prompts/en/playTime_special_S";
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
        case "20 minutes":
            return section[0];
        case "half hour":
            return section[1];
        case "45 minutes":
            return section[2];
        case "hour":
            return section[3];
        case "hour and a half":
            return section[4];
        case "two hours":
            return section[5];
        default:
            return "";
    }
};

const sectionPerPlace = (place: string): string[] => {
    switch (place) {
        case "outdoor":
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
            case "contant":
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
    if(category === "pointOfView") return "";
    let safty: string = "- The activity must be: without violence, without danger";
    if (contest === "without groups") safty = safty + ", without competitions and without group division.";
    return safty;
};
