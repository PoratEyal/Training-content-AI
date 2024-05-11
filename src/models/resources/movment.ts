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
                activities: [],
            },
            {
                name: "contentActivity",
                title: "פעילות תוכן",
                hint: hints.contentActivity,
                activities: [],
            },
            {
                name: "scoutingTime",
                title: "זמן צופיות",
                hint: hints.scoutingTime,
                activities: [],
            },
            {
                name: "playingTime",
                title: "זמן משחק",
                hint: hints.playingTime,
                activities: [],
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
                activities: [],
            },
        ],
    } as Movement,
};
