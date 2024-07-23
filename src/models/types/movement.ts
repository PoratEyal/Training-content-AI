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
    categories: Category[];
};

export type CategoryName = "contant" | "pointOfView" | "survival" | "playTime";

export type Category = {
    name: CategoryName;
    title: string;
};

export type UserMovementDetails = {
    movement: string; //the en name
    grade: string;
    gender: string;
    amount: string;
};
