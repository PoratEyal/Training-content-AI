import helmetJson from "../models/resources/helmet.json";

export type HelmetPage =
    | "home"
    | "details"
    | "policy"
    | "content"
    | "contentActivities"
    | "contentActivity"
    | "build"
    | "activity"
    | "edit"
    | "contactUs"
    | "aboutUs"
    | "privacyPolicy";

export const getTitle = (page: HelmetPage, i18n: string) => {
    return helmetJson[page][`${i18n === "he" ? "titleHe" : "titleEn"}`];
};

export const getContent = (page: HelmetPage, i18n: string) => {
    return helmetJson[page][`${i18n === "he" ? "contentHe" : "contentEn"}`];
};

export const getSubjectTitle = (title: string | undefined, i18n: string) => {
    if(title) return title;
    return helmetJson.contentActivities[`${i18n === "he" ? "titleHe" : "titleEn"}`];
};

export const getSubjectContent = (content: string | undefined, i18n: string) => {
    if(content) return content;
    return helmetJson.contentActivities[`${i18n === "he" ? "contentHe" : "contentEn"}`];
};