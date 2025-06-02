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
        shinshin: {
            name: "shinshin",
            title: "שינשינים",
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
    },
    
    en: {
        scouts: {
            name: "Scouts",
            title: "Scouts",
            categories: [
                {
                    name: "contant",
                    title: "Content Activity",
                },
                {
                    name: "playTime",
                    title: "Play Time",
                },
            ],
        } as Movement,
        youthLeadershipPrograms: {
            name: "YouthLeadershipPrograms",
            title: "Youth Leadership Programs",
            categories: [
                {
                    name: "contant",
                    title: "Content Activity",
                },
                {
                    name: "playTime",
                    title: "Play Time",
                },
            ],
        } as Movement,
        faithBasedYouthGroups: {
            name: "FaithBasedYouthGroups",
            title: "Faith-Based Youth Groups",
            categories: [
                {
                    name: "contant",
                    title: "Content Activity",
                },
                {
                    name: "playTime",
                    title: "Play Time",
                },
            ],
        } as Movement,
        environmentalAndNatureGroups: {
            name: "EnvironmentalAndNatureGroups",
            title: "Environmental & Nature Groups",
            categories: [
                {
                    name: "contant",
                    title: "Content Activity",
                },
                {
                    name: "playTime",
                    title: "Play Time",
                },
            ],
        } as Movement,
        other: {
            name: "other",
            title: "Other",
            categories: [
                {
                    name: "contant",
                    title: "Content Activity",
                },
                {
                    name: "playTime",
                    title: "Play Time",
                }
            ],
        } as Movement
    },

    es: {
        scouts: {
            name: "Scouts",
            title: "Scouts",
            categories: [
                {
                    name: "contant",
                    title: "Actividad de Contenido",
                },
                {
                    name: "playTime",
                    title: "Tiempo de Juego",
                },
            ],
        } as Movement,
        youthLeadershipPrograms: {
            name: "YouthLeadershipPrograms",
            title: "Programas de Liderazgo Juvenil",
            categories: [
                {
                    name: "contant",
                    title: "Actividad de Contenido",
                },
                {
                    name: "playTime",
                    title: "Tiempo de Juego",
                },
            ],
        } as Movement,
        faithBasedYouthGroups: {
            name: "FaithBasedYouthGroups",
            title: "Grupos Juveniles Basados en la Fe",
            categories: [
                {
                    name: "contant",
                    title: "Actividad de Contenido",
                },
                {
                    name: "playTime",
                    title: "Tiempo de Juego",
                },
            ],
        } as Movement,
        environmentalAndNatureGroups: {
            name: "EnvironmentalAndNatureGroups",
            title: "Grupos de la Naturaleza",
            categories: [
                {
                    name: "contant",
                    title: "Actividad de Contenido",
                },
                {
                    name: "playTime",
                    title: "Tiempo de Juego",
                },
            ],
        } as Movement,
        other: {
            name: "other",
            title: "Otro",
            categories: [
                {
                    name: "contant",
                    title: "Actividad de Contenido",
                },
                {
                    name: "playTime",
                    title: "Tiempo de Juego",
                }
            ],
        } as Movement
    },

    ar: {
        scouts: {
            name: "Scouts",
            title: "الكشافة",
            categories: [
                {
                    name: "contant",
                    title: "نشاط محتوى",
                },
                {
                    name: "playTime",
                    title: "وقت اللعب",
                },
            ],
        } as Movement,
        youthLeadershipPrograms: {
            name: "YouthLeadershipPrograms",
            title: "برامج القيادة للشباب",
            categories: [
                {
                    name: "contant",
                    title: "نشاط محتوى",
                },
                {
                    name: "playTime",
                    title: "وقت اللعب",
                },
            ],
        } as Movement,
        faithBasedYouthGroups: {
            name: "FaithBasedYouthGroups",
            title: "مجموعات الشباب القائمة على الإيمان",
            categories: [
                {
                    name: "contant",
                    title: "نشاط محتوى",
                },
                {
                    name: "playTime",
                    title: "وقت اللعب",
                },
            ],
        } as Movement,
        environmentalAndNatureGroups: {
            name: "EnvironmentalAndNatureGroups",
            title: "المجموعات البيئية والطبيعية",
            categories: [
                {
                    name: "contant",
                    title: "نشاط محتوى",
                },
                {
                    name: "playTime",
                    title: "وقت اللعب",
                },
            ],
        } as Movement,
        other: {
            name: "other",
            title: "آخر",
            categories: [
                {
                    name: "contant",
                    title: "نشاط محتوى",
                },
                {
                    name: "playTime",
                    title: "وقت اللعب",
                }
            ],
        } as Movement
    }
};
