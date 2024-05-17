import { Activity } from "./activity";

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
    path: MovementPath[];
};

export type MovementPath = {
    name: string;
    title: string;
    activity: Activity | undefined;
    hint?: string;
    magic?: any[];
};

export type UserMovementDetails = {
    movement: string; //the en name
    grade: string;
    gender: string;
    amount: string;
    place: string;
};
