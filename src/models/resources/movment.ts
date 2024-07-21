import { Movement } from "../types/movement";

export const Movements = {
    scout: {
        name: "scout",
        title: "צופים",
        categories: [
            {
                name: "contant",
                title: "פעילות תוכן",
            },
            {
                name: "pointOfView",
                title: "נקודת מבט",
            },
            {
                name: "survival",
                title: "זמן צופיות",
            },
            {
                name: "playTime",
                title: "זמן משחק",
            },
        ],
    } as Movement,
    maccabi: {
        name: "maccabi",
        title: "מכבי צעיר",
        categories: [
            {
                name: "contant",
                title: "פעילות",
            },
            {
                name: "playTime",
                title: "משחק",
            },
        ],
    } as Movement,
    akiva: {
        name: "akiva",
        title: "בני עקיבא",
        categories: [
            {
                name: "contant",
                title: "פעילות",
            },
            {
                name: "playTime",
                title: "משחק",
            },
        ],
    } as Movement,
    oved: {
        name: "oved",
        title: "הנוער העובד והלומד",
        categories: [
            {
                name: "contant",
                title: "מתודה מרכזית",
            },
            {
                name: "playTime",
                title: "משחק פתיחה",
            },
            {
                name: "pointOfView",
                title: "מתודת הצפה",
            },
        ],
    } as Movement,
    shomer: {
        name: "shomer",
        title: "השומר הצעיר",
        categories: [
            {
                name: "activity",
                title: "פעילות",
            },
            {
                name: "playTime",
                title: "משחק",
            },
        ],
    } as Movement,
    sayarut: {
        name: "sayarut",
        title: "חוגי סיירות",
        categories: [
            {
                name: "activity",
                title: "פעילות",
            },
            {
                name: "survival",
                title: "הישרדות",
            },
            {
                name: "playTime",
                title: "משחק",
            },
        ],
    } as Movement,
    medtchim: {
        name: "medtchim",
        title: "ארגון המד״צים",
        categories: [
            {
                name: "activity",
                title: "פעילות",
            },
            {
                name: "playTime",
                title: "משחק",
            },
        ],
    } as Movement,
    meshachim: {
        name: "meshachim",
        title: "מדריכי של״ח צעירים",
        categories: [
            {
                name: "activity",
                title: "פעילות",
            },
            {
                name: "playTime",
                title: "משחק",
            },
        ],
    } as Movement,
    other: {
        name: "other",
        title: "אחר",
        categories: [
            {
                name: "activity",
                title: "פעילות",
            },
            {
                name: "playTime",
                title: "משחק",
            },
            {
                name: "survival",
                title: "הישרדות",
            },
        ],
    } as Movement,
};
