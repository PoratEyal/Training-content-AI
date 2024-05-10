import { Activity } from "./activity";

export type Movement = {
    name: string;
    title: string;
    path: Path[];
}

export type Path = {
    name: string;
    title: string;
    activities: Activity[] | undefined;
    hint?: string;
}