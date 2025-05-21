import { HelmetPage, Lng } from "../types/common";

type LanguageSection = {
    [K in HelmetPage]: {
        title: string;
        content: string;
    };
};

export const helmetJson: Record<Lng, LanguageSection> = {
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
            title: "Youth Movement Activities",
            content:
                "A wide range of activities for youth leaders, with the option to create personalized ones using AI. Perfect for Scouts, youth groups, leadership programs, and more.",
        },
        details: {
            title: "Youth Movement Activities - group",
            content:
                "A wide range of activities for youth leaders, with the option to create personalized ones using AI. Perfect for Scouts, youth groups, leadership programs, and more.",
        },
        build: {
            title: "Youth Movement Activities - build",
            content:
                "A wide range of activities for youth leaders, with the option to create personalized ones using AI. Perfect for Scouts, youth groups, leadership programs, and more.",
        },
        activity: {
            title: "Youth Movement Activities - activity",
            content:
                "A wide range of activities for youth leaders, with the option to create personalized ones using AI. Perfect for Scouts, youth groups, leadership programs, and more.",
        },
        content: {
            title: "Youth Movement Activities - content",
            content:
                "A wide range of activities for youth leaders, with the option to create personalized ones using AI. Perfect for Scouts, youth groups, leadership programs, and more.",
        },
        contentActivities: {
            title: "Youth Movement Activities - content activities",
            content:
                "A wide range of activities for youth leaders, with the option to create personalized ones using AI. Perfect for Scouts, youth groups, leadership programs, and more.",
        },
        contentActivity: {
            title: "Youth Movement Activities - content activity",
            content:
                "A wide range of activities for youth leaders, with the option to create personalized ones using AI. Perfect for Scouts, youth groups, leadership programs, and more.",
        },
        myactivities: {
            title: "Youth Movement Activities - my activities",
            content:
                "A wide range of activities for youth leaders, with the option to create personalized ones using AI. Perfect for Scouts, youth groups, leadership programs, and more.",
        },
        savedActivity: {
            title: "Youth Movement Activities - saved activity",
            content:
                "A wide range of activities for youth leaders, with the option to create personalized ones using AI. Perfect for Scouts, youth groups, leadership programs, and more.",
        },
        popularActivities: {
            title: "Youth Movement Activities - popular activities",
            content:
                "Most Popular Activities – Discover 10 top-rated activities for education, fun, and group engagement in youth movements and organizations.",
        },
        privacyPolicy: {
            title: "Youth Movement Activities - policy",
            content:
                "A wide range of activities for youth leaders, with the option to create personalized ones using AI. Perfect for Scouts, youth groups, leadership programs, and more.",
        },
        edit: {
            title: "Youth Movement Activities - edit",
            content:
                "A wide range of activities for youth leaders, with the option to create personalized ones using AI. Perfect for Scouts, youth groups, leadership programs, and more.",
        },
        contactUs: {
            title: "Youth Movement Activities - contact us",
            content:
                "A wide range of activities for youth leaders, with the option to create personalized ones using AI. Perfect for Scouts, youth groups, leadership programs, and more.",
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
