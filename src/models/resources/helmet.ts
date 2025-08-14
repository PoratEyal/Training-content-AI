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
            title: "ActivityWiz – צרו קשר",
            content: "נשמח לשמוע מכם! אם יש לכם שאלה, הערה או בקשה – אנחנו כאן בשבילכם.",
        },
        privacyPolicy: {
            title: "ActivityWiz – מדיניות פרטיות",
            content: "קראו על מדיניות הפרטיות ותנאי השימוש באתר שלנו.",
        },

        home: {
            title: "פעולות לתנועות נוער – ActivityWiz",
            content:"יצירת פעולות חדשות ומותאמות אישית תוך שניות בעזרת AI, לצד מאגר פעולות מוכנות לכל תנועות הנוער. מתאים לצופים, נוער עובד, בני עקיבא, השומר הצעיר, מדצים ועוד – חברתיות, ערכיות וחינוכיות.",
        },
        details: {
            title: "פעולות לתנועות נוער – ActivityWiz",
            content:"יצירת פעולות חדשות ומותאמות אישית תוך שניות בעזרת AI, לצד מאגר פעולות מוכנות לכל תנועות הנוער. מתאים לצופים, נוער עובד, בני עקיבא, השומר הצעיר, מדצים ועוד – חברתיות, ערכיות וחינוכיות.",
        },
        build: {
            title: "פעולות לתנועות נוער – ActivityWiz",
            content:"יצירת פעולות חדשות ומותאמות אישית תוך שניות בעזרת AI, לצד מאגר פעולות מוכנות לכל תנועות הנוער. מתאים לצופים, נוער עובד, בני עקיבא, השומר הצעיר, מדצים ועוד – חברתיות, ערכיות וחינוכיות.",
        },
        activity: {
            title: "פעולות לתנועות נוער – ActivityWiz",
            content:"יצירת פעולות חדשות ומותאמות אישית תוך שניות בעזרת AI, לצד מאגר פעולות מוכנות לכל תנועות הנוער. מתאים לצופים, נוער עובד, בני עקיבא, השומר הצעיר, מדצים ועוד – חברתיות, ערכיות וחינוכיות.",
        },
        content: {
            title: "פעולות מוכנות לתנועות נוער – ActivityWiz",
            content: "מאגר פעולות מוכנות ורעיונות למדריכי כל תנועות הנוער – צופים, נוער עובד, בני עקיבא, השומר הצעיר, מדצים ועוד. כולל דוגמאות ופעילויות בנושא חברות, מנהיגות, אחריות, ערכים ומשחקים מגבשים.",
        },
        contentActivities: {
            title: "פעולות מוכנות לתנועות נוער – ActivityWiz",
            content: "מאגר פעולות מוכנות ורעיונות למדריכי כל תנועות הנוער – צופים, נוער עובד, בני עקיבא, השומר הצעיר, מדצים ועוד. כולל דוגמאות ופעילויות בנושא חברות, מנהיגות, אחריות, ערכים ומשחקים מגבשים.",
        },
        contentActivity: {
            title: "פעולות מוכנות לתנועות נוער – ActivityWiz",
            content: "מאגר פעולות מוכנות ורעיונות למדריכי כל תנועות הנוער – צופים, נוער עובד, בני עקיבא, השומר הצעיר, מדצים ועוד. כולל דוגמאות ופעילויות בנושא חברות, מנהיגות, אחריות, ערכים ומשחקים מגבשים.",
        },
        myactivities: {
            title: "פעולות לתנועות נוער – ActivityWiz",
            content:"יצירת פעולות חדשות ומותאמות אישית תוך שניות בעזרת AI, לצד מאגר פעולות מוכנות לכל תנועות הנוער. מתאים לצופים, נוער עובד, בני עקיבא, השומר הצעיר, מדצים ועוד – חברתיות, ערכיות וחינוכיות.",
        },
        savedActivity: {
            title: "פעולות לתנועות נוער – ActivityWiz",
            content:"יצירת פעולות חדשות ומותאמות אישית תוך שניות בעזרת AI, לצד מאגר פעולות מוכנות לכל תנועות הנוער. מתאים לצופים, נוער עובד, בני עקיבא, השומר הצעיר, מדצים ועוד – חברתיות, ערכיות וחינוכיות.",
        },
        popularActivities: {
            title: "פעולות פופולריות לתנועות נוער – ActivityWiz",
            content: "מאגר פעולות מוכנות ורעיונות למדריכי כל תנועות הנוער – צופים, נוער עובד, בני עקיבא, השומר הצעיר, מדצים ועוד. כולל דוגמאות ופעילויות בנושא חברות, מנהיגות, אחריות, ערכים ומשחקים מגבשים.",
        },
        edit: {
            title: "פעולות לתנועות נוער – ActivityWiz",
            content:"יצירת פעולות חדשות ומותאמות אישית תוך שניות בעזרת AI, לצד מאגר פעולות מוכנות לכל תנועות הנוער. מתאים לצופים, נוער עובד, בני עקיבא, השומר הצעיר, מדצים ועוד – חברתיות, ערכיות וחינוכיות.",
        },
        youthFaq: {
            title: "פעולות לתנועות נוער - שאלות נפוצות – ActivityWiz",
            content:"יצירת פעולות חדשות ומותאמות אישית תוך שניות בעזרת AI, לצד מאגר פעולות מוכנות לכל תנועות הנוער. מתאים לצופים, נוער עובד, בני עקיבא, השומר הצעיר, מדצים ועוד – חברתיות, ערכיות וחינוכיות.",
        },

        eventHome: {
            title: "פעילויות והפעלות לכל אירוע ומטרה עם ActivityWiz",
            content: "רעיונות לפעילויות והפעלות לכל אירוע, קבוצה או מפגש – צרו פעילות מותאמת אישית בעזרת בינה מלאכותית. לפי גיל, מספר משתתפים, מקום וציוד – בקלות ובמהירות.",
        },
        eventDetails: {
            title: "פעילויות והפעלות לכל אירוע ומטרה עם ActivityWiz",
            content: "רעיונות לפעילויות והפעלות לכל אירוע, קבוצה או מפגש – צרו פעילות מותאמת אישית בעזרת בינה מלאכותית. לפי גיל, מספר משתתפים, מקום וציוד – בקלות ובמהירות.",
        },
        eventBuild: {
            title: "פעילויות והפעלות לכל אירוע ומטרה עם ActivityWiz",
            content: "רעיונות לפעילויות והפעלות לכל אירוע, קבוצה או מפגש – צרו פעילות מותאמת אישית בעזרת בינה מלאכותית. לפי גיל, מספר משתתפים, מקום וציוד – בקלות ובמהירות.",
        },
        eventActivity: {
            title: "פעילויות והפעלות לכל אירוע ומטרה עם ActivityWiz",
            content: "רעיונות לפעילויות והפעלות לכל אירוע, קבוצה או מפגש – צרו פעילות מותאמת אישית בעזרת בינה מלאכותית. לפי גיל, מספר משתתפים, מקום וציוד – בקלות ובמהירות.",
        },
        eventFaq: {
            title: "פעילויות והפעלות לכל אירוע ומטרה עם ActivityWiz",
            content: "רעיונות לפעילויות והפעלות לכל אירוע, קבוצה או מפגש – צרו פעילות מותאמת אישית בעזרת בינה מלאכותית. לפי גיל, מספר משתתפים, מקום וציוד – בקלות ובמהירות.",
        },

        bestHome: {
            title: "מי הכי חכם – ActivityWiz",
            content: "שחקו בתחרויות טריוויה בין קבוצות כמו בנים מול בנות או ילדים מול מבוגרים, וגלו מי הכי חכם. אפשר להצטרף לתחרויות קיימות או לפתוח תחרות חדשה ולתרום נקודות לקבוצה שלכם דרך משחקים כיפיים.",
        },
        bestContests: {
            title: "מי הכי חכם – ActivityWiz",
            content: "שחקו בתחרויות טריוויה בין קבוצות כמו בנים מול בנות או ילדים מול מבוגרים, וגלו מי הכי חכם. אפשר להצטרף לתחרויות קיימות או לפתוח תחרות חדשה ולתרום נקודות לקבוצה שלכם דרך משחקים כיפיים.",
        },
        bestHof: {
            title: "מי הכי חכם – ActivityWiz",
            content: "שחקו בתחרויות טריוויה בין קבוצות כמו בנים מול בנות או ילדים מול מבוגרים, וגלו מי הכי חכם. אפשר להצטרף לתחרויות קיימות או לפתוח תחרות חדשה ולתרום נקודות לקבוצה שלכם דרך משחקים כיפיים.",
        },
        bestFaq: {
            title: "מי הכי חכם - שאלות נפוצות – ActivityWiz",
            content: "תרגלו מילים וביטויים בין שפות ולמדו את משמעותם בקלות וביעילות. מתאים ללמידת שפות, חיזוק הזיכרון והעשרת אוצר המילים.",
        },

        practiceHome: {
            title: "אתגר הידע – ActivityWiz",
            content: "צרו תרגול מאתגר ומותאם אישית תוך שניות בעזרת בינה מלאכותית – בכל נושא שתבחרו.",
        },
        practiceTopic: {
            title: "אתגר הידע – ActivityWiz",
            content: "צרו תרגול מאתגר ומותאם אישית תוך שניות בעזרת בינה מלאכותית – בכל נושא שתבחרו.",
        },
        practiceQuiz: {
            title: "אתגר הידע – ActivityWiz",
            content: "צרו תרגול מאתגר ומותאם אישית תוך שניות בעזרת בינה מלאכותית – בכל נושא שתבחרו.",
        },
        practiceFaq: {
            title: "אתגר הידע - שאלות נפוצות – ActivityWiz",
            content: "צרו תרגול מאתגר ומותאם אישית תוך שניות בעזרת בינה מלאכותית – בכל נושא שתבחרו.",
        },

        wordsHome: {
            title: "תרגול אוצר מילים – ActivityWiz",
            content: "תרגלו מילים וביטויים בין שפות ולמדו את משמעותם בעזרת בינה מלאכותית – בקלות וביעילות. מתאים ללמידת שפות, חיזוק הזיכרון והעשרת אוצר המילים.",
        },
        wordsTopic: {
            title: "תרגול אוצר מילים – ActivityWiz",
            content: "תרגלו מילים וביטויים בין שפות ולמדו את משמעותם בעזרת בינה מלאכותית – בקלות וביעילות. מתאים ללמידת שפות, חיזוק הזיכרון והעשרת אוצר המילים.",
        },
        wordsQuiz: {
            title: "תרגול אוצר מילים – ActivityWiz",
            content: "תרגלו מילים וביטויים בין שפות ולמדו את משמעותם בעזרת בינה מלאכותית – בקלות וביעילות. מתאים ללמידת שפות, חיזוק הזיכרון והעשרת אוצר המילים.",
        },
        wordsFaq: {
            title: "תרגול אוצר מילים - שאלות נפוצות – ActivityWiz",
            content: "תרגלו מילים וביטויים בין שפות ולמדו את משמעותם בעזרת בינה מלאכותית – בקלות וביעילות. מתאים ללמידת שפות, חיזוק הזיכרון והעשרת אוצר המילים.",
        },
    } as LanguageSection,


    en: {
        contactUs: {
            title: "ActivityWiz - Contact us",
            content: "Have a question or suggestion? We’d love to hear from you – just reach out!",
        },
        privacyPolicy: {
            title: "ActivityWiz - Privacy Policy",
            content: "Read about our website’s privacy and usage policy.",
        },

        home: {
            title: "ActivityWiz - Youth Movement Activities",
            content: "Create or explore youth movement activities – ideal for Scouts, leadership programs, and educational guides.",
        },
        details: {
            title: "ActivityWiz - Youth Movement Activities",
            content: "Create or explore youth movement activities – ideal for Scouts, leadership programs, and educational guides.",
        },
        build: {
            title: "ActivityWiz - Youth Movement Activities",
            content: "Create or explore youth movement activities – ideal for Scouts, leadership programs, and educational guides.",
        },
        activity: {
            title: "ActivityWiz - Youth Movement Activities",
            content: "Create or explore youth movement activities – ideal for Scouts, leadership programs, and educational guides.",
        },
        content: {
            title: "ActivityWiz - Youth Movement Activities",
            content: "Create or explore youth movement activities – ideal for Scouts, leadership programs, and educational guides.",
        },
        contentActivities: {
            title: "ActivityWiz - Youth Movement Activities",
            content: "Create or explore youth movement activities – ideal for Scouts, leadership programs, and educational guides.",
        },
        contentActivity: {
            title: "ActivityWiz - Youth Movement Activities",
            content: "Create or explore youth movement activities – ideal for Scouts, leadership programs, and educational guides.",
        },
        myactivities: {
            title: "ActivityWiz - Youth Movement Activities",
            content: "Create or explore youth movement activities – ideal for Scouts, leadership programs, and educational guides.",
        },
        savedActivity: {
            title: "ActivityWiz - Youth Movement Activities",
            content: "Create or explore youth movement activities – ideal for Scouts, leadership programs, and educational guides.",
        },
        popularActivities: {
            title: "ActivityWiz - Youth Movement Activities",
            content: "Create or explore youth movement activities – ideal for Scouts, leadership programs, and educational guides.",
        },
        edit: {
            title: "ActivityWiz - Youth Movement Activities",
            content: "Create or explore youth movement activities – ideal for Scouts, leadership programs, and educational guides.",
        },
        youthFaq: {
            title: "ActivityWiz - Youth Movement Activities - FAQ",
            content: "Create or explore youth movement activities – ideal for Scouts, leadership programs, and educational guides.",
        },

        eventHome: {
            title: "Original Activities with ActivityWiz",
            content: "Ideas for activities and games for any event, group, or gathering – create a personalized activity with the help of AI. Based on age, number of participants, location, and equipment – easily and quickly.",
        },
        eventDetails: {
            title: "Original Activities with ActivityWiz",
            content: "Ideas for activities and games for any event, group, or gathering – create a personalized activity with the help of AI. Based on age, number of participants, location, and equipment – easily and quickly.",
        },
        eventBuild: {
            title: "Original Activities with ActivityWiz",
            content: "Ideas for activities and games for any event, group, or gathering – create a personalized activity with the help of AI. Based on age, number of participants, location, and equipment – easily and quickly.",
        },
        eventActivity: {
            title: "Original Activities with ActivityWiz",
            content: "Ideas for activities and games for any event, group, or gathering – create a personalized activity with the help of AI. Based on age, number of participants, location, and equipment – easily and quickly.",
        },
        eventFaq: {
            title: "Original Activities with ActivityWiz",
            content: "Ideas for activities and games for any event, group, or gathering – create a personalized activity with the help of AI. Based on age, number of participants, location, and equipment – easily and quickly.",
        },

        bestHome: {
            title: "Original Activities with ActivityWiz",
            content: "Join trivia competitions between groups like boys vs. girls or kids vs. adults and find out which team is the smartest. You can join existing competitions or create a new one and earn points for your team through fun games.",
        },
        bestContests: {
            title: "ActivityWiz - Who’s the Smartest",
            content: "Join trivia competitions between groups like boys vs. girls or kids vs. adults and find out which team is the smartest. You can join existing competitions or create a new one and earn points for your team through fun games.",
        },
        bestHof: {
            title: "ActivityWiz - Who’s the Smartest",
            content: "Join trivia competitions between groups like boys vs. girls or kids vs. adults and find out which team is the smartest. You can join existing competitions or create a new one and earn points for your team through fun games.",
        },
        bestFaq: {
            title: "ActivityWiz - Who’s the Smartest",
            content: "Practice vocabulary and phrases across languages and learn their meanings easily and efficiently. Perfect for language learning, memory enhancement, and expanding your vocabulary.",
        },


        practiceHome: {
            title: "ActivityWiz – Knowledge Challenge",
            content: "Boost learning with smart AI – instantly create and solve personalized quizzes on any topic.",
        },
        practiceTopic: {
            title: "ActivityWiz – Knowledge Challenge",
            content: "Boost learning with smart AI – instantly create and solve personalized quizzes on any topic.",
        },
        practiceQuiz: {
            title: "ActivityWiz – Knowledge Challenge",
            content: "Boost learning with smart AI – instantly create and solve personalized quizzes on any topic.",
        },
        practiceFaq: {
            title: "ActivityWiz – Knowledge Challenge - FAQ",
            content: "Boost learning with smart AI – instantly create and solve personalized quizzes on any topic.",
        },


        wordsHome: {
            title: "ActivityWiz Words – Practice Vocabulary",
            content: "Practice words and phrases between languages and learn their meaning easily with the help of AI. A smart tool for language learning, improving vocabulary, and strengthening memory.",
        },
        wordsTopic: {
            title: "ActivityWiz Words – Practice Vocabulary",
            content: "Practice words and phrases between languages and learn their meaning easily with the help of AI. A smart tool for language learning, improving vocabulary, and strengthening memory.",
        },
        wordsQuiz: {
            title: "ActivityWiz Words – Practice Vocabulary",
            content: "Practice words and phrases between languages and learn their meaning easily with the help of AI. A smart tool for language learning, improving vocabulary, and strengthening memory.",
        },
        wordsFaq: {
            title: "ActivityWiz Words – Practice Vocabulary FAQ",
            content: "Practice words and phrases between languages and learn their meaning easily with the help of AI. A smart tool for language learning, improving vocabulary, and strengthening memory.",
        },

    } as LanguageSection,

    ar: {
        contactUs: {
            title: "ActivityWiz - اتصل بنا",
            content: "هل لديك سؤال أو اقتراح؟ يسعدنا سماعك – لا تتردد في التواصل معنا!",
        },
        privacyPolicy: {
            title: "ActivityWiz - سياسة الخصوصية",
            content: "اطّلع على سياسة الخصوصية وشروط الاستخدام الخاصة بموقعنا.",
        },

        home: {
            title: "ActivityWiz - فعاليات لحركات الشباب",
            content: "أنشئ أو استكشف فعاليات لحركات الشباب باستخدام الذكاء الاصطناعي. مثالي للكشافة، وبرامج القيادة، والمجموعات التعليمية.",
        },
        details: {
            title: "ActivityWiz - فعاليات لحركات الشباب",
            content: "أنشئ أو استكشف فعاليات لحركات الشباب باستخدام الذكاء الاصطناعي. مثالي للكشافة، وبرامج القيادة، والمجموعات التعليمية.",
        },
        build: {
            title: "ActivityWiz - فعاليات لحركات الشباب",
            content: "أنشئ أو استكشف فعاليات لحركات الشباب باستخدام الذكاء الاصطناعي. مثالي للكشافة، وبرامج القيادة، والمجموعات التعليمية.",
        },
        activity: {
            title: "ActivityWiz - فعاليات لحركات الشباب",
            content: "أنشئ أو استكشف فعاليات لحركات الشباب باستخدام الذكاء الاصطناعي. مثالي للكشافة، وبرامج القيادة، والمجموعات التعليمية.",
        },
        content: {
            title: "ActivityWiz - فعاليات لحركات الشباب",
            content: "أنشئ أو استكشف فعاليات لحركات الشباب باستخدام الذكاء الاصطناعي. مثالي للكشافة، وبرامج القيادة، والمجموعات التعليمية.",
        },
        contentActivities: {
            title: "ActivityWiz - فعاليات لحركات الشباب",
            content: "أنشئ أو استكشف فعاليات لحركات الشباب باستخدام الذكاء الاصطناعي. مثالي للكشافة، وبرامج القيادة، والمجموعات التعليمية.",
        },
        contentActivity: {
            title: "ActivityWiz - فعاليات لحركات الشباب",
            content: "أنشئ أو استكشف فعاليات لحركات الشباب باستخدام الذكاء الاصطناعي. مثالي للكشافة، وبرامج القيادة، والمجموعات التعليمية.",
        },
        myactivities: {
            title: "ActivityWiz - فعاليات لحركات الشباب",
            content: "أنشئ أو استكشف فعاليات لحركات الشباب باستخدام الذكاء الاصطناعي. مثالي للكشافة، وبرامج القيادة، والمجموعات التعليمية.",
        },
        savedActivity: {
            title: "ActivityWiz - فعاليات لحركات الشباب",
            content: "أنشئ أو استكشف فعاليات لحركات الشباب باستخدام الذكاء الاصطناعي. مثالي للكشافة، وبرامج القيادة، والمجموعات التعليمية.",
        },
        popularActivities: {
            title: "ActivityWiz - فعاليات لحركات الشباب",
            content: "أنشئ أو استكشف فعاليات لحركات الشباب باستخدام الذكاء الاصطناعي. مثالي للكشافة، وبرامج القيادة، والمجموعات التعليمية.",
        },
        edit: {
            title: "ActivityWiz - فعاليات لحركات الشباب",
            content: "أنشئ أو استكشف فعاليات لحركات الشباب باستخدام الذكاء الاصطناعي. مثالي للكشافة، وبرامج القيادة، والمجموعات التعليمية.",
        },
        youthFaq: {
            title: "ActivityWiz - فعاليات لحركات الشباب - الأسئلة الشائعة",
            content: "أنشئ أو استكشف فعاليات لحركات الشباب باستخدام الذكاء الاصطناعي. مثالي للكشافة، وبرامج القيادة، والمجموعات التعليمية.",
        },

        eventHome: {
            title: "أنشطة أصلية مع ActivityWiz",
            content: "أفكار لأنشطة وفعاليات لأي مناسبة أو مجموعة أو لقاء – أنشئ نشاطًا مخصصًا بمساعدة الذكاء الاصطناعي. بناءً على العمر وعدد المشاركين والمكان والمعدات – بسهولة وسرعة.",
        },
        eventDetails: {
            title: "أنشطة أصلية مع ActivityWiz",
            content: "أفكار لأنشطة وفعاليات لأي مناسبة أو مجموعة أو لقاء – أنشئ نشاطًا مخصصًا بمساعدة الذكاء الاصطناعي. بناءً على العمر وعدد المشاركين والمكان والمعدات – بسهولة وسرعة.",
        },
        eventBuild: {
            title: "أنشطة أصلية مع ActivityWiz",
            content: "أفكار لأنشطة وفعاليات لأي مناسبة أو مجموعة أو لقاء – أنشئ نشاطًا مخصصًا بمساعدة الذكاء الاصطناعي. بناءً على العمر وعدد المشاركين والمكان والمعدات – بسهولة وسرعة.",
        },
        eventActivity: {
            title: "أنشطة أصلية مع ActivityWiz",
            content: "أفكار لأنشطة وفعاليات لأي مناسبة أو مجموعة أو لقاء – أنشئ نشاطًا مخصصًا بمساعدة الذكاء الاصطناعي. بناءً على العمر وعدد المشاركين والمكان والمعدات – بسهولة وسرعة.",
        },
        eventFaq: {
            title: "أنشطة أصلية مع ActivityWiz",
            content: "أفكار لأنشطة وفعاليات لأي مناسبة أو مجموعة أو لقاء – أنشئ نشاطًا مخصصًا بمساعدة الذكاء الاصطناعي. بناءً على العمر وعدد المشاركين والمكان والمعدات – بسهولة وسرعة.",
        },

        bestHome: {
            title: "ActivityWiz - من الأذكى؟",
            content: "انضم إلى مسابقات معلومات عامة بين مجموعات مثل الأولاد ضد البنات أو الأطفال ضد الكبار واكتشف أي فريق هو الأذكى. يمكنك الانضمام إلى مسابقات قائمة أو إنشاء مسابقة جديدة وكسب نقاط لفريقك من خلال ألعاب ممتعة.",
        },
        bestContests: {
            title: "ActivityWiz - من الأذكى؟",
            content: "انضم إلى مسابقات معلومات عامة بين مجموعات مثل الأولاد ضد البنات أو الأطفال ضد الكبار واكتشف أي فريق هو الأذكى. يمكنك الانضمام إلى مسابقات قائمة أو إنشاء مسابقة جديدة وكسب نقاط لفريقك من خلال ألعاب ممتعة.",
        },
        bestHof: {
            title: "ActivityWiz - من الأذكى؟",
            content: "انضم إلى مسابقات معلومات عامة بين مجموعات مثل الأولاد ضد البنات أو الأطفال ضد الكبار واكتشف أي فريق هو الأذكى. يمكنك الانضمام إلى مسابقات قائمة أو إنشاء مسابقة جديدة وكسب نقاط لفريقك من خلال ألعاب ممتعة.",
        },
        bestFaq: {
            title: "ActivityWiz - من الأذكى؟",
            content: "تدرّب على المفردات والتعابير بين اللغات وتعلّم معانيها بسهولة وفعالية. مثالي لتعلم اللغات، وتقوية الذاكرة، وتوسيع المفردات.",
        },

        practiceHome: {
            title: "ActivityWiz – تحدي المعرفة",
            content: "عزّز تعلمك بالذكاء الاصطناعي – أنشئ واختبر تمارين شخصية لأي موضوع في ثوانٍ.",
        },
        practiceTopic: {
            title: "ActivityWiz – تحدي المعرفة",
            content: "عزّز تعلمك بالذكاء الاصطناعي – أنشئ واختبر تمارين شخصية لأي موضوع في ثوانٍ.",
        },
        practiceQuiz: {
            title: "ActivityWiz – تحدي المعرفة",
            content: "عزّز تعلمك بالذكاء الاصطناعي – أنشئ واختبر تمارين شخصية لأي موضوع في ثوانٍ.",
        },
        practiceFaq: {
            title: "ActivityWiz – تحدي المعرفة",
            content: "عزّز تعلمك بالذكاء الاصطناعي – أنشئ واختبر تمارين شخصية لأي موضوع في ثوانٍ.",
        },

        wordsHome: {
            title: "ActivityWiz Words – تعلّم ودرّب مفرداتك",
            content: "تدرّب على الكلمات والعبارات بين اللغات وتعلّم معناها بسهولة بمساعدة الذكاء الاصطناعي. أداة ذكية لتعلّم اللغات، وتحسين المفردات، وتقوية الذاكرة.",
        },
        wordsTopic: {
            title: "ActivityWiz Words – تعلّم ودرّب مفرداتك",
            content: "تدرّب على الكلمات والعبارات بين اللغات وتعلّم معناها بسهولة بمساعدة الذكاء الاصطناعي. أداة ذكية لتعلّم اللغات، وتحسين المفردات، وتقوية الذاكرة.",
        },
        wordsQuiz: {
            title: "ActivityWiz Words – تعلّم ودرّب مفرداتك",
            content: "تدرّب على الكلمات والعبارات بين اللغات وتعلّم معناها بسهولة بمساعدة الذكاء الاصطناعي. أداة ذكية لتعلّم اللغات، وتحسين المفردات، وتقوية الذاكرة.",
        },
        wordsFaq: {
            title: "ActivityWiz Words – الأسئلة الشائعة حول المفردات",
            content: "تدرّب على الكلمات والعبارات بين اللغات وتعلّم معناها بسهولة بمساعدة الذكاء الاصطناعي. أداة ذكية لتعلّم اللغات، وتحسين المفردات، وتقوية الذاكرة.",
        },
    } as LanguageSection,


    es: {
        contactUs: {
            title: "ActivityWiz - Contáctanos",
            content: "¿Tienes una pregunta o sugerencia? ¡Nos encantaría saber de ti!",
        },
        privacyPolicy: {
            title: "ActivityWiz - Política de Privacidad",
            content: "Lee sobre nuestra política de privacidad y uso del sitio web.",
        },

        home: {
            title: "ActivityWiz - Actividades para Movimientos Juveniles",
            content: "Crea o explora actividades para movimientos juveniles con IA. Ideal para Scouts, programas de liderazgo y grupos educativos.",
        },
        details: {
            title: "ActivityWiz - Actividades para Movimientos Juveniles",
            content: "Crea o explora actividades para movimientos juveniles con IA. Ideal para Scouts, programas de liderazgo y grupos educativos.",
        },
        build: {
            title: "ActivityWiz - Actividades para Movimientos Juveniles",
            content: "Crea o explora actividades para movimientos juveniles con IA. Ideal para Scouts, programas de liderazgo y grupos educativos.",
        },
        activity: {
            title: "ActivityWiz - Actividades para Movimientos Juveniles",
            content: "Crea o explora actividades para movimientos juveniles con IA. Ideal para Scouts, programas de liderazgo y grupos educativos.",
        },
        content: {
            title: "ActivityWiz - Actividades para Movimientos Juveniles",
            content: "Crea o explora actividades para movimientos juveniles con IA. Ideal para Scouts, programas de liderazgo y grupos educativos.",
        },
        contentActivities: {
            title: "ActivityWiz - Actividades para Movimientos Juveniles",
            content: "Crea o explora actividades para movimientos juveniles con IA. Ideal para Scouts, programas de liderazgo y grupos educativos.",
        },
        contentActivity: {
            title: "ActivityWiz - Actividades para Movimientos Juveniles",
            content: "Crea o explora actividades para movimientos juveniles con IA. Ideal para Scouts, programas de liderazgo y grupos educativos.",
        },
        myactivities: {
            title: "ActivityWiz - Actividades para Movimientos Juveniles",
            content: "Crea o explora actividades para movimientos juveniles con IA. Ideal para Scouts, programas de liderazgo y grupos educativos.",
        },
        savedActivity: {
            title: "ActivityWiz - Actividades para Movimientos Juveniles",
            content: "Crea o explora actividades para movimientos juveniles con IA. Ideal para Scouts, programas de liderazgo y grupos educativos.",
        },
        popularActivities: {
            title: "ActivityWiz - Actividades para Movimientos Juveniles",
            content: "Crea o explora actividades para movimientos juveniles con IA. Ideal para Scouts, programas de liderazgo y grupos educativos.",
        },
        edit: {
            title: "ActivityWiz - Actividades para Movimientos Juveniles",
            content: "Crea o explora actividades para movimientos juveniles con IA. Ideal para Scouts, programas de liderazgo y grupos educativos.",
        },
        youthFaq: {
            title: "ActivityWiz - Actividades para Movimientos Juveniles - Preguntas Frecuentes",
            content: "Crea o explora actividades para movimientos juveniles con IA. Ideal para Scouts, programas de liderazgo y grupos educativos.",
        },

        eventHome: {
            title: "Actividades originales con ActivityWiz",
            content: "Ideas para actividades y juegos para cualquier evento, grupo o reunión: crea una actividad personalizada con la ayuda de la inteligencia artificial. Según la edad, el número de participantes, el lugar y el equipo, de forma fácil y rápida.",
        },
        eventDetails: {
            title: "Actividades originales con ActivityWiz",
            content: "Ideas para actividades y juegos para cualquier evento, grupo o reunión: crea una actividad personalizada con la ayuda de la inteligencia artificial. Según la edad, el número de participantes, el lugar y el equipo, de forma fácil y rápida.",
        },
        eventBuild: {
            title: "Actividades originales con ActivityWiz",
            content: "Ideas para actividades y juegos para cualquier evento, grupo o reunión: crea una actividad personalizada con la ayuda de la inteligencia artificial. Según la edad, el número de participantes, el lugar y el equipo, de forma fácil y rápida.",
        },
        eventActivity: {
            title: "Actividades originales con ActivityWiz",
            content: "Ideas para actividades y juegos para cualquier evento, grupo o reunión: crea una actividad personalizada con la ayuda de la inteligencia artificial. Según la edad, el número de participantes, el lugar y el equipo, de forma fácil y rápida.",
        },
        eventFaq: {
            title: "Actividades originales con ActivityWiz",
            content: "Ideas para actividades y juegos para cualquier evento, grupo o reunión: crea una actividad personalizada con la ayuda de la inteligencia artificial. Según la edad, el número de participantes, el lugar y el equipo, de forma fácil y rápida.",
        },


        bestHome: {
            title: "ActivityWiz - ¿Quién es el más inteligente?",
            content: "Únete a competiciones de trivia entre grupos como chicos vs. chicas o niños vs. adultos y descubre qué equipo es el más inteligente. Puedes unirte a competiciones existentes o crear una nueva y ganar puntos para tu equipo a través de juegos divertidos.",
        },
        bestContests: {
            title: "ActivityWiz - ¿Quién es el más inteligente?",
            content: "Únete a competiciones de trivia entre grupos como chicos vs. chicas o niños vs. adultos y descubre qué equipo es el más inteligente. Puedes unirte a competiciones existentes o crear una nueva y ganar puntos para tu equipo a través de juegos divertidos.",
        },
        bestHof: {
            title: "ActivityWiz - ¿Quién es el más inteligente?",
            content: "Únete a competiciones de trivia entre grupos como chicos vs. chicas o niños vs. adultos y descubre qué equipo es el más inteligente. Puedes unirte a competiciones existentes o crear una nueva y ganar puntos para tu equipo a través de juegos divertidos.",
        },
        bestFaq: {
            title: "ActivityWiz - ¿Quién es el más inteligente?",
            content: "Practica vocabulario y frases en diferentes idiomas y aprende sus significados de forma fácil y eficaz. Perfecto para aprender idiomas, mejorar la memoria y ampliar tu vocabulario.",
        },


        practiceHome: {
            title: "ActivityWiz – Desafío de Conocimiento",
            content: "Mejora tu aprendizaje con IA – crea y resuelve cuestionarios personalizados sobre cualquier tema en segundos.",
        },
        practiceTopic: {
            title: "ActivityWiz – Desafío de Conocimiento",
            content: "Mejora tu aprendizaje con IA – crea y resuelve cuestionarios personalizados sobre cualquier tema en segundos.",
        },
        practiceQuiz: {
            title: "ActivityWiz – Desafío de Conocimiento",
            content: "Mejora tu aprendizaje con IA – crea y resuelve cuestionarios personalizados sobre cualquier tema en segundos.",
        },
        practiceFaq: {
            title: "ActivityWiz – Desafío de Conocimiento - Preguntas Frecuentes",
            content: "Mejora tu aprendizaje con IA – crea y resuelve cuestionarios personalizados sobre cualquier tema en segundos.",
        },


        wordsHome: {
            title: "ActivityWiz Words – Practica Vocabulario",
            content: "Practica palabras y frases entre idiomas y aprende su significado fácilmente con la ayuda de la inteligencia artificial. Una herramienta inteligente para el aprendizaje de idiomas, mejorar el vocabulario y fortalecer la memoria.",
        },
        wordsTopic: {
            title: "ActivityWiz Words – Practica Vocabulario",
            content: "Practica palabras y frases entre idiomas y aprende su significado fácilmente con la ayuda de la inteligencia artificial. Una herramienta inteligente para el aprendizaje de idiomas, mejorar el vocabulario y fortalecer la memoria.",
        },
        wordsQuiz: {
            title: "ActivityWiz Words – Practica Vocabulario",
            content: "Practica palabras y frases entre idiomas y aprende su significado fácilmente con la ayuda de la inteligencia artificial. Una herramienta inteligente para el aprendizaje de idiomas, mejorar el vocabulario y fortalecer la memoria.",
        },
        wordsFaq: {
            title: "ActivityWiz Words – Practica Vocabulario - Preguntas Frecuentes",
            content: "Practica palabras y frases entre idiomas y aprende su significado fácilmente con la ayuda de la inteligencia artificial. Una herramienta inteligente para el aprendizaje de idiomas, mejorar el vocabulario y fortalecer la memoria.",
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

