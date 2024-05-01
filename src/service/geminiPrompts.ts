import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY_2);

async function generateContent(prompt: string): Promise<string> {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    return text;
}

export async function getPointOfView(subject, time, amount, age, gender, place): Promise<string> {
    const prompt = `אתה מדריך צופים המעביר פעילות לחניכיו בתנועת הנוער ואני רוצה שתיצור פעילות בשם 'פעילות נקודת מבט' על הנושא ${subject} שתימשך ${time}, מספר הילדים בפעילות הוא ${amount}, כיתתם היא ${age} ומינם הוא ${gender}. מקום הפעילות יהיה ב${place} .(וודא שאין שגיאות כתיב כלל) בתחילת התשובה כתוב את שם הפעילות ואת משך הזמן שלה. בכל חלק של הפעילות, ציין את הזמן הנדרש בדקות. וודא כיסוי מלא של כל ההיבטים והוראות מפורטות לפעילות. תחזיר את התשובה בפורמט של markdown style הבט לשקף תכנים ישירים כמו שמות וזמנים ללא שינוי, אך העשר את התיאור בפרטים רלוונטיים נוספים להבנה טובה יותר. אל תכלול מצגת או וידאו בפעילות. התשובה צריכה להיות מפורטת ובעברית בלבד.`;
    return await generateContent(prompt);
}

export async function getContentActivity(subject, time, amount, age, gender, place): Promise<string> {
    const prompt = `אתה מדריך צופים המעביר פעילות לחניכיו בתנועת הנוער, ואני רוצה שתיצור פעילות בשם 'פעילות תוכן' בנושא ${subject} שתימשך ${time}, מספר הילדים בפעילות הוא ${amount}, שכבת הגיל שלהם היא: ${age} והמין שלהם הוא ${gender}. מקום הפעילות יהיה ${place}. (וודא שאין שגיאות כתיב )בתחילת התשובה תן שם לפעילות וציין את הזמן המיועד לה. בכל חלק מהפעילות, ציין את הזמן הנדרש בדקות. הקפד על כיסוי מלא של כל ההיבטים והוראות מפורטות לפעילות. התשובה צריכה להיות בפורמט של markdown style השתדל לשקף תוכן ישיר כמו שמות וזמנים ללא שינוי, אך העשיר את התיאור בפרטים רלוונטיים נוספים להבנה מוגברת. אל תכלול מצגת או וידאו בפעילות שלך. התשובה צריכה להיות מפורטת ובעברית בלבד.`;
    return await generateContent(prompt);
}

export async function getScoutingTime(subject, time, amount, age, gender, place): Promise<string> {
    const prompt = `אתה מדריך צופים שמעביר פעילות למתאמנים בתנועת נוער, ואני רוצה שתיצור פעילות בשם 'זמן צופים' על נושא ${subject} שתימשך ${time}, מספר הילדים בפעילות הוא ${amount}, הגילאים שלהם הם: ${age} ומינם הוא ${gender}. מקום הפעילות יהיה ב${place} .חשוב על שם מושך לפעילות. בתחילת התשובה כתוב את שם הפעילות והזמן שהיא תימשך. בכל חלק מהפעילות ציין את זמנו (בדקות). על הפעילות להתמקד בתרגול ולא בלימוד. הקפד על כיסוי מקיף של כל ההיבטים והוראות מפורטות לביצוע הפעילות. התשובה צריכה להיות בפורמט של markdown style שקף תוכן ישיר כמו שמות וזמנים ללא שינוי, אך עשיר את התיאור בפרטים רלוונטיים נוספים להבנה מעמיקה יותר. אל תכלול מצגת או וידאו בפעילות שלך, בנוסף וודא שאין שימוש בכלים מסוכנים בפעילות. התשובה צריכה להיות מפורטת ובעברית בלבד(וודא שאין שגיאות כתיב)..`;
    return await generateContent(prompt);
}

export async function getPlayingTime(subject, time, amount, age, gender, place): Promise<string> {
    const prompt = `אתה מדריך חובב המעביר פעילות למתאמנים בתנועת נוער, ואני רוצה שתיצור פעילות "זמן משחק" הקשורה לנושא הזה: ${subject}, אך לא את אותה המשחק! הפעילות תימשך ${time}, מספר הילדים בפעילות הוא ${amount}, כיתתם היא: ${age} ומינם הוא ${gender}. מקום הפעילות יהיה ${place}. תחשוב על שם יפה למשחק. בתחילת התשובה כתוב את שם המשחק ואת הזמן (בדקות). בכל חלק של הפעילות, תוסיף את זמנו (בדקות). הקפד על כיסוי מקיף של כל ההיבטים, והוראות מפורטות לפעילות. התשובה צריכה להיות בפורמט של markdown style השתדל לשמור על דיוק בכתיב ובשפה, מבלי להכליל הצגה או וידאו בתשובתך. התשובה צריכה להיות מפורטת ובעברית בלבד(וודא שאין שגיאות כתיב).`;
    return await generateContent(prompt);
}

export const GeminiFunctionsSet = {
    pointOfView: getPointOfView,
    contentActivity: getContentActivity,
    scoutingTime: getScoutingTime,
    playingTime: getPlayingTime,
};
