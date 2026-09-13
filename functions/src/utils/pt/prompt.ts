import { CONTENT_PROMPT_M } from "../../model/prompts/pt/content_M";
import { CONTENT_PROMPT_S } from "../../model/prompts/pt/content_S";
import { PLAY_PROMPT_M } from "../../model/prompts/pt/playTime_M";
import { PLAY_PROMPT_S } from "../../model/prompts/pt/playTime_S";
import { VIEW_PROMPT_M } from "../../model/prompts/pt/pointOfView_M";
import { VIEW_PROMPT_S } from "../../model/prompts/pt/pointOfView_S";
import { CONTENT_SPECIAL_PROMPT_M } from "../../model/prompts/pt/content_special_M";
import { CONTENT_SPECIAL_PROMPT_S } from "../../model/prompts/pt/content_special_S";
import { PLAY_SPECIAL_PROMPT_M } from "../../model/prompts/pt/playTime_special_M";
import { PLAY_SPECIAL_PROMPT_S } from "../../model/prompts/pt/playTime_special_S";
import {
    CONTENT_SECTION_30, CONTENT_SECTION_60, CONTENT_SECTION_90,
    PLAY_SECTION,
    POINT_SECTION_30, POINT_SECTION_60, POINT_SECTION_90,
    SURVIVAL_SECTION_30, SURVIVAL_SECTION_60, SURVIVAL_SECTION_90,
} from "../../model/prompts/pt/sections";
import { SURVIVAL_PROMPT_M } from "../../model/prompts/pt/survival_M";
import { SURVIVAL_PROMPT_S } from "../../model/prompts/pt/survival_S";
import { CategoryName } from "../../model/types/movement";

/**
 * Returns activity parts based on the time given.
 */
const sectionPerTime = (time: string, section: string[]): string => {
    switch (time) {
        case "meia hora":
            return section[0];
        case "uma hora":
            return section[1];
        case "uma hora e meia":
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

export const promptPerGrade = (grade: string, prompts: [string, string, string]): string => {
    switch (grade) {
        case "1º ano":
        case "2º ano":
        case "3º ano":
        case "4º ano":
            return prompts[0];
        case "5º ano":
        case "6º ano":
        case "7º ano":
        case "8º ano":
            return prompts[1];
        case "9º ano":
        case "10º ano":
        case "11º ano":
        case "12º ano":
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
    if (!info || info === "") return "Nenhuma informação adicional";
    return info;
};

export const getTools = (category: CategoryName, tools: string | undefined, religion: string | undefined): string => {
    if (tools === "sem material") return "**Material necessário:** Não utilize materiais!";
    else {
        switch (category) {
            case "pointOfView":
                return "**Material necessário:** (Se houver, não utilize materiais caros, projetor, vídeo)";
            case "survival":
                return "**Material necessário:** (Se houver, não utilize materiais caros, projetor, vídeo - para seu uso, materiais de construção, materiais de piso, ferramentas de trabalho)";
            case "playTime":
                return "**Material necessário:** (Se houver, não utilize materiais caros, projetor, vídeo)";
            case "content":
                return "**Material necessário:** (Se houver, não utilize materiais caros, projetor, vídeo)";
            default:
                return "**Material necessário:** Não utilize materiais!";
        }
    }
};

export const getSafty = (
    category: CategoryName,
    contest: string | undefined,
) => {
    if (category === "pointOfView") return "";
    let safety: string = "- A atividade deve ser: sem violência, sem perigo";
    if (contest === "sem grupos") safety += ", sem competições e sem divisão em grupos.";
    return safety;
};
