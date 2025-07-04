import { CONTANT_PROMPT_B } from "../../model/prompts/es/contant_B";
import { CONTANT_PROMPT_M } from "../../model/prompts/es/contant_M";
import { CONTANT_PROMPT_S } from "../../model/prompts/es/contant_S";
import { PLAY_PROMPT_M } from "../../model/prompts/es/playTime_M";
import { PLAY_PROMPT_S } from "../../model/prompts/es/playTime_S";
import { VIEW_PROMPT_M } from "../../model/prompts/es/pointOfView_M";
import { VIEW_PROMPT_S } from "../../model/prompts/es/pointOfView_S";
import { CONTANT_SPECIAL_PROMPT_M } from "../../model/prompts/es/contant_special_M";
import { CONTANT_SPECIAL_PROMPT_S } from "../../model/prompts/es/contant_special_S";
import { PLAY_SPECIAL_PROMPT_M } from "../../model/prompts/es/playTime_special_M";
import { PLAY_SPECIAL_PROMPT_S } from "../../model/prompts/es/playTime_special_S";
import {
    CONTANT_SECTION_30_IN,
    CONTANT_SECTION_30_OUT,
    CONTANT_SECTION_60_IN,
    CONTANT_SECTION_60_OUT,
    CONTANT_SECTION_90_IN,
    CONTANT_SECTION_90_OUT,
    PLAY_SECTION,
    POINT_SECTION_30,
    POINT_SECTION_60,
    POINT_SECTION_90,
    SURVIVAL_SECTION_30,
    SURVIVAL_SECTION_60,
    SURVIVAL_SECTION_90,
} from "../../model/prompts/es/sections";
import { SURVIVAL_PROMPT_M } from "../../model/prompts/es/survival_M";
import { SURVIVAL_PROMPT_S } from "../../model/prompts/es/survival_S";
import { CategoryName } from "../../model/types/movement";

/**
 * Returns activity parts based on the time given.
 */
const sectionPerTime = (time: string, section: string[]): string => {
    switch (time) {
        case "media hora":
            return section[0];
        case "hora":
            return section[1];
        case "hora y media":
            return section[2];
        default:
            return "";
    }
};

const sectionPerPlace = (place: string): string[] => {
    switch (place) {
        case "exterior":
            return [
                CONTANT_SECTION_30_OUT,
                CONTANT_SECTION_60_OUT,
                CONTANT_SECTION_90_OUT,
            ];

        default:
            return [
                CONTANT_SECTION_30_IN,
                CONTANT_SECTION_60_IN,
                CONTANT_SECTION_90_IN,
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
        POINT_SECTION_30,
        POINT_SECTION_60,
        POINT_SECTION_90,
    ]);
const setSectionForSurvival = (time: string): string =>
    sectionPerTime(time, [
        SURVIVAL_SECTION_30,
        SURVIVAL_SECTION_60,
        SURVIVAL_SECTION_90,
    ]);

const setSectionForPlayTime = (time: string): string =>
    sectionPerTime(time, [PLAY_SECTION, PLAY_SECTION, PLAY_SECTION, PLAY_SECTION, PLAY_SECTION]);

const setSectionForContant = (time: string, place: string): string =>
    sectionPerTime(time, sectionPerPlace(place));

export const promptPerGrade = (grade: string, prompts: [string, string, string]): string => {
    switch (grade) {
        case "grado 1":
        case "grado 2":
        case "grado 3":
        case "grado 4":
            return prompts[0];
        case "grado 5":
        case "grado 6":
        case "grado 7":
        case "grado 8":
            return prompts[1];
        case "grado 9":
        case "grado 10":
        case "grado 11":
        case "grado 12":
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

export const getSection = (category: CategoryName, time: string, place: string): string => {
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
    if (!info || info === "") return "Sin información adicional";
    return info;
};

export const getTools = (category: CategoryName, tools: string | undefined, religion: string | undefined): string => {
    if (tools === "without tools") return "**Materiales necesarios:** ¡No usar materiales!";
    else {
        switch (category) {
            case "pointOfView":
                return "**Materiales necesarios:** (Si hay, no usar materiales costosos, proyector, video)";
            case "survival":
                return "**Materiales necesarios:** (Si hay, no usar materiales costosos, proyector, video - para tu uso, materiales de construcción, materiales de suelo, herramientas de trabajo)";
            case "playTime":
                return "**Materiales necesarios:** (Si hay, no usar materiales costosos, proyector, video)";
            case "contant":
                return "**Materiales necesarios:** (Si hay, no usar materiales costosos, proyector, video)";
            default:
                return "**Materiales necesarios:** ¡No usar materiales!";
        }
    }
};

export const getSafty = (
    category: CategoryName,
    contest: string | undefined,
) => {
    if (category === "pointOfView") return "";
    let safty: string = "- La actividad debe ser: sin violencia, sin peligro";
    if (contest === "sin grupos") safty += ", sin competencias y sin dividir grupos.";
    return safty;
};
