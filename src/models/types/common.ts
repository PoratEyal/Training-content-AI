import React from "react";
import { Movement } from "./movement";

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
    text: string;
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
    | "contactUs";
