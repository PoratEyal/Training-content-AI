import { Movement } from "../types/movement";
import hints from "./hints.json";
import PlayingTimeSubjects from "../../models/resources/playingTime.json";
import ScoutingTimeSubjects from "../../models/resources/scoutesActivities.json";

export const Movements = {
    scout: {
        name: "scout",
        title: "צופים",
        parts: [
            {
                name: "pointOfView",
                title: "נקודת מבט",
                hint: hints.scout.pointOfView
            },
            {
                name: "contentActivity",
                title: "פעילות תוכן",
                hint: hints.scout.contentActivity
            },
            {
                name: "scoutingTime",
                title: "זמן צופיות",
                hint: hints.scout.scoutingTime,
                magic: ScoutingTimeSubjects,
            },
            {
                name: "playingTime",
                title: "זמן משחק",
                hint: hints.scout.playingTime,
                magic: PlayingTimeSubjects,
            },
        ],
    } as Movement,
    maccabi: {
        name: "maccabi",
        title: "מכבי צעיר",
        parts: [
            {
                name: "activity",
                title: "פעילות",
                hint: hints.other.activity
            },
            {
                name: "playingTime",
                title: "זמן משחק",
                hint: hints.other.playingTime,
                magic: PlayingTimeSubjects,
            },
        ],
    } as Movement,
    akiva: {
        name: "akiva",
        title: "בני עקיבא",
        parts: [
            {
                name: "contentActivity",
                title: "פעילות תוכן",
                hint: hints.akiva.contentActivity
            },
            {
                name: "playingTime",
                title: "זמן משחק",
                hint: hints.akiva.playingTime,
                magic: PlayingTimeSubjects,
            },
        ],
    } as Movement,
    oved: {
        name: "oved",
        title: "הנוער העובד והלומד",
        parts: [
            {
                name: "playingTime",
                title: "משחק פתיחה",
                magic: PlayingTimeSubjects,
            },
            {
                name: "pointOfView",
                title: "מתודת הצפה"
            },
            {
                name: "contentActivity",
                title: "מתודה מרכזית"
            },
        ],
    } as Movement,
    shomer: {
        name: "shomer",
        title: "השומר הצעיר",
        parts: [
            {
                name: "activity",
                title: "פעילות",
                hint: hints.other.activity
            },
            {
                name: "playingTime",
                title: "זמן משחק",
                hint: hints.other.playingTime,
                magic: PlayingTimeSubjects,
            },
        ],
    } as Movement,
    sayarut: {
        name: "sayarut",
        title: "חוגי סיירות",
        parts: [
            {
                name: "activity",
                title: "פעילות",
                hint: hints.sayarut.activity
            },
            {
                name: "scoutingTime",
                title: "הישרדות",
                hint: hints.sayarut.surviveTime,
                magic: ScoutingTimeSubjects,
            },
            {
                name: "playingTime",
                title: "זמן משחק",
                hint: hints.sayarut.playingTime,
                magic: PlayingTimeSubjects,
            },
        ],
    } as Movement,
    medtchim: {
        name: "medtchim",
        title: "ארגון המד״צים",
        parts: [
            {
                name: "activity",
                title: "פעילות",
                hint: hints.other.activity
            },
            {
                name: "playingTime",
                title: "זמן משחק",
                hint: hints.other.playingTime,
                magic: PlayingTimeSubjects,
            },
        ],
    } as Movement,
    meshachim: {
        name: "meshachim",
        title: "מדריכי של״ח צעירים",
        parts: [
            {
                name: "activity",
                title: "פעילות",
                hint: hints.other.activity
            },
            {
                name: "playingTime",
                title: "זמן משחק",
                hint: hints.other.playingTime,
                magic: PlayingTimeSubjects,
            },
        ],
    } as Movement,
    other: {
        name: "other",
        title: "אחר",
        parts: [
            {
                name: "activity",
                title: "פעילות",
                hint: hints.other.activity
            },
            {
                name: "playingTime",
                title: "זמן משחק",
                hint: hints.other.playingTime,
                magic: PlayingTimeSubjects,
            },
        ],
    } as Movement,
};
