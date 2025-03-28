import { Movement } from "../types/movement";

/**
 * Dont forget to also update
 * ./models/types/movement.ts for the new Movement type and 
 * ./models/resources/select.ts for MovmentsOptions
 */
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
    camps: {
        name: "camps",
        title: "המחנות העולים",
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
    shomer: {
        name: "shomer",
        title: "השומר הצעיר",
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
    bitar: {
        name: "bitar",
        title: "נוער לאומי ביתר",
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
    hadasha: {
        name: "hadasha",
        title: "התנועה החדשה",
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
    medtchim: {
        name: "medtchim",
        title: "ארגון המד״צים",
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
    krembo: {
        name: "krembo",
        title: "כנפיים של קרמבו",
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
    meshachim: {
        name: "meshachim",
        title: "מדריכי של״ח צעירים",
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
    sayarut: {
        name: "sayarut",
        title: "חוגי סיירות",
        categories: [
            {
                name: "contant",
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
    noam: {
        name: "noam",
        title: "נוע״ם",
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
    agricultural: {
        name: "agricultural",
        title: "האיחוד החקלאי",
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
    other: {
        name: "other",
        title: "אחר",
        categories: [
            {
                name: "contant",
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
