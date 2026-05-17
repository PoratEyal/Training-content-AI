import { CONTENT_PROMPT_M } from "../../model/prompts/fr/content_M";
import { CONTENT_PROMPT_S } from "../../model/prompts/fr/content_S";
import { PLAY_PROMPT_M } from "../../model/prompts/fr/playTime_M";
import { PLAY_PROMPT_S } from "../../model/prompts/fr/playTime_S";
import { VIEW_PROMPT_M } from "../../model/prompts/fr/pointOfView_M";
import { VIEW_PROMPT_S } from "../../model/prompts/fr/pointOfView_S";
import { CONTENT_SPECIAL_PROMPT_M } from "../../model/prompts/fr/content_special_M";
import { CONTENT_SPECIAL_PROMPT_S } from "../../model/prompts/fr/content_special_S";
import { PLAY_SPECIAL_PROMPT_M } from "../../model/prompts/fr/playTime_special_M";
import { PLAY_SPECIAL_PROMPT_S } from "../../model/prompts/fr/playTime_special_S";
import {
    CONTENT_SECTION_30, CONTENT_SECTION_60, CONTENT_SECTION_90,
    PLAY_SECTION,
    POINT_SECTION_30, POINT_SECTION_60, POINT_SECTION_90,
    SURVIVAL_SECTION_30, SURVIVAL_SECTION_60, SURVIVAL_SECTION_90,
} from "../../model/prompts/fr/sections";
import { SURVIVAL_PROMPT_M } from "../../model/prompts/fr/survival_M";
import { SURVIVAL_PROMPT_S } from "../../model/prompts/fr/survival_S";
import { CategoryName } from "../../model/types/movement";

/**
 * Returns activity parts based on the time given.
 */
const sectionPerTime = (time: string, section: string[]): string => {
    switch (time) {
        case "30 minutes":
            return section[0];
        case "1 heure":
            return section[1];
        case "1h30":
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
        case "1ère année":
        case "2ème année":
        case "3ème année":
        case "4ème année":
            return prompts[0];
        case "5ème année":
        case "6ème année":
        case "7ème année":
        case "8ème année":
            return prompts[1];
        case "9ème année":
        case "10ème année":
        case "11ème année":
        case "12ème année":
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
    if (!info || info === "") return "Aucune information supplémentaire";
    return info;
};

export const getTools = (category: CategoryName, tools: string | undefined, religion: string | undefined): string => {
    if (tools === "sans matériel") return "**Matériel nécessaire:** N'utilisez pas de matériel!";
    else {
        switch (category) {
            case "pointOfView":
                return "**Matériel nécessaire:** (S'il y en a, n'utilisez pas de matériel coûteux, de projecteur, de vidéo)";
            case "survival":
                return "**Matériel nécessaire:** (S'il y en a, n'utilisez pas de matériel coûteux, de projecteur, de vidéo - pour votre usage, matériaux de construction, matériaux de sol, outils de travail)";
            case "playTime":
                return "**Matériel nécessaire:** (S'il y en a, n'utilisez pas de matériel coûteux, de projecteur, de vidéo)";
            case "content":
                return "**Matériel nécessaire:** (S'il y en a, n'utilisez pas de matériel coûteux, de projecteur, de vidéo)";
            default:
                return "**Matériel nécessaire:** N'utilisez pas de matériel!";
        }
    }
};

export const getSafty = (
    category: CategoryName,
    contest: string | undefined,
) => {
    if (category === "pointOfView") return "";
    let safety: string = "- L'activité doit être : sans violence, sans danger";
    if (contest === "sans groupes") safety += ", sans compétitions et sans division en groupes.";
    return safety;
};
