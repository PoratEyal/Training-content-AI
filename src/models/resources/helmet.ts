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
            title: "ActivityWiz – צור קשר",
            content: "נשמח לשמוע מכם! אם יש לכם שאלה, הערה או בקשה – אנחנו כאן בשבילכם.",
        },
        privacyPolicy: {
            title: "ActivityWiz – מדיניות פרטיות",
            content: "קראו על מדיניות הפרטיות ותנאי השימוש באתר שלנו.",
        },

        home: {
            title: "ActivityWiz – פעולות לתנועות נוער",
            content: "מגוון פעולות מוכנות למדריכי נוער, לצד אפשרות ליצור פעולות מותאמות אישית בעזרת בינה מלאכותית (AI). מתאים לצופים, נוער עובד, בני עקיבא, השומר הצעיר, מד\"צים ועוד.",
        },
        details: {
            title: "ActivityWiz – פעולות לתנועות נוער",
            content: "מגוון פעולות מוכנות למדריכי נוער, לצד אפשרות ליצור פעולות מותאמות אישית בעזרת בינה מלאכותית (AI). מתאים לצופים, נוער עובד, בני עקיבא, השומר הצעיר, מד\"צים ועוד.",
        },
        build: {
            title: "ActivityWiz – פעולות לתנועות נוער",
            content: "מגוון פעולות מוכנות למדריכי נוער, לצד אפשרות ליצור פעולות מותאמות אישית בעזרת בינה מלאכותית (AI). מתאים לצופים, נוער עובד, בני עקיבא, השומר הצעיר, מד\"צים ועוד.",
        },
        activity: {
            title: "ActivityWiz – פעולות לתנועות נוער",
            content: "מגוון פעולות מוכנות למדריכי נוער, לצד אפשרות ליצור פעולות מותאמות אישית בעזרת בינה מלאכותית (AI). מתאים לצופים, נוער עובד, בני עקיבא, השומר הצעיר, מד\"צים ועוד.",
        },
        content: {
            title: "ActivityWiz – פעולות מוכנות לתנועות נוער",
            content: "מגוון פעולות מוכנות למדריכי נוער, לצד אפשרות ליצור פעולות מותאמות אישית בעזרת בינה מלאכותית (AI). מתאים לצופים, נוער עובד, בני עקיבא, השומר הצעיר, מד\"צים ועוד.",
        },
        contentActivities: {
            title: "ActivityWiz – פעולות מוכנות לתנועות נוער",
            content: "מגוון פעולות מוכנות למדריכי נוער, לצד אפשרות ליצור פעולות מותאמות אישית בעזרת בינה מלאכותית (AI). מתאים לצופים, נוער עובד, בני עקיבא, השומר הצעיר, מד\"צים ועוד.",
        },
        contentActivity: {
            title: "ActivityWiz – פעולות מוכנות לתנועות נוער",
            content: "מגוון פעולות מוכנות למדריכי נוער, לצד אפשרות ליצור פעולות מותאמות אישית בעזרת בינה מלאכותית (AI). מתאים לצופים, נוער עובד, בני עקיבא, השומר הצעיר, מד\"צים ועוד.",
        },
        myactivities: {
            title: "ActivityWiz – פעולות לתנועות נוער",
            content: "צפו ונהלו את הפעולות האישיות שלכם, כולל פעולות ששמרתם או יצרתם בעזרת AI.",
        },
        savedActivity: {
            title: "ActivityWiz – פעולות לתנועות נוער",
            content: "צפו בפעולות ששמרתם – מוכנות להפעלה או להמשך עריכה.",
        },
        popularActivities: {
            title: "ActivityWiz – פעולות פופולריות בתנועות נוער",
            content: "הכירו את הפעולות המובילות – חינוכיות, מהנות ומוכנות לשימוש מידי בקבוצות נוער.",
        },
        edit: {
            title: "ActivityWiz – פעולות לתנועות נוער",
            content: "ערכו פעולה קיימת או התאם אותה אישית לצרכים שלכם בעזרת כלים חכמים.",
        },
        youthFaq: {
            title: "ActivityWiz – שאלות נפוצות - פעולות לתנועות נוער",
            content: "תשובות לשאלות נפוצות על יצירה, שמירה ושיתוף של פעולות בתנועות נוער.",
        },

        practiceHome: {
            title: "ActivityWiz – תרגול עצמי חכם",
            content: "צרו תרגול מותאם אישית תוך שניות בעזרת בינה מלאכותית – בכל נושא שתבחרו.",
        },
        practiceTopic: {
            title: "ActivityWiz – תרגול עצמי חכם",
            content: "צרו תרגול מותאם אישית תוך שניות בעזרת בינה מלאכותית – בכל נושא שתבחרו.",
        },
        practiceQuiz: {
            title: "ActivityWiz – תרגול עצמי חכם",
            content: "צרו תרגול מותאם אישית תוך שניות בעזרת בינה מלאכותית – בכל נושא שתבחרו.",
        },
        practiceFaq: {
            title: "ActivityWiz – שאלות נפוצות - תרגול עצמי חכם",
            content: "צרו תרגול מותאם אישית תוך שניות בעזרת בינה מלאכותית – בכל נושא שתבחרו.",
        },

        wordsHome: {
            title: "ActivityWiz – לימוד ותרגול אוצר מילים",
            content: "תרגלו מילים וביטויים בין שפות ולמדו את משמעותם בקלות וביעילות. מתאים ללמידת שפות, חיזוק הזיכרון והעשרת אוצר המילים.",
        },
        wordsTopic: {
            title: "ActivityWiz – לימוד ותרגול אוצר מילים",
            content: "תרגלו מילים וביטויים בין שפות ולמדו את משמעותם בקלות וביעילות. מתאים ללמידת שפות, חיזוק הזיכרון והעשרת אוצר המילים.",
        },
        wordsVocab: {
            title: "ActivityWiz – לימוד ותרגול אוצר מילים",
            content: "תרגלו מילים וביטויים בין שפות ולמדו את משמעותם בקלות וביעילות. מתאים ללמידת שפות, חיזוק הזיכרון והעשרת אוצר המילים.",
        },
        wordsQuiz: {
            title: "ActivityWiz – לימוד ותרגול אוצר מילים",
            content: "תרגלו מילים וביטויים בין שפות ולמדו את משמעותם בקלות וביעילות. מתאים ללמידת שפות, חיזוק הזיכרון והעשרת אוצר המילים.",
        },
        wordsFaq: {
            title: "ActivityWiz – שאלות נפוצות - לימוד ותרגול אוצר מילים",
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
            content: "Create or explore youth movement activities with AI – ideal for Scouts, leadership programs, and educational guides.",
        },
        details: {
            title: "ActivityWiz - Youth Movement Activities",
            content: "Create or explore youth movement activities with AI – ideal for Scouts, leadership programs, and educational guides.",
        },
        build: {
            title: "ActivityWiz - Youth Movement Activities",
            content: "Create or explore youth movement activities with AI – ideal for Scouts, leadership programs, and educational guides.",
        },
        activity: {
            title: "ActivityWiz - Youth Movement Activities",
            content: "Create or explore youth movement activities with AI – ideal for Scouts, leadership programs, and educational guides.",
        },
        content: {
            title: "ActivityWiz - Youth Movement Activities",
            content: "Create or explore youth movement activities with AI – ideal for Scouts, leadership programs, and educational guides.",
        },
        contentActivities: {
            title: "ActivityWiz - Youth Movement Activities",
            content: "Create or explore youth movement activities with AI – ideal for Scouts, leadership programs, and educational guides.",
        },
        contentActivity: {
            title: "ActivityWiz - Youth Movement Activities",
            content: "Create or explore youth movement activities with AI – ideal for Scouts, leadership programs, and educational guides.",
        },
        myactivities: {
            title: "ActivityWiz - Youth Movement Activities",
            content: "Create or explore youth movement activities with AI – ideal for Scouts, leadership programs, and educational guides.",
        },
        savedActivity: {
            title: "ActivityWiz - Youth Movement Activities",
            content: "Create or explore youth movement activities with AI – ideal for Scouts, leadership programs, and educational guides.",
        },
        popularActivities: {
            title: "ActivityWiz - Youth Movement Activities",
            content: "Create or explore youth movement activities with AI – ideal for Scouts, leadership programs, and educational guides.",
        },
        edit: {
            title: "ActivityWiz - Youth Movement Activities",
            content: "Create or explore youth movement activities with AI – ideal for Scouts, leadership programs, and educational guides.",
        },
        youthFaq: {
            title: "ActivityWiz - Youth Movement Activities - FAQ",
            content: "Create or explore youth movement activities with AI – ideal for Scouts, leadership programs, and educational guides.",
        },

        practiceHome: {
            title: "ActivityWiz Practice – Instantly Create & Practice Any Topic with Smart AI",
            content: "Boost learning with smart AI – instantly create and solve personalized quizzes on any topic.",
        },
        practiceTopic: {
            title: "ActivityWiz Practice – Instantly Create & Practice Any Topic with Smart AI",
            content: "Boost learning with smart AI – instantly create and solve personalized quizzes on any topic.",
        },
        practiceQuiz: {
            title: "ActivityWiz Practice – Instantly Create & Practice Any Topic with Smart AI",
            content: "Boost learning with smart AI – instantly create and solve personalized quizzes on any topic.",
        },
        practiceFaq: {
            title: "ActivityWiz Practice – Instantly Create & Practice Any Topic with Smart AI - FAQ",
            content: "Boost learning with smart AI – instantly create and solve personalized quizzes on any topic.",
        },


        wordsHome: {
            title: "ActivityWiz Words – Learn & Practice Vocabulary",
            content: "Practice words between languages and learn their meaning easily. A smart tool for language learning, improving vocabulary, and strengthening memory.",
        },
        wordsTopic: {
            title: "ActivityWiz Words – Learn & Practice Vocabulary",
            content: "Practice words between languages and learn their meaning easily. A smart tool for language learning, improving vocabulary, and strengthening memory.",
        },
        wordsVocab: {
            title: "ActivityWiz Words – Learn & Practice Vocabulary",
            content: "Practice words between languages and learn their meaning easily. A smart tool for language learning, improving vocabulary, and strengthening memory.",
        },
        wordsQuiz: {
            title: "ActivityWiz Words – Learn & Practice Vocabulary",
            content: "Practice words between languages and learn their meaning easily. A smart tool for language learning, improving vocabulary, and strengthening memory.",
        },
        wordsFaq: {
            title: "ActivityWiz Words – Learn & Practice Vocabulary FAQ",
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
            content: "اكتشف أكثر الفعاليات شعبية للمجموعات الشبابية – تعليمية، ممتعة، وجاهزة للاستخدام.",
        },
        edit: {
            title: "ActivityWiz - فعاليات لحركات الشباب",
            content: "أنشئ أو استكشف فعاليات لحركات الشباب باستخدام الذكاء الاصطناعي. مثالي للكشافة، وبرامج القيادة، والمجموعات التعليمية.",
        },
        youthFaq: {
            title: "ActivityWiz - فعاليات لحركات الشباب - الأسئلة الشائعة",
            content: "أنشئ أو استكشف فعاليات لحركات الشباب باستخدام الذكاء الاصطناعي. مثالي للكشافة، وبرامج القيادة، والمجموعات التعليمية.",
        },

        practiceHome: {
            title: "ActivityWiz Practice – أنشئ وتدرّب على أي موضوع فورًا باستخدام الذكاء الاصطناعي",
            content: "عزّز تعلمك بالذكاء الاصطناعي – أنشئ واختبر تمارين شخصية لأي موضوع في ثوانٍ.",
        },
        practiceTopic: {
            title: "ActivityWiz Practice – أنشئ وتدرّب على أي موضوع فورًا باستخدام الذكاء الاصطناعي",
            content: "عزّز تعلمك بالذكاء الاصطناعي – أنشئ واختبر تمارين شخصية لأي موضوع في ثوانٍ.",
        },
        practiceQuiz: {
            title: "ActivityWiz Practice – أنشئ وتدرّب على أي موضوع فورًا باستخدام الذكاء الاصطناعي",
            content: "عزّز تعلمك بالذكاء الاصطناعي – أنشئ واختبر تمارين شخصية لأي موضوع في ثوانٍ.",
        },
        practiceFaq: {
            title: "ActivityWiz Practice – الأسئلة الشائعة",
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
        wordsVocab: {
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
            content: "Descubre las actividades más populares para grupos juveniles: educativas, divertidas y listas para usar.",
        },
        edit: {
            title: "ActivityWiz - Actividades para Movimientos Juveniles",
            content: "Crea o explora actividades para movimientos juveniles con IA. Ideal para Scouts, programas de liderazgo y grupos educativos.",
        },
        youthFaq: {
            title: "ActivityWiz - Actividades para Movimientos Juveniles - Preguntas Frecuentes",
            content: "Crea o explora actividades para movimientos juveniles con IA. Ideal para Scouts, programas de liderazgo y grupos educativos.",
        },

        practiceHome: {
            title: "ActivityWiz Practice – Crea y Practica Cualquier Tema al Instante con IA Inteligente",
            content: "Mejora tu aprendizaje con IA – crea y resuelve cuestionarios personalizados sobre cualquier tema en segundos.",
        },
        practiceTopic: {
            title: "ActivityWiz Practice – Crea y Practica Cualquier Tema al Instante con IA Inteligente",
            content: "Mejora tu aprendizaje con IA – crea y resuelve cuestionarios personalizados sobre cualquier tema en segundos.",
        },
        practiceQuiz: {
            title: "ActivityWiz Practice – Crea y Practica Cualquier Tema al Instante con IA Inteligente",
            content: "Mejora tu aprendizaje con IA – crea y resuelve cuestionarios personalizados sobre cualquier tema en segundos.",
        },
        practiceFaq: {
            title: "ActivityWiz Practice – Crea y Practica Cualquier Tema al Instante con IA Inteligente - Preguntas Frecuentes",
            content: "Mejora tu aprendizaje con IA – crea y resuelve cuestionarios personalizados sobre cualquier tema en segundos.",
        },

        wordsHome: {
            title: "ActivityWiz Words – Aprende y Practica Vocabulario",
            content: "Practica listas de palabras entre idiomas y aprende sus significados fácilmente. La herramienta perfecta para aprender idiomas, mejorar vocabulario y reforzar la memoria.",
        },
        wordsTopic: {
            title: "ActivityWiz Words – Aprende y Practica Vocabulario",
            content: "Practica listas de palabras entre idiomas y aprende sus significados fácilmente. La herramienta perfecta para aprender idiomas, mejorar vocabulario y reforzar la memoria.",
        },
        wordsVocab: {
            title: "ActivityWiz Words – Aprende y Practica Vocabulario",
            content: "Practica listas de palabras entre idiomas y aprende sus significados fácilmente. La herramienta perfecta para aprender idiomas, mejorar vocabulario y reforzar la memoria.",
        },
        wordsQuiz: {
            title: "ActivityWiz Words – Aprende y Practica Vocabulario",
            content: "Practica listas de palabras entre idiomas y aprende sus significados fácilmente. La herramienta perfecta para aprender idiomas, mejorar vocabulario y reforzar la memoria.",
        },
        wordsFaq: {
            title: "ActivityWiz Words – Aprende y Practica Vocabulario - Preguntas Frecuentes",
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

