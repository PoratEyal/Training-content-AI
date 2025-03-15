import { HelmetPage } from "../types/common";

type LanguageSection = {
    [K in HelmetPage]: {
        title: string;
        content: string;
    };
};

export const helmetJson: Record<"he" | "en", LanguageSection> = {
    he: {
        home: {
            title: "פעולות לתנועות נוער",
            content:
                "מגוון פעולות מוכנות למדריכי נוער, לצד אפשרות ליצור פעולות מותאמות אישית בעזרת בינה מלאכותית (AI). מתאים לצופים, נוער עובד, בני עקיבא, השומר הצעיר, מדצים ועוד",
        },
        details: {
            title: "פעולות לתנועות נוער - הקבוצה",
            content:
                "מגוון פעולות מוכנות למדריכי נוער, לצד אפשרות ליצור פעולות מותאמות אישית בעזרת בינה מלאכותית (AI). מתאים לצופים, נוער עובד, בני עקיבא, השומר הצעיר, מדצים ועוד",
        },
        build: {
            title: "פעולות לתנועות נוער - נושא",
            content:
                "מגוון פעולות מוכנות למדריכי נוער, לצד אפשרות ליצור פעולות מותאמות אישית בעזרת בינה מלאכותית (AI). מתאים לצופים, נוער עובד, בני עקיבא, השומר הצעיר, מדצים ועוד",
        },
        activity: {
            title: "פעולות לתנועות נוער - פעולה",
            content:
                "מגוון פעולות מוכנות למדריכי נוער, לצד אפשרות ליצור פעולות מותאמות אישית בעזרת בינה מלאכותית (AI). מתאים לצופים, נוער עובד, בני עקיבא, השומר הצעיר, מדצים ועוד",
        },
        content: {
            title: "פעולות לתנועות נוער - פעולות מוכנות",
            content:
                "מגוון פעולות מוכנות למדריכי נוער, לצד אפשרות ליצור פעולות מותאמות אישית בעזרת בינה מלאכותית (AI). מתאים לצופים, נוער עובד, בני עקיבא, השומר הצעיר, מדצים ועוד",
        },
        contentActivities: {
            title: "פעולות לתנועות נוער - פעולות מוכנות",
            content:
                "מגוון פעולות מוכנות למדריכי נוער, לצד אפשרות ליצור פעולות מותאמות אישית בעזרת בינה מלאכותית (AI). מתאים לצופים, נוער עובד, בני עקיבא, השומר הצעיר, מדצים ועוד",
        },
        contentActivity: {
            title: "פעולות לתנועות נוער - פעולות מוכנות",
            content:
                "מגוון פעולות מוכנות למדריכי נוער, לצד אפשרות ליצור פעולות מותאמות אישית בעזרת בינה מלאכותית (AI). מתאים לצופים, נוער עובד, בני עקיבא, השומר הצעיר, מדצים ועוד",
        },
        myactivities: {
            title: "פעולות לתנועות נוער - פעולות שמורות",
            content:
                "מגוון פעולות מוכנות למדריכי נוער, לצד אפשרות ליצור פעולות מותאמות אישית בעזרת בינה מלאכותית (AI). מתאים לצופים, נוער עובד, בני עקיבא, השומר הצעיר, מדצים ועוד",
        },
        savedActivity: {
            title: "פעולות לתנועות נוער - פעולות שמורות",
            content:
                "מגוון פעולות מוכנות למדריכי נוער, לצד אפשרות ליצור פעולות מותאמות אישית בעזרת בינה מלאכותית (AI). מתאים לצופים, נוער עובד, בני עקיבא, השומר הצעיר, מדצים ועוד",
        },
        popularActivities: {
            title: "פעולות לתנועות נוער - פעולות פופולריות",
            content:
                "הפעולות הפופולריות ביותר - גלו את 10 הפעולות המובילות לפעילות קבוצתית, חינוכית ומהנה בתנועות נוער ובקבוצות שונות",
        },
        privacyPolicy: {
            title: "פעולות לתנועות נוער - תנאי שירות",
            content:
                "מגוון פעולות מוכנות למדריכי נוער, לצד אפשרות ליצור פעולות מותאמות אישית בעזרת בינה מלאכותית (AI). מתאים לצופים, נוער עובד, בני עקיבא, השומר הצעיר, מדצים ועוד",
        },
        edit: {
            title: "פעולות לתנועות נוער - עריכה",
            content:
                "מגוון פעולות מוכנות למדריכי נוער, לצד אפשרות ליצור פעולות מותאמות אישית בעזרת בינה מלאכותית (AI). מתאים לצופים, נוער עובד, בני עקיבא, השומר הצעיר, מדצים ועוד",
        },
        contactUs: {
            title: "פעולות לתנועות נוער - יצירת קשר",
            content:
                "מגוון פעולות מוכנות למדריכי נוער, לצד אפשרות ליצור פעולות מותאמות אישית בעזרת בינה מלאכותית (AI). מתאים לצופים, נוער עובד, בני עקיבא, השומר הצעיר, מדצים ועוד",
        },
    } as LanguageSection,
    en: {
        home: {
            title: "Activities for youth",
            content:
                "A variety of ready-made activities for youth guides, alongside the option to create customized activities with the help of artificial intelligence (AI). Suitable for Scouts, Working Youth, Bnei Akiva, Hashomer Hatzair, youth counselors, and more.",
        },
        details: {
            title: "Activities for youth - group",
            content:
                "A variety of ready-made activities for youth guides, alongside the option to create customized activities with the help of artificial intelligence (AI). Suitable for Scouts, Working Youth, Bnei Akiva, Hashomer Hatzair, youth counselors, and more.",
        },
        build: {
            title: "Activities for youth - build",
            content:
                "A variety of ready-made activities for youth guides, alongside the option to create customized activities with the help of artificial intelligence (AI). Suitable for Scouts, Working Youth, Bnei Akiva, Hashomer Hatzair, youth counselors, and more.",
        },
        activity: {
            title: "Activities for youth - activity",
            content:
                "A variety of ready-made activities for youth guides, alongside the option to create customized activities with the help of artificial intelligence (AI). Suitable for Scouts, Working Youth, Bnei Akiva, Hashomer Hatzair, youth counselors, and more.",
        },
        content: {
            title: "Activities for youth - content",
            content:
                "A variety of ready-made activities for youth guides, alongside the option to create customized activities with the help of artificial intelligence (AI). Suitable for Scouts, Working Youth, Bnei Akiva, Hashomer Hatzair, youth counselors, and more.",
        },
        contentActivities: {
            title: "Activities for youth - content activities",
            content:
                "A variety of ready-made activities for youth guides, alongside the option to create customized activities with the help of artificial intelligence (AI). Suitable for Scouts, Working Youth, Bnei Akiva, Hashomer Hatzair, youth counselors, and more.",
        },
        contentActivity: {
            title: "Activities for youth - content activity",
            content:
                "A variety of ready-made activities for youth guides, alongside the option to create customized activities with the help of artificial intelligence (AI). Suitable for Scouts, Working Youth, Bnei Akiva, Hashomer Hatzair, youth counselors, and more.",
        },
        myactivities: {
            title: "Activities for youth - my activities",
            content:
                "A variety of ready-made activities for youth guides, alongside the option to create customized activities with the help of artificial intelligence (AI). Suitable for Scouts, Working Youth, Bnei Akiva, Hashomer Hatzair, youth counselors, and more.",
        },
        savedActivity: {
            title: "Activities for youth - saved activity",
            content:
                "A variety of ready-made activities for youth guides, alongside the option to create customized activities with the help of artificial intelligence (AI). Suitable for Scouts, Working Youth, Bnei Akiva, Hashomer Hatzair, youth counselors, and more.",
        },
        popularActivities: {
            title: "Activities for youth - popular activities",
            content:
                "The most popular activities - discover 10 of the most popular activities for group activities, education and fun in youth movements and groups",
        },
        privacyPolicy: {
            title: "Activities for youth - policy",
            content:
                "A variety of ready-made activities for youth guides, alongside the option to create customized activities with the help of artificial intelligence (AI). Suitable for Scouts, Working Youth, Bnei Akiva, Hashomer Hatzair, youth counselors, and more.",
        },
        edit: {
            title: "Activities for youth - edit",
            content:
                "A variety of ready-made activities for youth guides, alongside the option to create customized activities with the help of artificial intelligence (AI). Suitable for Scouts, Working Youth, Bnei Akiva, Hashomer Hatzair, youth counselors, and more.",
        },
        contactUs: {
            title: "Activities for youth - contact us",
            content:
                "A variety of ready-made activities for youth guides, alongside the option to create customized activities with the help of artificial intelligence (AI). Suitable for Scouts, Working Youth, Bnei Akiva, Hashomer Hatzair, youth counselors, and more.",
        },
    } as LanguageSection,
};

export const getTitle = (page: HelmetPage, i18n: string, title?: string) => {
    if (title) return title;
    return helmetJson[i18n][page].title;
};

export const getContent = (page: HelmetPage, i18n: string, content?: string) => {
    if (content) return content;
    return helmetJson[i18n][page].content;
};
