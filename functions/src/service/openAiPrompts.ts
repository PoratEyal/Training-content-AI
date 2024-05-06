import axios from "axios";
// -- NOT IN USE -- //

export const OpenAIUrl = "https://api.openai.com/v1/chat/completions";

export const openAiheaders = (apiKey: any) => {
    return {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
    };
};

export const DefualtPromptDetails = (temperature = 0.7) => {
    return { model: "gpt-3.5-turbo", temperature };
};

const request = (prompt: any) => {
    const apiKey = process.env.REACT_APP_API_KEY || "";
    return {
        method: "post",
        url: OpenAIUrl,
        data: prompt,
        headers: openAiheaders(apiKey),
    };
};

// - - - - - - - - - - Point of View - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const pointOfViewPrompt = (
    subject: string,
    time: string,
    amount: string,
    age: string,
    gender: string,
    place: string,
) => {
    return {
        ...DefualtPromptDetails(0.7),
        messages: [
            {
                role: "user",
                content: `אתה מדריך צופים המעביר פעילות לחניכיו בתנועת הנוער ואני רוצה שתיצור פעילות בשם 'פעילות נקודת מבט' על הנושא ${subject} שתימשך ${time}, מספר הילדים בפעילות הוא ${amount}, כיתתם היא ${age} ומינם הוא ${gender}. מקום הפעילות יהיה ב${place} .(וודא שאין שגיאות כתיב כלל) בתחילת התשובה כתוב את שם הפעילות וציין את הזמן המיועד לה. בכל חלק של הפעילות, ציין את הזמן הנדרש בדקות. וודא כיסוי מלא של כל ההיבטים והוראות מפורטות לפעילות. הבט לשקף תכנים ישירים כמו שמות וזמנים ללא שינוי, אך העשר את התיאור בפרטים רלוונטיים נוספים להבנה טובה יותר. המדינה שאנחנו נמצאים בה היא ישראל. אל תכלול מצגת או וידאו בפעילות. התשובה צריכה להיות מפורטת ובעברית בלבד (ללא אנגלית וללא ערבית).`,
            },
        ],
    };
};

export async function getPointOfView(
    subject: string,
    time: string,
    amount: string,
    age: string,
    gender: string,
    place: string,
) {
    const response = await axios(
        request(pointOfViewPrompt(subject, time, amount, age, gender, place)),
    );
    const responseData = response.data.choices?.[0].message.content;
    return responseData;
}

// - - - - - - - - - - Content activity - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const contentActivityPrompt = (
    subject: string,
    time: string,
    amount: string,
    age: string,
    gender: string,
    place: string,
) => {
    return {
        ...DefualtPromptDetails(0.7),
        messages: [
            {
                role: "user",
                content: `אתה מדריך צופים המעביר פעילות לחניכיו בתנועת הנוער, ואני רוצה שתיצור פעילות בשם 'פעילות תוכן' בנושא ${subject} שתימשך ${time}, מספר הילדים בפעילות הוא ${amount}, שכבת הגיל שלהם היא: ${age} והמין שלהם הוא ${gender}. מקום הפעילות יהיה ${place}. (וודא שאין שגיאות כתיב )בתחילת התשובה תן שם לפעילות וציין את הזמן המיועד לה. בכל חלק מהפעילות, ציין את הזמן הנדרש בדקות. הקפד על כיסוי מלא של כל ההיבטים והוראות מפורטות לפעילות. השתדל לשקף תוכן ישיר כמו שמות וזמנים ללא שינוי, אך העשיר את התיאור בפרטים רלוונטיים נוספים להבנה מוגברת. המדינה שאנחנו נמצאים בה היא ישראל. אל תכלול מצגת או וידאו בפעילות שלך. התשובה צריכה להיות מפורטת ובעברית בלבד (ללא אנגלית וללא ערבית).`,
            },
        ],
    };
};

export async function getContentActivity(
    subject: string,
    time: string,
    amount: string,
    age: string,
    gender: string,
    place: string,
) {
    const response = await axios(
        request(contentActivityPrompt(subject, time, amount, age, gender, place)),
    );
    const responseData = response.data.choices?.[0].message.content;
    return responseData;
}

// - - - - - - - - - - Scouting time - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  - - - - - - - - - -

const scoutingTimePrompt = (
    subject: string,
    time: string,
    amount: string,
    age: string,
    gender: string,
    place: string,
) => {
    return {
        ...DefualtPromptDetails(0.7),
        messages: [
            {
                role: "user",
                content: `אתה מדריך צופים שמעביר פעילות למתאמנים בתנועת נוער, ואני רוצה שתיצור פעילות בשם 'זמן צופים' על נושא ${subject} שתימשך ${time}, מספר הילדים בפעילות הוא ${amount}, הגילאים שלהם הם: ${age} ומינם הוא ${gender}. מקום הפעילות יהיה ב${place} .חשוב על שם מושך לפעילות. בתחילת התשובה כתוב את שם הפעילות והזמן שהיא תימשך. בכל חלק מהפעילות ציין את זמנו (בדקות). על הפעילות להתמקד בתרגול ולא בלימוד. הקפד על כיסוי מקיף של כל ההיבטים והוראות מפורטות לביצוע הפעילות. שקף תוכן ישיר כמו שמות וזמנים ללא שינוי, אך עשיר את התיאור בפרטים רלוונטיים נוספים להבנה מעמיקה יותר. אל תכלול מצגת או וידאו בפעילות שלך, בנוסף וודא שאין שימוש בכלים מסוכנים בפעילות. התשובה צריכה להיות מפורטת ובעברית בלבד (ללא אנגלית וללא ערבית), (וודא שאין שגיאות כתיב כלל)..`,
            },
        ],
    };
};

export async function getScoutingTime(
    subject: string,
    time: string,
    amount: string,
    age: string,
    gender: string,
    place: string,
) {
    const response = await axios(
        request(scoutingTimePrompt(subject, time, amount, age, gender, place)),
    );
    const responseData = response.data.choices?.[0].message.content;
    return responseData;
}

// - - - - - - - - - - playing Time - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const playingTimePrompt = (
    subject: string,
    time: string,
    amount: string,
    age: string,
    gender: string,
    place: string,
) => {
    return {
        ...DefualtPromptDetails(0.7),
        messages: [
            {
                role: "user",
                content: `אתה מדריך חובב המעביר פעילות למתאמנים בתנועת נוער, ואני רוצה שתיצור פעילות "זמן משחק" הקשורה לנושא הזה: ${subject}, אך לא את אותה המשחק! הפעילות תימשך ${time}, מספר הילדים בפעילות הוא ${amount}, כיתתם היא: ${age} ומינם הוא ${gender}. מקום הפעילות יהיה ${place}. תחשוב על שם יפה למשחק. בתחילת התשובה כתוב את שם המשחק ואת הזמן (בדקות). בכל חלק של הפעילות, תוסיף את זמנו (בדקות). הקפד על כיסוי מקיף של כל ההיבטים, והוראות מפורטות לפעילות. השתדל לשמור על דיוק בכתיב ובשפה, מבלי להכליל הצגה או וידאו בתשובתך. התשובה צריכה להיות מפורטת ובעברית בלבד (ללא אנגלית וללא ערבית), (וודא שאין שגיאות כתיב).`,
            },
        ],
    };
};

export async function getPlayingTime(
    subject: string,
    time: string,
    amount: string,
    age: string,
    gender: string,
    place: string,
) {
    const response = await axios(
        request(playingTimePrompt(subject, time, amount, age, gender, place)),
    );
    console.log("hello");

    const responseData = response.data.choices?.[0].message.content;
    return responseData;
}
