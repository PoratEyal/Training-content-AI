import { Movement } from "../types/movement";
import hints from "./hints.json";
import PlayingTimeSubjects from "../../models/resources/playingTime.json";
import ScoutingTimeSubjects from "../../models/resources/scoutesActivities.json";

export const MovementName: string[] = ["scout", "maccabi", "akiva"];

export const Movements = {
    scout: {
        name: "scout",
        title: "צופים",
        path: [
            {
                name: "pointOfView",
                title: "נקודת מבט",
                hint: hints.scout.pointOfView,
                activity: undefined,
            },
            {
                name: "contentActivity",
                title: "פעילות תוכן",
                hint: hints.scout.contentActivity,
                activity: undefined,
            },
            {
                name: "scoutingTime",
                title: "זמן צופיות",
                hint: hints.scout.scoutingTime,
                activity: undefined,
                magic: ScoutingTimeSubjects,
            },
            {
                name: "playingTime",
                title: "זמן משחק",
                hint: hints.scout.playingTime,
                activity: undefined,
                magic: PlayingTimeSubjects,
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
    akiva: {
        name: "akiva",
        title: "בני עקיבא",
        path: [
            {
                name: "opening",
                title: "פתיחה",
                hint: hints.akiva.playingTime,
                activity: undefined,
            },
            {
                name: "contentActivity",
                title: "פעילות תוכן",
                hint: hints.akiva.contentActivity,
                activity: undefined,
            },
            {
                name: "playingTime",
                title: "זמן משחק",
                hint: hints.akiva.playingTime,
                activity: undefined,
                magic: PlayingTimeSubjects,
            },
            {
                name: "summary",
                title: "סיכום",
                hint: hints.akiva.summary,
                activity: undefined,
            },
        ],
    } as Movement,
};
