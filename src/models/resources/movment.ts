import { Movement } from "../types/movement";

export const Movements = {
    scout: {
        name: "scout",
        title: "צופים",
        parts: [
            {
                name: "contant",
                title: "פעילות תוכן",
                color: "#D8F0F5",
                isResize: false,
            },
            {
                name: "pointOfView",
                title: "נקודת מבט",
                color: "#D8E0F5",
                isResize: false,
            },
            {
                name: "survival",
                title: "זמן צופיות",
                color: "#DCF5D8",
                isResize: true,
            },
            {
                name: "playTime",
                title: "זמן משחק",
                color: "#F5D8D8",
                isResize: true,
            },
            {
                name: "creation",
                title: "זמן יצירה",
                color: "#F5D8ED",
                isResize: false,
            },
        ],
    } as Movement,
    maccabi: {
        name: "maccabi",
        title: "מכבי צעיר",
        parts: [
            {
                name: "pointOfView",
                title: "דיון",
                color: "#D8E0F5",
                isResize: false,
            },
            {
                name: "playTime",
                title: "זמן משחק",
                color: "#F5D8D8",
                isResize: true,
            },
            {
                name: "creation",
                title: "זמן יצירה",
                color: "#F5D8ED",
                isResize: false,
            },
            {
                name: "contant",
                title: "פעילות מיוחדת",
                color: "#D8F0F5",
                isResize: true,
            },
        ],
    } as Movement,
    akiva: {
        name: "akiva",
        title: "בני עקיבא",
        parts: [
            {
                name: "pointOfView",
                title: "דיון",
                color: "#D8E0F5",
                isResize: false,
            },
            {
                name: "playTime",
                title: "זמן משחק",
                color: "#F5D8D8",
                isResize: true,
            },
            {
                name: "creation",
                title: "זמן יצירה",
                color: "#F5D8ED",
                isResize: false,
            },
            {
                name: "contant",
                title: "פעילות מיוחדת",
                color: "#D8F0F5",
                isResize: true,
            },
        ],
    } as Movement,
    oved: {
        name: "oved",
        title: "הנוער העובד והלומד",
        parts: [
            {
                name: "contant",
                title: "מתודה מרכזית",
                color: "#D8F0F5",
                isResize: false,
            },
            {
                name: "playTime",
                title: "זמן משחק",
                color: "#F5D8D8",
                isResize: true,
            },
            {
                name: "pointOfView",
                title: "מתודת הצפה",
                color: "#D8E0F5",
                isResize: false,
            },
            {
                name: "creation",
                title: "זמן יצירה",
                color: "#F5D8ED",
                isResize: false,
            },
        ],
    } as Movement,
    shomer: {
        name: "shomer",
        title: "השומר הצעיר",
        parts: [
            {
                name: "pointOfView",
                title: "דיון",
                color: "#D8E0F5",
                isResize: false,
            },
            {
                name: "playTime",
                title: "זמן משחק",
                color: "#F5D8D8",
                isResize: true,
            },
            {
                name: "creation",
                title: "זמן יצירה",
                color: "#F5D8ED",
                isResize: false,
            },
            {
                name: "contant",
                title: "פעילות מיוחדת",
                color: "#D8F0F5",
                isResize: true,
            },
        ],
    } as Movement,
    sayarut: {
        name: "sayarut",
        title: "חוגי סיירות",
        parts: [
            {
                name: "pointOfView",
                title: "דיון",
                color: "#D8E0F5",
                isResize: false,
            },
            {
                name: "survival",
                title: "הישרדות",
                color: "#DCF5D8",
                isResize: true,
            },
            {
                name: "playTime",
                title: "זמן משחק",
                color: "#F5D8D8",
                isResize: true,
            },
            {
                name: "creation",
                title: "זמן יצירה",
                color: "#F5D8ED",
                isResize: false,
            },
            {
                name: "contant",
                title: "פעילות מיוחדת",
                color: "#D8F0F5",
                isResize: true,
            },
        ],
    } as Movement,
    medtchim: {
        name: "medtchim",
        title: "ארגון המד״צים",
        parts: [
            {
                name: "pointOfView",
                title: "דיון",
                color: "#D8E0F5",
                isResize: false,
            },
            {
                name: "playTime",
                title: "זמן משחק",
                color: "#F5D8D8",
                isResize: true,
            },
            {
                name: "creation",
                title: "זמן יצירה",
                color: "#F5D8ED",
                isResize: false,
            },
            {
                name: "contant",
                title: "פעילות מיוחדת",
                color: "#D8F0F5",
                isResize: true,
            },
        ],
    } as Movement,
    meshachim: {
        name: "meshachim",
        title: "מדריכי של״ח צעירים",
        parts: [
            {
                name: "pointOfView",
                title: "דיון",
                color: "#D8E0F5",
                isResize: false,
            },
            {
                name: "playTime",
                title: "זמן משחק",
                color: "#F5D8D8",
                isResize: true,
            },
            {
                name: "creation",
                title: "זמן יצירה",
                color: "#F5D8ED",
                isResize: false,
            },
            {
                name: "contant",
                title: "פעילות מיוחדת",
                color: "#D8F0F5",
                isResize: true,
            },
        ],
    } as Movement,
    other: {
        name: "other",
        title: "אחר",
        parts: [
            {
                name: "pointOfView",
                title: "דיון",
                color: "#D8E0F5",
                isResize: false,
            },
            {
                name: "playTime",
                title: "זמן משחק",
                color: "#F5D8D8",
                isResize: true,
            },
            {
                name: "survival",
                title: "הישרדות",
                color: "#DCF5D8",
                isResize: true,
            },
            {
                name: "contant",
                title: "פעילות מיוחדת",
                color: "#D8F0F5",
                isResize: true,
            },
        ],
    } as Movement,
};


// {
//     name: "teamBuilding",
//     title: "גיבוש",
//     color: "#F5EED8",
//     isResize: true,
// },
// {
//     name: "closing",
//     title: "סיכום",
//     color: "#F5D8ED",
//     isResize: false,
// },