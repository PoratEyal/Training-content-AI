import { GoogleGenerativeAI } from "@google/generative-ai";
import { ActivityDetails } from "../model/types/activity";
import { defineString } from "firebase-functions/params";

const genAI = new GoogleGenerativeAI(defineString("API_KEY").value() || "");

async function generateContent(prompt: string): Promise<string> {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    return text;
}

export async function getActivity(activityDetials: ActivityDetails): Promise<string> {
    const { subject, time, amount, grade, gender, place } = activityDetials;
    const prompt = `אתה מדריך צופים המעביר פעילות לחניכיו בתנועת הנוער, ואני רוצה שתיצור פעילות בנושא ${subject} שתימשך ${time}, מספר הילדים בפעילות הוא ${amount}, הגילאים שלהם הם: ${grade} והמין שלהם הוא ${gender}. מקום הפעילות יהיה ${place}. (וודא שאין שגיאות כתיב) בתחילת התשובה תן שם לפעילות וציין את הזמן המיועד לה. בכל חלק מהפעילות, ציין את הזמן הנדרש בדקות. השתדל לייצר פעילות שבה המדריך פחות מדבר וחניכים יותר פעילים. הקפד על כיסוי מלא של כל ההיבטים והוראות מפורטות לפעילות. התשובה צריכה להיות בפורמט של markdown style (תוודא שאתה לא מוסיף שפות אחרות). בנוסף, כלול הסברים מפורטים ומעמיקים על הנושא המרכזי של הפעילות, כך שהמדריך לא יצטרך לחפש מידע נוסף ממקורות אחרים. הסבר את התכנים של הפעילות בפירוט רב, כולל רקע היסטורי, עובדות מעניינות, ודוגמאות רלוונטיות. השתדל לשקף תוכן ישיר כמו שמות וזמנים ללא שינוי, אך העשיר את התיאור בפרטים רלוונטיים נוספים להבנה מוגברת. אל תכלול מצגת או וידאו בפעילות שלך. התשובה צריכה להיות מפורטת ובעברית בלבד.`;
    return await generateContent(prompt);
}

export async function getPointOfView(activityDetials: ActivityDetails): Promise<string> {
    const { subject, time, amount, grade, gender, place } = activityDetials;
    const prompt = `אתה מדריך צופים המעביר פעילות לחניכיו בתנועת הנוער ואני רוצה שתיצור פעילות בשם 'פעילות נקודת מבט' על הנושא ${subject} שתימשך ${time}, מספר הילדים בפעילות הוא ${amount}, הגילאים שלהם הם: ${grade} ומינם הוא ${gender}. מקום הפעילות יהיה ב${place}. (וודא שאין שגיאות כתיב כלל) בתחילת התשובה כתוב את שם הפעילות ואת משך הזמן שלה. בכל חלק של הפעילות, ציין את הזמן הנדרש בדקות. וודא כיסוי מלא של כל ההיבטים והוראות מפורטות לפעילות. תחזיר את התשובה בפורמט של markdown style (תוודא שאתה לא מוסיף שפות אחרות). הבט לשקף תכנים ישירים כמו שמות וזמנים ללא שינוי, אך העשר את התיאור בפרטים רלוונטיים נוספים להבנה טובה יותר. השתדל לייצר פעילות שבה המדריך פחות מדבר וחניכים יותר פעילים. בנוסף, כלול הסברים מפורטים ומעמיקים על הנושא המרכזי של הפעילות, כך שהמדריך לא יצטרך לחפש מידע נוסף ממקורות אחרים. הסבר את התכנים של הפעילות בפירוט רב, כולל רקע היסטורי, עובדות מעניינות ודוגמאות רלוונטיות. אל תכלול מצגת או וידאו בפעילות. התשובה צריכה להיות מפורטת ובעברית בלבד.`;
    return await generateContent(prompt);
}

export async function getContentActivity(activityDetials: ActivityDetails): Promise<string> {
    const { subject, time, amount, grade, gender, place } = activityDetials;
    const prompt = `אתה מדריך צופים המעביר פעילות לחניכיו בתנועת הנוער, ואני רוצה שתיצור פעילות בשם 'פעילות תוכן' בנושא ${subject} שתימשך ${time}, מספר הילדים בפעילות הוא ${amount}, הגילאים שלהם הם: ${grade} והמין שלהם הוא ${gender}. מקום הפעילות יהיה ${place}. (וודא שאין שגיאות כתיב) בתחילת התשובה תן שם לפעילות וציין את הזמן המיועד לה. בכל חלק מהפעילות, ציין את הזמן הנדרש בדקות. בנוסף, כלול הסברים מפורטים ומעמיקים על הנושא המרכזי של הפעילות, כך שהמדריך לא יצטרך לחפש מידע נוסף ממקורות אחרים. הסבר את התכנים של הפעילות בפירוט רב, כולל רקע היסטורי, עובדות מעניינות ודוגמאות רלוונטיות. הקפד על כיסוי מלא של כל ההיבטים והוראות מפורטות לפעילות. השתדל לייצר פעילות שבה המדריך פחות מדבר וחניכים יותר פעילים. התשובה צריכה להיות בפורמט של markdown style (תוודא שאתה לא מוסיף שפות אחרות). הבט לשקף תוכן ישיר כמו שמות וזמנים ללא שינוי, אך העשיר את התיאור בפרטים רלוונטיים נוספים להבנה מוגברת. אל תכלול מצגת או וידאו בפעילות שלך. התשובה צריכה להיות מפורטת ובעברית בלבד.`;
    return await generateContent(prompt);
}

export async function getScoutingTime(activityDetials: ActivityDetails): Promise<string> {
    const { subject, time, amount, grade, gender, place } = activityDetials;
    const prompt = `אתה מדריך צופים שמעביר פעילות למתאמנים בתנועת נוער, ואני רוצה שתיצור פעילות בשם 'זמן צופים' על נושא ${subject} שתימשך ${time}, מספר הילדים בפעילות הוא ${amount}, הגילאים שלהם הם: ${grade} ומינם הוא ${gender}. מקום הפעילות יהיה ב${place}. חשוב על שם מושך לפעילות. בתחילת התשובה כתוב את שם הפעילות והזמן שהיא תימשך. בכל חלק מהפעילות ציין את זמנו (בדקות). על הפעילות להתמקד בתרגול ולא בלימוד. הקפד על כיסוי מקיף של כל ההיבטים והוראות מפורטות לביצוע הפעילות. בנוסף, כלול הסברים מפורטים ומעמיקים על הנושא המרכזי של הפעילות, כך שהמדריך לא יצטרך לחפש מידע נוסף ממקורות אחרים. הסבר את התכנים של הפעילות בפירוט רב, כולל רקע היסטורי, עובדות מעניינות ודוגמאות רלוונטיות. התשובה צריכה להיות בפורמט של markdown style שקף תוכן ישיר כמו שמות וזמנים ללא שינוי, אך העשיר את התיאור בפרטים רלוונטיים נוספים להבנה מעמיקה יותר. אל תכלול מצגת או וידאו בפעילות שלך, בנוסף וודא שאין שימוש בכלים מסוכנים בפעילות. התשובה צריכה להיות מפורטת ובעברית בלבד. (וודא שאין שגיאות כתיב ושאתה לא מחזיר מילים בשפות אחרות!).`;
    return await generateContent(prompt);
}

export async function getPlayingTime(activityDetials: ActivityDetails): Promise<string> {
    const { subject, time, amount, grade, gender, place } = activityDetials;
    const prompt = `אתה מדריך חובב המעביר פעילות למתאמנים בתנועת נוער, ואני רוצה שתיצור פעילות "זמן משחק" הקשורה לנושא הזה: ${subject}, אך לא את אותה המשחק! הפעילות תימשך ${time}, מספר הילדים בפעילות הוא ${amount}, הגילאים שלהם הוא: ${grade} ומינם הוא ${gender}. מקום הפעילות יהיה ${place}. תחשוב על שם יפה למשחק. בתחילת התשובה כתוב את שם המשחק ואת הזמן (בדקות). בכל חלק של הפעילות, תוסיף את זמנו (בדקות). הקפד על כיסוי מקיף של כל ההיבטים, והוראות מפורטות לפעילות. התשובה צריכה להיות בפורמט של markdown style השתדל לשמור על דיוק בכתיב ובשפה, מבלי להכליל הצגה או וידאו בתשובתך. התשובה צריכה להיות מפורטת ובעברית בלבד(וודא שאין שגיאות כתיב ושאתה לא מחזיר מילים בשפות אחרות!).`;
    return await generateContent(prompt);
}

export const GeminiApiSet = {
    activity: getActivity,
    pointOfView: getPointOfView,
    contentActivity: getContentActivity,
    scoutingTime: getScoutingTime,
    playingTime: getPlayingTime,
};
