import axios from "axios";
import { DefualtPromptDetails, OpenAIUrl, openAiheaders } from "../models/constants/openAi";

const request = (prompt) => {
    const apiKey = process.env.REACT_APP_API_KEY;
    return {
        method: "post",
        url: OpenAIUrl,
        data: prompt,
        headers: openAiheaders(apiKey),
    };
};


// - - - - - - activity prompt section - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

const moreContnentPrompt = (activityDescription) => {
    return {
        ...DefualtPromptDetails(0.7),
        messages: [
            {
                role: "user",
                content: `Provide a detailed expansion of this activity: ${activityDescription}. Ensure comprehensive coverage of all aspects, including the name and the time of the activity, and any specific instructions or data mentioned in the activity. Reflect any direct content like names and times without alteration, but enrich the description with additional relevant details to enhance understanding. The response should be detailed and in Hebrew.`,
            },
        ],
    };
};

export async function getMoreContent(activityDescription) {
    const response = await axios(request(moreContnentPrompt(activityDescription)));
    const responseData = response.data.choices?.[0].message.content;
    return responseData;
}


// - - - - - - - - - - Point of View - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

const pointOfViewPrompt = (subject, time, amount, age, gender, place) => {
    return {
        ...DefualtPromptDetails(0.7),
        messages: [
            {
                role: "user",
                content: `אתה מדריך צופים המעביר פעילות לחניכיו בתנועת הנוער ואני רוצה שתיצור פעילות בשם 'פעילות נקודת מבט' על הנושא ${subject} שתימשך ${time}, מספר הילדים בפעילות הוא ${amount}, כיתתם היא ${age} ומינם הוא ${gender}. מקום הפעילות יהיה ב${place} .(וודא שאין שגיאות כתיב כלל) בתחילת התשובה כתוב את שם הפעילות ואת משך הזמן שלה. בכל חלק של הפעילות, ציין את הזמן הנדרש בדקות. וודא כיסוי מלא של כל ההיבטים והוראות מפורטות לפעילות. הבט לשקף תכנים ישירים כמו שמות וזמנים ללא שינוי, אך העשר את התיאור בפרטים רלוונטיים נוספים להבנה טובה יותר. אל תכלול מצגת או וידאו בפעילות. התשובה צריכה להיות מפורטת ובעברית בלבד.`,
            },
        ],
    };
}


export async function getPointOfView(subject, time, amount, age, gender, place) {
    const response = await axios(
        request(pointOfViewPrompt(subject, time, amount, age, gender, place)),
    );
    const responseData = response.data.choices?.[0].message.content;
    return responseData;
}


// - - - - - - - - - - Content activity - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

const contentActivityPrompt = (subject, time, amount, age, gender, place) => {
    return {
        ...DefualtPromptDetails(0.7),
        messages: [
            {
                role: "user",
                content: `אתה מדריך צופים המעביר פעילות לחניכיו בתנועת הנוער, ואני רוצה שתיצור פעילות בשם 'פעילות תוכן' בנושא ${subject} שתימשך ${time}, מספר הילדים בפעילות הוא ${amount}, שכבת הגיל שלהם היא: ${age} והמין שלהם הוא ${gender}. מקום הפעילות יהיה ${place}. (וודא שאין שגיאות כתיב )בתחילת התשובה תן שם לפעילות וציין את הזמן המיועד לה. בכל חלק מהפעילות, ציין את הזמן הנדרש בדקות. הקפד על כיסוי מלא של כל ההיבטים והוראות מפורטות לפעילות. השתדל לשקף תוכן ישיר כמו שמות וזמנים ללא שינוי, אך העשיר את התיאור בפרטים רלוונטיים נוספים להבנה מוגברת. אל תכלול מצגת או וידאו בפעילות שלך. התשובה צריכה להיות מפורטת ובעברית בלבד.`,
            },
        ],
    };
}


export async function getContentActivity(subject, time, amount, age, gender, place) {
    const response = await axios(
        request(contentActivityPrompt(subject, time, amount, age, gender, place)),
    );
    const responseData = response.data.choices?.[0].message.content;
    return responseData;
}


// - - - - - - - - - - Scouting time - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  - - - - - - - - - -  

const scoutingTimePrompt = (subject, time, amount, age, gender, place) => {
    return {
        ...DefualtPromptDetails(0.7),
        messages: [
            {
                role: "user",
                content: `אתה מדריך צופים שמעביר פעילות למתאמנים בתנועת נוער, ואני רוצה שתיצור פעילות בשם 'זמן צופים' על נושא ${subject} שתימשך ${time}, מספר הילדים בפעילות הוא ${amount}, הגילאים שלהם הם: ${age} ומינם הוא ${gender}. מקום הפעילות יהיה ב${place} .חשוב על שם מושך לפעילות. בתחילת התשובה כתוב את שם הפעילות והזמן שהיא תימשך. בכל חלק מהפעילות ציין את זמנו (בדקות). על הפעילות להתמקד בתרגול ולא בלימוד. הקפד על כיסוי מקיף של כל ההיבטים והוראות מפורטות לביצוע הפעילות. שקף תוכן ישיר כמו שמות וזמנים ללא שינוי, אך עשיר את התיאור בפרטים רלוונטיים נוספים להבנה מעמיקה יותר. אל תכלול מצגת או וידאו בפעילות שלך, בנוסף וודא שאין שימוש בכלים מסוכנים בפעילות. התשובה צריכה להיות מפורטת ובעברית בלבד(וודא שאין שגיאות כתיב)..`,
            },
        ],
    };
}


export async function getScoutingTime(subject, time, amount, age, gender, place) {
    const response = await axios(
        request(scoutingTimePrompt(subject, time, amount, age, gender, place)),
    );
    const responseData = response.data.choices?.[0].message.content;
    return responseData;
}


// - - - - - - - - - - playing Time - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

const playingTimePrompt = (subject, time, amount, age, gender, place) => {
    return {
        ...DefualtPromptDetails(0.7),
        messages: [
            {
                role: "user",
                content: `אתה מדריך חובב המעביר פעילות למתאמנים בתנועת נוער, ואני רוצה שתיצור פעילות "זמן משחק" הקשורה לנושא הזה: ${subject}, אך לא את אותה המשחק! הפעילות תימשך ${time}, מספר הילדים בפעילות הוא ${amount}, כיתתם היא: ${age} ומינם הוא ${gender}. מקום הפעילות יהיה ${place}. תחשוב על שם יפה למשחק. בתחילת התשובה כתוב את שם המשחק ואת הזמן (בדקות). בכל חלק של הפעילות, תוסיף את זמנו (בדקות). הקפד על כיסוי מקיף של כל ההיבטים, והוראות מפורטות לפעילות. השתדל לשמור על דיוק בכתיב ובשפה, מבלי להכליל הצגה או וידאו בתשובתך. התשובה צריכה להיות מפורטת ובעברית בלבד(וודא שאין שגיאות כתיב).`,
            },
        ],
    };
}

export async function getPlayingTime(subject, time, amount, age, gender, place) {
    const response = await axios(
        request(playingTimePrompt(subject, time, amount, age, gender, place)),
    );
    console.log('hello');
    
    const responseData = response.data.choices?.[0].message.content;
    return responseData;
}
