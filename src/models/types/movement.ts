import { Activity } from "./activity";

export type Movement = {
    name: string;
    title: string;
    path: MovementPath[];
}

export type MovementPath = {
    name: string;
    title: string;
    activities: Activity[] | undefined;
    hint?: string;
}