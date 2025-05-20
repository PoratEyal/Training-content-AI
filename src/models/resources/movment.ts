import { Movement } from "../types/movement";

/**
 * Dont forget to also update
 * ./models/types/movement.ts for the new Movement type and
 * ./models/resources/he/select.ts for MovmentsOptions
 */
export const Movements = {
    he: {
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
    }, en: {
        other: {
            name: "other",
            title: "Other",
            categories: [
                {
                    name: "contant",
                    title: "Contant",
                },
                {
                    name: "playTime",
                    title: "Play Time",
                }
            ],
        } as Movement,
        h4: {
            name: "h4",
            title: "H-4",
            categories: [
                {
                    name: "contant",
                    title: "Contant",
                },
                {
                    name: "playTime",
                    title: "Play Time",
                },
            ],
        } as Movement,
        BGCA: {
            name: "BGCA",
            title: "Scouting America",
            categories: [
                {
                    name: "contant",
                    title: "Contant",
                },
                {
                    name: "playTime",
                    title: "Play Time",
                },
            ],
        } as Movement,
        girlScoutsOfTheUSA: {
            name: "girlScoutsOfTheUSA",
            title: "Girl Scouts",
            categories: [
                {
                    name: "contant",
                    title: "Contant",
                },
                {
                    name: "playTime",
                    title: "Play Time",
                },
            ],
        } as Movement,
         boysScoutsOfTheUSA: {
            name: "boysScoutsOfTheUSA",
            title: "BGCA",
            categories: [
                {
                    name: "contant",
                    title: "Contant",
                },
                {
                    name: "playTime",
                    title: "Play Time",
                },
            ],
        } as Movement,
         ffa: {
            name: "ffa",
            title: "FFA",
            categories: [
                {
                    name: "contant",
                    title: "Contant",
                },
                {
                    name: "playTime",
                    title: "Play Time",
                },
            ],
        } as Movement,
    }
};
