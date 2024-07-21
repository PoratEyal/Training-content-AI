import { Activity } from "./activity";

export type Movement = {
    name: string;
    title: string;
    parts: MovementPart[];
};

export type MovementPart = {
    name: string;
    title: string;
    activity: Activity | undefined;
    hint?: string;
};

export type UserMovementDetails = {
    movement: string; //the en name
    grade: string;
    gender: string;
    amount: string;
    time: string;
};
