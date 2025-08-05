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
            content: "מגוון פעולות מוכנות למדריכי נוער, לצד אפשרות ליצור פעולות מותאמות אישית בעזרת בינה מלאכותית. מתאים לצופים, נוער עובד, בני עקיבא, השומר הצעיר, מדצים ועוד.",
        },
        details: {
            title: "פעולות לתנועות נוער – ActivityWiz",
            content: "מגוון פעולות מוכנות למדריכי נוער, לצד אפשרות ליצור פעולות מותאמות אישית בעזרת בינה מלאכותית. מתאים לצופים, נוער עובד, בני עקיבא, השומר הצעיר, מדצים ועוד.",
        },
        build: {
            title: "פעולות לתנועות נוער – ActivityWiz",
            content: "מגוון פעולות מוכנות למדריכי נוער, לצד אפשרות ליצור פעולות מותאמות אישית בעזרת בינה מלאכותית. מתאים לצופים, נוער עובד, בני עקיבא, השומר הצעיר, מדצים ועוד.",
        },
        activity: {
            title: "פעולות לתנועות נוער – ActivityWiz",
            content: "מגוון פעולות מוכנות למדריכי נוער, לצד אפשרות ליצור פעולות מותאמות אישית בעזרת בינה מלאכותית. מתאים לצופים, נוער עובד, בני עקיבא, השומר הצעיר, מדצים ועוד.",
        },
        content: {
            title: "פעולות מוכנות לתנועות נוער – ActivityWiz",
            content: "מגוון פעולות מוכנות למדריכי נוער, לצד אפשרות ליצור פעולות מותאמות אישית בעזרת בינה מלאכותית. מתאים לצופים, נוער עובד, בני עקיבא, השומר הצעיר, מדצים ועוד.",
        },
        contentActivities: {
            title: "פעולות מוכנות לתנועות נוער – ActivityWiz",
            content: "מגוון פעולות מוכנות למדריכי נוער, לצד אפשרות ליצור פעולות מותאמות אישית בעזרת בינה מלאכותית. מתאים לצופים, נוער עובד, בני עקיבא, השומר הצעיר, מדצים ועוד.",
        },
        contentActivity: {
            title: "פעולות מוכנות לתנועות נוער – ActivityWiz",
            content: "מגוון פעולות מוכנות למדריכי נוער, לצד אפשרות ליצור פעולות מותאמות אישית בעזרת בינה מלאכותית. מתאים לצופים, נוער עובד, בני עקיבא, השומר הצעיר, מדצים ועוד.",
        },
        myactivities: {
            title: "פעולות לתנועות נוער – ActivityWiz",
            content: "מגוון פעולות מוכנות למדריכי נוער, לצד אפשרות ליצור פעולות מותאמות אישית בעזרת בינה מלאכותית. מתאים לצופים, נוער עובד, בני עקיבא, השומר הצעיר, מדצים ועוד.",
        },
        savedActivity: {
            title: "פעולות לתנועות נוער – ActivityWiz",
            content: "מגוון פעולות מוכנות למדריכי נוער, לצד אפשרות ליצור פעולות מותאמות אישית בעזרת בינה מלאכותית. מתאים לצופים, נוער עובד, בני עקיבא, השומר הצעיר, מדצים ועוד.",
        },
        popularActivities: {
            title: "פעולות פופולריות לתנועות נוער – ActivityWiz",
            content: "מגוון פעולות מוכנות למדריכי נוער, לצד אפשרות ליצור פעולות מותאמות אישית בעזרת בינה מלאכותית. מתאים לצופים, נוער עובד, בני עקיבא, השומר הצעיר, מדצים ועוד.",
        },
        edit: {
            title: "פעולות לתנועות נוער – ActivityWiz",
            content: "מגוון פעולות מוכנות למדריכי נוער, לצד אפשרות ליצור פעולות מותאמות אישית בעזרת בינה מלאכותית. מתאים לצופים, נוער עובד, בני עקיבא, השומר הצעיר, מדצים ועוד.",
        },
        youthFaq: {
            title: "פעולות לתנועות נוער - שאלות נפוצות – ActivityWiz",
            content: "מגוון פעולות מוכנות למדריכי נוער, לצד אפשרות ליצור פעולות מותאמות אישית בעזרת בינה מלאכותית. מתאים לצופים, נוער עובד, בני עקיבא, השומר הצעיר, מדצים ועוד.",
        },

        eventHome: {
            title: "פעילויות מקוריות לאירועים – ActivityWiz",
            content: "מחפשים רעיון מקורי וכיפי לאירוע? צרו פעילות מותאמת אישית בלחיצת כפתור – לפי גיל, מספר משתתפים, מקום וציוד שיש לכם. כל מה שצריך כדי להרים פעילות מעולה – בקלות ובמהירות.",
        },
        eventDetails: {
            title: "פעילויות מקוריות לאירועים – ActivityWiz",
            content: "מחפשים רעיון מקורי וכיפי לאירוע? צרו פעילות מותאמת אישית בלחיצת כפתור – לפי גיל, מספר משתתפים, מקום וציוד שיש לכם. כל מה שצריך כדי להרים פעילות מעולה – בקלות ובמהירות.",
        },
        eventBuild: {
            title: "פעילויות מקוריות לאירועים – ActivityWiz",
            content: "מחפשים רעיון מקורי וכיפי לאירוע? צרו פעילות מותאמת אישית בלחיצת כפתור – לפי גיל, מספר משתתפים, מקום וציוד שיש לכם. כל מה שצריך כדי להרים פעילות מעולה – בקלות ובמהירות.",
        },
        eventActivity: {
            title: "פעילויות מקוריות לאירועים – ActivityWiz",
            content: "מחפשים רעיון מקורי וכיפי לאירוע? צרו פעילות מותאמת אישית בלחיצת כפתור – לפי גיל, מספר משתתפים, מקום וציוד שיש לכם. כל מה שצריך כדי להרים פעילות מעולה – בקלות ובמהירות.",
        },
        eventFaq: {
            title: "פעילויות מקוריות לאירועים – ActivityWiz",
            content: "מחפשים רעיון מקורי וכיפי לאירוע? צרו פעילות מותאמת אישית בלחיצת כפתור – לפי גיל, מספר משתתפים, מקום וציוד שיש לכם. כל מה שצריך כדי להרים פעילות מעולה – בקלות ובמהירות.",
        },

        bestHome: {
            title: "מי הכי חכם – ActivityWiz",
            content: "שחקו בתחרויות טריוויה בין קבוצות כמו בנים מול בנות או ילדים מול מבוגרים, וגלו מי הכי חכם. אפשר להצטרף לתחרויות קיימות או לפתוח תחרות חדשה ולתרום נקודות לקבוצה שלכם דרך משחקים כיפיים.",
        },
        bestQuiz: {
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
            content: "תרגלו מילים וביטויים בין שפות ולמדו את משמעותם בקלות וביעילות. מתאים ללמידת שפות, חיזוק הזיכרון והעשרת אוצר המילים.",
        },
        wordsTopic: {
            title: "תרגול אוצר מילים – ActivityWiz",
            content: "תרגלו מילים וביטויים בין שפות ולמדו את משמעותם בקלות וביעילות. מתאים ללמידת שפות, חיזוק הזיכרון והעשרת אוצר המילים.",
        },
        wordsQuiz: {
            title: "תרגול אוצר מילים – ActivityWiz",
            content: "תרגלו מילים וביטויים בין שפות ולמדו את משמעותם בקלות וביעילות. מתאים ללמידת שפות, חיזוק הזיכרון והעשרת אוצר המילים.",
        },
        wordsFaq: {
            title: "תרגול אוצר מילים - שאלות נפוצות – ActivityWiz",
            content: "תרגלו מילים וביטויים בין שפות ולמדו את משמעותם בקלות וביעילות. מתאים ללמידת שפות, חיזוק הזיכרון והעשרת אוצר המילים.",
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
            title: "Original Event Activities – ActivityWiz",
            content: "Looking for a fun and original idea for your event? Create a personalized activity with just one click – based on age, number of participants, location, and available equipment. Everything you need to plan a great activity – easily and quickly.",
        },
        eventDetails: {
            title: "Original Event Activities – ActivityWiz",
            content: "Looking for a fun and original idea for your event? Create a personalized activity with just one click – based on age, number of participants, location, and available equipment. Everything you need to plan a great activity – easily and quickly.",
        },
        eventBuild: {
            title: "Original Event Activities – ActivityWiz",
            content: "Looking for a fun and original idea for your event? Create a personalized activity with just one click – based on age, number of participants, location, and available equipment. Everything you need to plan a great activity – easily and quickly.",
        },
        eventActivity: {
            title: "Original Event Activities – ActivityWiz",
            content: "Looking for a fun and original idea for your event? Create a personalized activity with just one click – based on age, number of participants, location, and available equipment. Everything you need to plan a great activity – easily and quickly.",
        },
        eventFaq: {
            title: "Original Event Activities – ActivityWiz",
            content: "Looking for a fun and original idea for your event? Create a personalized activity with just one click – based on age, number of participants, location, and available equipment. Everything you need to plan a great activity – easily and quickly.",
        },

        bestHome: {
            title: "ActivityWiz - Who’s the Smartest",
            content: "Join trivia competitions between groups like boys vs. girls or kids vs. adults and find out which team is the smartest. You can join existing competitions or create a new one and earn points for your team through fun games.",
        },
        bestQuiz: {
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
            content: "Practice words between languages and learn their meaning easily. A smart tool for language learning, improving vocabulary, and strengthening memory.",
        },
        wordsTopic: {
            title: "ActivityWiz Words – Practice Vocabulary",
            content: "Practice words between languages and learn their meaning easily. A smart tool for language learning, improving vocabulary, and strengthening memory.",
        },
        wordsQuiz: {
            title: "ActivityWiz Words – Practice Vocabulary",
            content: "Practice words between languages and learn their meaning easily. A smart tool for language learning, improving vocabulary, and strengthening memory.",
        },
        wordsFaq: {
            title: "ActivityWiz Words – Practice Vocabulary FAQ",
            content: "Practice words between languages and learn their meaning easily. A smart tool for language learning, improving vocabulary, and strengthening memory.",
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
            title: "أنشطة أصلية للمناسبات – ActivityWiz",
            content: "تبحثون عن فكرة ممتعة ومميزة لمناسبتكم؟ أنشئوا نشاطًا مخصصًا بضغطة زر – حسب العمر، عدد المشاركين، المكان والمعدات المتوفرة. كل ما تحتاجونه لتنظيم نشاط رائع – بسهولة وسرعة.",
        },
        eventDetails: {
            title: "أنشطة أصلية للمناسبات – ActivityWiz",
            content: "تبحثون عن فكرة ممتعة ومميزة لمناسبتكم؟ أنشئوا نشاطًا مخصصًا بضغطة زر – حسب العمر، عدد المشاركين، المكان والمعدات المتوفرة. كل ما تحتاجونه لتنظيم نشاط رائع – بسهولة وسرعة.",
        },
        eventBuild: {
            title: "أنشطة أصلية للمناسبات – ActivityWiz",
            content: "تبحثون عن فكرة ممتعة ومميزة لمناسبتكم؟ أنشئوا نشاطًا مخصصًا بضغطة زر – حسب العمر، عدد المشاركين، المكان والمعدات المتوفرة. كل ما تحتاجونه لتنظيم نشاط رائع – بسهولة وسرعة.",
        },
        eventActivity: {
            title: "أنشطة أصلية للمناسبات – ActivityWiz",
            content: "تبحثون عن فكرة ممتعة ومميزة لمناسبتكم؟ أنشئوا نشاطًا مخصصًا بضغطة زر – حسب العمر، عدد المشاركين، المكان والمعدات المتوفرة. كل ما تحتاجونه لتنظيم نشاط رائع – بسهولة وسرعة.",
        },
        eventFaq: {
            title: "أنشطة أصلية للمناسبات – ActivityWiz",
            content: "تبحثون عن فكرة ممتعة ومميزة لمناسبتكم؟ أنشئوا نشاطًا مخصصًا بضغطة زر – حسب العمر، عدد المشاركين، المكان والمعدات المتوفرة. كل ما تحتاجونه لتنظيم نشاط رائع – بسهولة وسرعة.",
        },

        bestHome: {
            title: "ActivityWiz - من الأذكى؟",
            content: "انضم إلى مسابقات معلومات عامة بين مجموعات مثل الأولاد ضد البنات أو الأطفال ضد الكبار واكتشف أي فريق هو الأذكى. يمكنك الانضمام إلى مسابقات قائمة أو إنشاء مسابقة جديدة وكسب نقاط لفريقك من خلال ألعاب ممتعة.",
        },
        bestQuiz: {
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
            content: "درّب على قوائم كلمات بين لغات مختلفة وتعلّم معانيها بسهولة وفعالية. الأداة المثالية لتعلّم اللغات، تحسين المفردات، وتقوية الذاكرة.",
        },
        wordsTopic: {
            title: "ActivityWiz Words – تعلّم ودرّب مفرداتك",
            content: "درّب على قوائم كلمات بين لغات مختلفة وتعلّم معانيها بسهولة وفعالية. الأداة المثالية لتعلّم اللغات، تحسين المفردات، وتقوية الذاكرة.",
        },
        wordsQuiz: {
            title: "ActivityWiz Words – تعلّم ودرّب مفرداتك",
            content: "درّب على قوائم كلمات بين لغات مختلفة وتعلّم معانيها بسهولة وفعالية. الأداة المثالية لتعلّم اللغات، تحسين المفردات، وتقوية الذاكرة.",
        },
        wordsFaq: {
            title: "ActivityWiz Words – الأسئلة الشائعة حول المفردات",
            content: "درّب على قوائم كلمات بين لغات مختلفة وتعلّم معانيها بسهولة وفعالية. الأداة المثالية لتعلّم اللغات، تحسين المفردات، وتقوية الذاكرة.",
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
            title: "Actividades originales para eventos – ActivityWiz",
            content: "¿Buscas una idea divertida y original para tu evento? Crea una actividad personalizada con solo un clic, según la edad, el número de participantes, el lugar y el equipo disponible. Todo lo que necesitas para organizar una gran actividad, fácil y rápido.",
        },
        eventDetails: {
            title: "Actividades originales para eventos – ActivityWiz",
            content: "¿Buscas una idea divertida y original para tu evento? Crea una actividad personalizada con solo un clic, según la edad, el número de participantes, el lugar y el equipo disponible. Todo lo que necesitas para organizar una gran actividad, fácil y rápido.",
        },
        eventBuild: {
            title: "Actividades originales para eventos – ActivityWiz",
            content: "¿Buscas una idea divertida y original para tu evento? Crea una actividad personalizada con solo un clic, según la edad, el número de participantes, el lugar y el equipo disponible. Todo lo que necesitas para organizar una gran actividad, fácil y rápido.",
        },
        eventActivity: {
            title: "Actividades originales para eventos – ActivityWiz",
            content: "¿Buscas una idea divertida y original para tu evento? Crea una actividad personalizada con solo un clic, según la edad, el número de participantes, el lugar y el equipo disponible. Todo lo que necesitas para organizar una gran actividad, fácil y rápido.",
        },
        eventFaq: {
            title: "Actividades originales para eventos – ActivityWiz",
            content: "¿Buscas una idea divertida y original para tu evento? Crea una actividad personalizada con solo un clic, según la edad, el número de participantes, el lugar y el equipo disponible. Todo lo que necesitas para organizar una gran actividad, fácil y rápido.",
        },


        bestHome: {
            title: "ActivityWiz - ¿Quién es el más inteligente?",
            content: "Únete a competiciones de trivia entre grupos como chicos vs. chicas o niños vs. adultos y descubre qué equipo es el más inteligente. Puedes unirte a competiciones existentes o crear una nueva y ganar puntos para tu equipo a través de juegos divertidos.",
        },
        bestQuiz: {
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
            content: "Practica listas de palabras entre idiomas y aprende sus significados fácilmente. La herramienta perfecta para aprender idiomas, mejorar vocabulario y reforzar la memoria.",
        },
        wordsTopic: {
            title: "ActivityWiz Words – Practica Vocabulario",
            content: "Practica listas de palabras entre idiomas y aprende sus significados fácilmente. La herramienta perfecta para aprender idiomas, mejorar vocabulario y reforzar la memoria.",
        },
        wordsQuiz: {
            title: "ActivityWiz Words – Practica Vocabulario",
            content: "Practica listas de palabras entre idiomas y aprende sus significados fácilmente. La herramienta perfecta para aprender idiomas, mejorar vocabulario y reforzar la memoria.",
        },
        wordsFaq: {
            title: "ActivityWiz Words – Practica Vocabulario - Preguntas Frecuentes",
            content: "Practica listas de palabras entre idiomas y aprende sus significados fácilmente. La herramienta perfecta para aprender idiomas, mejorar vocabulario y reforzar la memoria.",
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

