import { Movement } from "../types/movement";
import hints from "./hints.json";

export const MovementName: string[] = ["scout", "maccabi"];

export const Movements = {
    scout: {
        name: "scout",
        title: "צופים",
        path: [
            {
                name: "pointOfView",
                title: "נקודת מבט",
                hint: hints.pointOfView,
                activity: undefined,
            },
            {
                name: "contentActivity",
                title: "פעילות תוכן",
                hint: hints.contentActivity,
                activity: undefined,
            },
            {
                name: "scoutingTime",
                title: "זמן צופיות",
                hint: hints.scoutingTime,
                activity: undefined,
            },
            {
                name: "playingTime",
                title: "זמן משחק",
                hint: hints.playingTime,
                activity: undefined,
            },
        ],
    } as Movement,
    maccabi: {
        name: "maccabi",
        title: "מכבי צעיר",
        path: [
            {
                name: "activity",
                title: "פעילות",
                activity: undefined,
            },
        ],
    } as Movement,
};
