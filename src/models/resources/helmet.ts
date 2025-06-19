import { HelmetPage, Lng } from "../types/common";

type LanguageSection = {
    [K in HelmetPage]: {
        title: string;
        content: string;
    };
};

export const helmetJson: Record<Lng, LanguageSection> = {
    he: {
        contactUs: {
            title: "צור קשר",
            content: "נשמח לשמוע מכם! אם יש לכם שאלה, הערה או בקשה – אנחנו כאן בשבילכם."
        },
        privacyPolicy: {
            title: "תנאי שירות",
            content: "קראו על מדיניות הפרטיות והשימוש שלנו באתר."
        },

        home: {
            title: "פעולות לתנועות נוער",
            content: "מגוון פעולות מוכנות למדריכי נוער, לצד אפשרות ליצור פעולות מותאמות אישית בעזרת בינה מלאכותית (AI). מתאים לצופים, נוער עובד, בני עקיבא, השומר הצעיר, מדצים ועוד",
        },
        details: {
            title: "פעולות לתנועות נוער",
            content: "מגוון פעולות מוכנות למדריכי נוער, לצד אפשרות ליצור פעולות מותאמות אישית בעזרת בינה מלאכותית (AI). מתאים לצופים, נוער עובד, בני עקיבא, השומר הצעיר, מדצים ועוד",
        },
        build: {
            title: "פעולות לתנועות נוער",
            content: "מגוון פעולות מוכנות למדריכי נוער, לצד אפשרות ליצור פעולות מותאמות אישית בעזרת בינה מלאכותית (AI). מתאים לצופים, נוער עובד, בני עקיבא, השומר הצעיר, מדצים ועוד",
        },
        activity: {
            title: "פעולות לתנועות נוער",
            content: "מגוון פעולות מוכנות למדריכי נוער, לצד אפשרות ליצור פעולות מותאמות אישית בעזרת בינה מלאכותית (AI). מתאים לצופים, נוער עובד, בני עקיבא, השומר הצעיר, מדצים ועוד",
        },
        content: {
            title: "פעולות לתנועות נוער - פעולות מוכנות",
            content: "מגוון פעולות מוכנות למדריכי נוער, לצד אפשרות ליצור פעולות מותאמות אישית בעזרת בינה מלאכותית (AI). מתאים לצופים, נוער עובד, בני עקיבא, השומר הצעיר, מדצים ועוד",
        },
        contentActivities: {
            title: "פעולות לתנועות נוער - פעולות מוכנות",
            content: "מגוון פעולות מוכנות למדריכי נוער, לצד אפשרות ליצור פעולות מותאמות אישית בעזרת בינה מלאכותית (AI). מתאים לצופים, נוער עובד, בני עקיבא, השומר הצעיר, מדצים ועוד",
        },
        contentActivity: {
            title: "פעולות לתנועות נוער - פעולות מוכנות",
            content: "מגוון פעולות מוכנות למדריכי נוער, לצד אפשרות ליצור פעולות מותאמות אישית בעזרת בינה מלאכותית (AI). מתאים לצופים, נוער עובד, בני עקיבא, השומר הצעיר, מדצים ועוד",
        },
        myactivities: {
            title: "פעולות לתנועות נוער - פעולות שמורות",
            content: "מגוון פעולות מוכנות למדריכי נוער, לצד אפשרות ליצור פעולות מותאמות אישית בעזרת בינה מלאכותית (AI). מתאים לצופים, נוער עובד, בני עקיבא, השומר הצעיר, מדצים ועוד",
        },
        savedActivity: {
            title: "פעולות לתנועות נוער - פעולות שמורות",
            content: "מגוון פעולות מוכנות למדריכי נוער, לצד אפשרות ליצור פעולות מותאמות אישית בעזרת בינה מלאכותית (AI). מתאים לצופים, נוער עובד, בני עקיבא, השומר הצעיר, מדצים ועוד",
        },
        popularActivities: {
            title: "פעולות לתנועות נוער - פעולות פופולריות",
            content: "הפעולות הפופולריות ביותר - גלו את 10 הפעולות המובילות לפעילות קבוצתית, חינוכית ומהנה בתנועות נוער ובקבוצות שונות",
        },
        edit: {
            title: "פעולות לתנועות נוער - עריכה",
            content: "מגוון פעולות מוכנות למדריכי נוער, לצד אפשרות ליצור פעולות מותאמות אישית בעזרת בינה מלאכותית (AI). מתאים לצופים, נוער עובד, בני עקיבא, השומר הצעיר, מדצים ועוד",
        },
        youthFaq: {
            title: "פעולות לתנועות נוער - שאלות נפוצות",
            content: "מגוון פעולות מוכנות למדריכי נוער, לצד אפשרות ליצור פעולות מותאמות אישית בעזרת בינה מלאכותית (AI). מתאים לצופים, נוער עובד, בני עקיבא, השומר הצעיר, מדצים ועוד",
        },

        practiceHome: {
            title: "תרגול עצמי חכם",
            content: "צור תרגול מותאם אישית תוך שניות בעזרת בינה מלאכותית – בכל נושא שתבחר",
        },
        practiceTopic: {
            title: "תרגול עצמי חכם",
            content: "צור תרגול מותאם אישית תוך שניות בעזרת בינה מלאכותית – בכל נושא שתבחר",
        },
        practiceQuiz: {
            title: "תרגול עצמי חכם",
            content: "צור תרגול מותאם אישית תוך שניות בעזרת בינה מלאכותית – בכל נושא שתבחר",
        },
        practiceFaq: {
            title: "תרגול עצמי חכם - שאלות נפוצות",
            content: "צור תרגול מותאם אישית תוך שניות בעזרת בינה מלאכותית – בכל נושא שתבחר",
        },
    } as LanguageSection,

    en: {
        contactUs: {
            title: "Contact us",
            content: "We’d love to hear from you! If you have a question, comment, or request – we’re here for you.",
        },
        privacyPolicy: {
            title: "Privacy & Policy",
            content: "Read about our website’s privacy and usage policy.",
        },

        home: {
            title: "Youth Movement Activities",
            content: "A wide range of activities for youth leaders, with the option to create personalized ones using AI. Perfect for Scouts, youth groups, leadership programs, and more.",
        },
        details: {
            title: "Youth Movement Activities",
            content: "A wide range of activities for youth leaders, with the option to create personalized ones using AI. Perfect for Scouts, youth groups, leadership programs, and more.",
        },
        build: {
            title: "Youth Movement Activities",
            content: "A wide range of activities for youth leaders, with the option to create personalized ones using AI. Perfect for Scouts, youth groups, leadership programs, and more.",
        },
        activity: {
            title: "Youth Movement Activities",
            content: "A wide range of activities for youth leaders, with the option to create personalized ones using AI. Perfect for Scouts, youth groups, leadership programs, and more.",
        },
        content: {
            title: "Youth Movement Activities - content",
            content: "A wide range of activities for youth leaders, with the option to create personalized ones using AI. Perfect for Scouts, youth groups, leadership programs, and more.",
        },
        contentActivities: {
            title: "Youth Movement Activities - content activities",
            content: "A wide range of activities for youth leaders, with the option to create personalized ones using AI. Perfect for Scouts, youth groups, leadership programs, and more.",
        },
        contentActivity: {
            title: "Youth Movement Activities - content activity",
            content: "A wide range of activities for youth leaders, with the option to create personalized ones using AI. Perfect for Scouts, youth groups, leadership programs, and more.",
        },
        myactivities: {
            title: "Youth Movement Activities - my activities",
            content: "A wide range of activities for youth leaders, with the option to create personalized ones using AI. Perfect for Scouts, youth groups, leadership programs, and more.",
        },
        savedActivity: {
            title: "Youth Movement Activities - saved activity",
            content: "A wide range of activities for youth leaders, with the option to create personalized ones using AI. Perfect for Scouts, youth groups, leadership programs, and more.",
        },
        popularActivities: {
            title: "Youth Movement Activities - popular activities",
            content: "Most Popular Activities – Discover 10 top-rated activities for education, fun, and group engagement in youth movements and organizations.",
        },
        edit: {
            title: "Youth Movement Activities - edit",
            content: "A wide range of activities for youth leaders, with the option to create personalized ones using AI. Perfect for Scouts, youth groups, leadership programs, and more.",
        },
        youthFaq: {
            title: "Youth Movement Activities - FAQ",
            content: "A wide range of activities for youth leaders, with the option to create personalized ones using AI. Perfect for Scouts, youth groups, leadership programs, and more.",
        },

        practiceHome: {
            title: "Smart Self Practice",
            content: "Create personalized practice in seconds using AI – on any topic you choose",
        },
        practiceTopic: {
            title: "Smart Self Practice",
            content: "Create personalized practice in seconds using AI – on any topic you choose",
        },
        practiceQuiz: {
            title: "Smart Self Practice",
            content: "Create personalized practice in seconds using AI – on any topic you choose",
        },
        practiceFaq: {
            title: "Smart Self Practice – Frequently Asked Questions",
            content: "Create personalized practice in seconds using AI – on any topic you choose",
        },
    } as LanguageSection,

    ar: {
        contactUs: {
            title: "أنشطة حركات الشباب - اتصل بنا",
            content: "يسعدنا سماعكم! إذا كانت لديكم أي أسئلة أو ملاحظات أو طلبات – نحن هنا من أجلكم."
        },
        privacyPolicy: {
            title: "الخصوصية والسياسة",
            content: "اطلع على سياسة الخصوصية والاستخدام الخاصة بموقعنا."
        },

        home: {
            title: "أنشطة حركات الشباب",
            content: "مجموعة واسعة من الأنشطة لقادة الشباب، مع إمكانية إنشاء أنشطة مخصصة باستخدام الذكاء الاصطناعي. مثالية للكشافة، مجموعات الشباب، برامج القيادة والمزيد."
        },
        details: {
            title: "أنشطة حركات الشباب",
            content: "مجموعة واسعة من الأنشطة لقادة الشباب، مع إمكانية إنشاء أنشطة مخصصة باستخدام الذكاء الاصطناعي. مثالية للكشافة، مجموعات الشباب، برامج القيادة والمزيد."
        },
        build: {
            title: "أنشطة حركات الشباب",
            content: "مجموعة واسعة من الأنشطة لقادة الشباب، مع إمكانية إنشاء أنشطة مخصصة باستخدام الذكاء الاصطناعي. مثالية للكشافة، مجموعات الشباب، برامج القيادة والمزيد."
        },
        activity: {
            title: "أنشطة حركات الشباب",
            content: "مجموعة واسعة من الأنشطة لقادة الشباب، مع إمكانية إنشاء أنشطة مخصصة باستخدام الذكاء الاصطناعي. مثالية للكشافة، مجموعات الشباب، برامج القيادة والمزيد."
        },
        content: {
            title: "أنشطة حركات الشباب - المحتوى",
            content: "مجموعة واسعة من الأنشطة لقادة الشباب، مع إمكانية إنشاء أنشطة مخصصة باستخدام الذكاء الاصطناعي. مثالية للكشافة، مجموعات الشباب، برامج القيادة والمزيد."
        },
        contentActivities: {
            title: "أنشطة حركات الشباب - أنشطة المحتوى",
            content: "مجموعة واسعة من الأنشطة لقادة الشباب، مع إمكانية إنشاء أنشطة مخصصة باستخدام الذكاء الاصطناعي. مثالية للكشافة، مجموعات الشباب، برامج القيادة والمزيد."
        },
        contentActivity: {
            title: "أنشطة حركات الشباب - نشاط المحتوى",
            content: "مجموعة واسعة من الأنشطة لقادة الشباب، مع إمكانية إنشاء أنشطة مخصصة باستخدام الذكاء الاصطناعي. مثالية للكشافة، مجموعات الشباب، برامج القيادة والمزيد."
        },
        myactivities: {
            title: "أنشطة حركات الشباب - أنشطتي",
            content: "مجموعة واسعة من الأنشطة لقادة الشباب، مع إمكانية إنشاء أنشطة مخصصة باستخدام الذكاء الاصطناعي. مثالية للكشافة، مجموعات الشباب، برامج القيادة والمزيد."
        },
        savedActivity: {
            title: "أنشطة حركات الشباب - نشاط محفوظ",
            content: "مجموعة واسعة من الأنشطة لقادة الشباب، مع إمكانية إنشاء أنشطة مخصصة باستخدام الذكاء الاصطناعي. مثالية للكشافة، مجموعات الشباب، برامج القيادة والمزيد."
        },
        popularActivities: {
            title: "أنشطة حركات الشباب - الأنشطة الشائعة",
            content: "الأنشطة الأكثر شيوعًا – اكتشف أفضل 10 أنشطة للتعليم، المرح، والتفاعل الجماعي في حركات الشباب والمنظمات."
        },
        edit: {
            title: "أنشطة حركات الشباب - تعديل",
            content: "مجموعة واسعة من الأنشطة لقادة الشباب، مع إمكانية إنشاء أنشطة مخصصة باستخدام الذكاء الاصطناعي. مثالية للكشافة، مجموعات الشباب، برامج القيادة والمزيد."
        },
        youthFaq: {
            title: "أنشطة حركات الشباب - أسئلة متكررة",
            content: "مجموعة واسعة من الأنشطة لقادة الشباب، مع إمكانية إنشاء أنشطة مخصصة باستخدام الذكاء الاصطناعي. مثالية للكشافة، مجموعات الشباب، برامج القيادة والمزيد."
        },

        practiceHome: {
            title: "تمرين ذاتي ذكي",
            content: "أنشئ تمرينًا مخصصًا في ثوانٍ باستخدام الذكاء الاصطناعي – في أي موضوع تختاره"
        },
        practiceTopic: {
            title: "تمرين ذاتي ذكي",
            content: "أنشئ تمرينًا مخصصًا في ثوانٍ باستخدام الذكاء الاصطناعي – في أي موضوع تختاره"
        },
        practiceQuiz: {
            title: "تمرين ذاتي ذكي",
            content: "أنشئ تمرينًا مخصصًا في ثوانٍ باستخدام الذكاء الاصطناعي – في أي موضوع تختاره"
        },
        practiceFaq: {
            title: "تمرين ذاتي ذكي - الأسئلة الشائعة",
            content: "أنشئ تمرينًا مخصصًا في ثوانٍ باستخدام الذكاء الاصطناعي – في أي موضوع تختاره"
        },
    } as LanguageSection,

    es: {
        contactUs: {
            title: "Actividades para movimientos juveniles - contáctenos",
            content: "¡Nos encantaría saber de ti! Si tienes una pregunta, comentario o solicitud, estamos aquí para ayudarte.",
        },
        privacyPolicy: {
            title: "Privacidad y política",
            content: "Lee sobre nuestra política de privacidad y uso del sitio.",
        },

        home: {
            title: "Actividades para movimientos juveniles",
            content: "Una amplia gama de actividades para líderes juveniles, con la opción de crear actividades personalizadas utilizando IA. Perfecto para Scouts, grupos juveniles, programas de liderazgo y más.",
        },
        details: {
            title: "Actividades para movimientos juveniles",
            content: "Una amplia gama de actividades para líderes juveniles, con la opción de crear actividades personalizadas utilizando IA. Perfecto para Scouts, grupos juveniles, programas de liderazgo y más.",
        },
        build: {
            title: "Actividades para movimientos juveniles",
            content: "Una amplia gama de actividades para líderes juveniles, con la opción de crear actividades personalizadas utilizando IA. Perfecto para Scouts, grupos juveniles, programas de liderazgo y más.",
        },
        activity: {
            title: "Actividades para movimientos juveniles",
            content: "Una amplia gama de actividades para líderes juveniles, con la opción de crear actividades personalizadas utilizando IA. Perfecto para Scouts, grupos juveniles, programas de liderazgo y más.",
        },
        content: {
            title: "Actividades para movimientos juveniles - contenido",
            content: "Una amplia gama de actividades para líderes juveniles, con la opción de crear actividades personalizadas utilizando IA. Perfecto para Scouts, grupos juveniles, programas de liderazgo y más.",
        },
        contentActivities: {
            title: "Actividades para movimientos juveniles - actividades de contenido",
            content: "Una amplia gama de actividades para líderes juveniles, con la opción de crear actividades personalizadas utilizando IA. Perfecto para Scouts, grupos juveniles, programas de liderazgo y más.",
        },
        contentActivity: {
            title: "Actividades para movimientos juveniles - actividad de contenido",
            content: "Una amplia gama de actividades para líderes juveniles, con la opción de crear actividades personalizadas utilizando IA. Perfecto para Scouts, grupos juveniles, programas de liderazgo y más.",
        },
        myactivities: {
            title: "Actividades para movimientos juveniles - mis actividades",
            content: "Una amplia gama de actividades para líderes juveniles, con la opción de crear actividades personalizadas utilizando IA. Perfecto para Scouts, grupos juveniles, programas de liderazgo y más.",
        },
        savedActivity: {
            title: "Actividades para movimientos juveniles - actividad guardada",
            content: "Una amplia gama de actividades para líderes juveniles, con la opción de crear actividades personalizadas utilizando IA. Perfecto para Scouts, grupos juveniles, programas de liderazgo y más.",
        },
        popularActivities: {
            title: "Actividades para movimientos juveniles - actividades populares",
            content: "Actividades más populares: descubra las 10 actividades mejor valoradas para educación, diversión y participación grupal en movimientos juveniles y otras organizaciones.",
        },
        edit: {
            title: "Actividades para movimientos juveniles - edición",
            content: "Una amplia gama de actividades para líderes juveniles, con la opción de crear actividades personalizadas utilizando IA. Perfecto para Scouts, grupos juveniles, programas de liderazgo y más.",
        },
        youthFaq: {
            title: "Actividades para movimientos juveniles - preguntas frecuentes",
            content: "Una amplia gama de actividades para líderes juveniles, con la opción de crear actividades personalizadas utilizando IA. Perfecto para Scouts, grupos juveniles, programas de liderazgo y más.",
        },

        practiceHome: {
            title: "Práctica personal inteligente",
            content: "Crea una práctica personalizada en segundos con la ayuda de inteligencia artificial – sobre cualquier tema que elijas"
        },
        practiceTopic: {
            title: "Práctica personal inteligente",
            content: "Crea una práctica personalizada en segundos con la ayuda de inteligencia artificial – sobre cualquier tema que elijas"
        },
        practiceQuiz: {
            title: "Práctica personal inteligente",
            content: "Crea una práctica personalizada en segundos con la ayuda de inteligencia artificial – sobre cualquier tema que elijas"
        },
        practiceFaq: {
            title: "Práctica personal inteligente - Preguntas frecuentes",
            content: "Crea una práctica personalizada en segundos con la ayuda de inteligencia artificial – sobre cualquier tema que elijas"
        },
    } as LanguageSection,
};


export const getTitle = (page: HelmetPage, i18n: string, title?: string) => {
    if (title) return title;
    const langData = helmetJson[i18n as Lng] || helmetJson["en"];
    const pageData = langData[page] || helmetJson["en"][page];
    return pageData?.title || "Activity Wiz";
};

export const getContent = (page: HelmetPage, i18n: string, content?: string) => {
    if (content) return content;
    const langData = helmetJson[i18n as Lng] || helmetJson["en"];
    const pageData = langData[page] || helmetJson["en"][page];
    return pageData?.content || "Activity Wiz";
};

