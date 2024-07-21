import { Activity, Part } from "./activity";

export type MovementName =
    | "scout"
    | "maccabi"
    | "akiva"
    | "oved"
    | "shomer"
    | "sayarut"
    | "medtchim"
    | "meshachim"
    | "other";

export type Movement = {
    name: MovementName;
    title: string;
    parts: MovementPart[];
};

export type MovementPart = {
    name: Part;
    title: string;
    hint?: string;
    magic?: any[];
    color?: "#DCF5D8" | "#D8E0F5" | "#F5D8ED" | "#D8F0F5" | "#F5D8D8" | "#F5EED8";
    isResize: boolean;
    partSubject?: string;
};

export type UserMovementDetails = {
    movement: string; //the en name
    grade: string;
    gender: string;
    amount: string;
    time: string;
};
