import React from "react";
import { Movement } from "./movement";

export type Lng = "he" | "en" | "es" | "ar" | "fr" | "pt";

export type DataType = {
    movement: Movement | undefined;
    grade: string;
    gender: string;
    amount: string;
};

export type NavOption = {
    title: string;
    path: string;
    Icon: React.ReactNode;
};

export type DropdownOption = {
    title: string;
    path?: string | undefined;
    func?: () => Promise<void> | void;
    Icon: React.ReactNode;
};

export type SelectOption = {
    readonly value: string;
    readonly label: string;
    action?: () => any;
};

export type MsgType = {
    textEn: string;
    textHe: string;
};

export type HelmetPage =
    | "home"
    | "details"
    | "build"
    | "activity"
    | "privacyPolicy"
    | "myactivities"
    | "savedActivity"
    | "content"
    | "popularActivities"
    | "contentActivities"
    | "contentActivity"
    | "edit"
    | "youthFaq"
    | "contactUs"
    | "eventHome"
    | "eventDetails"
    | "eventBuild"
    | "eventActivity"
    | "eventFaq"
    | "practiceHome"
    | "practiceTopic"
    | "practiceQuiz"
    | "practiceFaq"
    | "wordsHome"
    | "wordsTopic"
    | "wordsQuiz"
    | "wordsFaq";
