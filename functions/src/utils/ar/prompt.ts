import { CONTANT_PROMPT_B } from "../../model/prompts/ar/contant_B";
import { CONTANT_PROMPT_M } from "../../model/prompts/ar/contant_M";
import { CONTANT_PROMPT_S } from "../../model/prompts/ar/contant_S";
import { PLAY_PROMPT_M } from "../../model/prompts/ar/playTime_M";
import { PLAY_PROMPT_S } from "../../model/prompts/ar/playTime_S";
import { VIEW_PROMPT_M } from "../../model/prompts/ar/pointOfView_M";
import { VIEW_PROMPT_S } from "../../model/prompts/ar/pointOfView_S";
import { CONTANT_SPECIAL_PROMPT_M } from "../../model/prompts/ar/contant_special_M";
import { CONTANT_SPECIAL_PROMPT_S } from "../../model/prompts/ar/contant_special_S";
import { PLAY_SPECIAL_PROMPT_M } from "../../model/prompts/ar/playTime_special_M";
import { PLAY_SPECIAL_PROMPT_S } from "../../model/prompts/ar/playTime_special_S";
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
} from "../../model/prompts/ar/sections";
import { SURVIVAL_PROMPT_M } from "../../model/prompts/ar/survival_M";
import { SURVIVAL_PROMPT_S } from "../../model/prompts/ar/survival_S";
import { CategoryName } from "../../model/types/movement";

const sectionPerTime = (time: string, section: string[]): string => {
    switch (time) {
        case "نصف ساعة":
            return section[0];
        case "ساعة":
            return section[1];
        case "ساعة ونصف":
            return section[2];
        default:
            return "";
    }
};

const sectionPerPlace = (place: string): string[] => {
    switch (place) {
        case "خارجية":
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
        case  "الصف 1":
        case  "الصف 2":
        case "الصف 3":
        case "الصف 4":
            return prompts[0];
        case "الصف 5":
        case "الصف 6":
        case "الصف 7":
        case "الصف 8":
            return prompts[1];
        case "الصف 9":
        case "الصف 10":
        case "الصف 11":
        case "الصف 12":
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
    if (!info || info === "") return "لا توجد معلومات إضافية";
    return info;
};

export const getTools = (category: CategoryName, tools: string | undefined, religion: string | undefined): string => {
    if (tools === "without tools") return "**المواد المطلوبة:** عدم استخدام مواد!";
    else {
        switch (category) {
            case "pointOfView":
                return "**المواد المطلوبة:** (إذا وجدت، عدم استخدام مواد باهظة الثمن، بروجكتور، فيديو)";
            case "survival":
                return "**المواد المطلوبة:** (إذا وجدت، عدم استخدام مواد باهظة الثمن، بروجكتور، فيديو - لاستخدامك، مواد بناء، مواد أرضية، أدوات عمل)";
            case "playTime":
                return "**المواد المطلوبة:** (إذا وجدت، عدم استخدام مواد باهظة الثمن، بروجكتور، فيديو)";
            case "contant":
                return "**المواد المطلوبة:** (إذا وجدت، عدم استخدام مواد باهظة الثمن، بروجكتور، فيديو)";
            default:
                return "**المواد المطلوبة:** عدم استخدام مواد!";
        }
    }
};

export const getSafty = (
    category: CategoryName,
    contest: string | undefined,
) => {
    if (category === "pointOfView") return "";
    let safty: string = "- يجب أن يكون النشاط: بدون عنف، بدون خطر";
    if (contest === "بدون مجموعات") safty += "، بدون منافسات وبدون تقسيم لمجموعات.";
    return safty;
};
