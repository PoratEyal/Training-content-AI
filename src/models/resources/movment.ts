import { Movement } from "../types/movement";
import hints from "./hints.json";
import PlayingTimeSubjects from "../../models/resources/playingTime.json";
import ScoutingTimeSubjects from "../../models/resources/scoutesActivities.json";

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
                hint: hints.other.activity,
                activity: undefined,
            },
            {
                name: "playingTime",
                title: "זמן משחק",
                hint: hints.other.playingTime,
                activity: undefined,
                magic: PlayingTimeSubjects,
            },
        ],
    } as Movement,
    akiva: {
        name: "akiva",
        title: "בני עקיבא",
        path: [
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
        ],
    } as Movement,
    oved: {
        name: "oved",
        title: "הנוער העובד והלומד",
        path: [
            {
                name: "playingTime",
                title: "משחק פתיחה",
                activity: undefined,
                magic: PlayingTimeSubjects,
            },
            {
                name: "pointOfView",
                title: "מתודת הצפה",
                activity: undefined,
            },
            {
                name: "contentActivity",
                title: "מתודה מרכזית",
                activity: undefined,
            },
        ],
    } as Movement,
    shomer: {
        name: "shomer",
        title: "השומר הצעיר",
        path: [
            {
                name: "activity",
                title: "פעילות",
                hint: hints.other.activity,
                activity: undefined,
            },
            {
                name: "playingTime",
                title: "זמן משחק",
                hint: hints.other.playingTime,
                activity: undefined,
                magic: PlayingTimeSubjects,
            },
        ],
    } as Movement,
    sayarut: {
        name: "sayarut",
        title: "חוגי סיירות",
        path: [
            {
                name: "activity",
                title: "פעילות",
                hint: hints.sayarut.activity,
                activity: undefined,
            },
            {
                name: "scoutingTime",
                title: "הישרדות",
                hint: hints.sayarut.surviveTime,
                activity: undefined,
                magic: ScoutingTimeSubjects,
            },
            {
                name: "playingTime",
                title: "זמן משחק",
                hint: hints.sayarut.playingTime,
                activity: undefined,
                magic: PlayingTimeSubjects,
            },
        ],
    } as Movement,
    medtchim: {
        name: "medtchim",
        title: "ארגון המד״צים",
        path: [
            {
                name: "activity",
                title: "פעילות",
                hint: hints.other.activity,
                activity: undefined,
            },
            {
                name: "playingTime",
                title: "זמן משחק",
                hint: hints.other.playingTime,
                activity: undefined,
                magic: PlayingTimeSubjects,
            },
        ],
    } as Movement,
    meshachim: {
        name: "meshachim",
        title: "מדריכי של״ח צעירים",
        path: [
            {
                name: "activity",
                title: "פעילות",
                hint: hints.other.activity,
                activity: undefined,
            },
            {
                name: "playingTime",
                title: "זמן משחק",
                hint: hints.other.playingTime,
                activity: undefined,
                magic: PlayingTimeSubjects,
            },
        ],
    } as Movement,
    other: {
        name: "other",
        title: "אחר",
        path: [
            {
                name: "activity",
                title: "פעילות",
                hint: hints.other.activity,
                activity: undefined,
            },
            {
                name: "playingTime",
                title: "זמן משחק",
                hint: hints.other.playingTime,
                activity: undefined,
                magic: PlayingTimeSubjects,
            },
        ],
    } as Movement,
};
