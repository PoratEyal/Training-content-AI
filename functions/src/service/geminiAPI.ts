import { GoogleGenerativeAI } from "@google/generative-ai";
import { ActivityDetails } from "../model/types/activity";
import { defineString } from "firebase-functions/params";
import { ACTIVITY_S_PROMPT } from "../model/prompts/activity_smallKids";
import { ACTIVITY_M_PROMPT } from "../model/prompts/activity_kids";
import { ACTIVITY_B_PROMPT } from "../model/prompts/activity_bigKids";
import { PLAYING_M_PROMPT } from "../model/prompts/playing_kids";
import { SURVIVE_M_PROMPT } from "../model/prompts/survive_kids";
import { SURVIVE_S_PROMPT } from "../model/prompts/survive_smallKids";
import { VIEW_M_PROMPT } from "../model/prompts/view_kids";
import { VIEW_S_PROMPT } from "../model/prompts/view_smallKids";

const genAI = new GoogleGenerativeAI(defineString("API_KEY").value() || "");

async function generateContent(prompt: string): Promise<string> {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    return text;
}

function formatString(template: string, values: string[]): string {
    return template.replace(/{(\d+)}/g, (match, number) => {
        return typeof values[number] !== "undefined" ? values[number] : match;
    });
}

function promptPerGrade(grade: string, prompts: [string, string, string]): string {
    switch (grade) {
        case "כיתה א":
        case "כיתה ב":
        case "כיתה ג":
        case "כיתה ד":
            return prompts[0];
        case "כיתה ה":
        case "כיתה ו":
        case "כיתה ז":
        case "כיתה ח":
            return prompts[1];
        case "כיתה ט":
        case "כיתה י":
        case "כיתה יא":
        case "כיתה יב":
            return prompts[2];
    }
    return "";
}

export async function getActivity(activityDetials: ActivityDetails): Promise<string> {
    const { subject, time, amount, grade, gender, place } = activityDetials;

    const prompt = promptPerGrade(grade, [ACTIVITY_S_PROMPT, ACTIVITY_M_PROMPT, ACTIVITY_B_PROMPT]);
    const result = formatString(prompt, [subject, time, amount, grade, gender, place]);
    return await generateContent(result);
}

export async function getPointOfView(activityDetials: ActivityDetails): Promise<string> {
    const { subject, time, amount, grade, gender, place } = activityDetials;

    const prompt = promptPerGrade(grade, [VIEW_S_PROMPT, VIEW_M_PROMPT, VIEW_M_PROMPT]);
    const result = formatString(prompt, [subject, time, amount, grade, gender, place]);
    return await generateContent(result);
}

export async function getContentActivity(activityDetials: ActivityDetails): Promise<string> {
    const { subject, time, amount, grade, gender, place } = activityDetials;

    const prompt = promptPerGrade(grade, [ACTIVITY_S_PROMPT, ACTIVITY_M_PROMPT, ACTIVITY_B_PROMPT]);
    const result = formatString(prompt, [subject, time, amount, grade, gender, place]);
    return await generateContent(result);
}

export async function getScoutingTime(activityDetials: ActivityDetails): Promise<string> {
    const { subject, time, amount, grade, gender, place } = activityDetials;

    const prompt = promptPerGrade(grade, [SURVIVE_S_PROMPT, SURVIVE_M_PROMPT, SURVIVE_M_PROMPT]);
    const result = formatString(prompt, [subject, time, amount, grade, gender, place]);
    return await generateContent(result);
}

export async function getPlayingTime(activityDetials: ActivityDetails): Promise<string> {
    const { subject, time, amount, grade, gender, place } = activityDetials;

    const prompt = PLAYING_M_PROMPT;
    const result = formatString(prompt, [subject, time, amount, grade, gender, place]);
    return await generateContent(result);
}

export const GeminiApiSet = {
    activity: getActivity,
    pointOfView: getPointOfView,
    contentActivity: getContentActivity,
    scoutingTime: getScoutingTime,
    playingTime: getPlayingTime,
};




// --good one --
// const prompt = `
// - התנהג כמדריך בתנועת נוער שמעביר פעולה לחניכיו.
// אני רוצה שתיצר פעולה בנושא {0} באורך {1},
// לקבוצה של {2} ילדים קטנים בגילאים של {3} ממין {4}.
// מיקום הפעולה יהיה ב{5}.
// - מבנה הפעולה:
// + שם הפעולה
// + זמן הפעולה
// + 2 מטרות הקשורות לנושא
// + ציוד נדרש - ללא חומרי גלם יקרים, מצגת או וידאו
// + חלקי הפעולה + זמן נדרש לכל חלק
// ++ פתיחה קצרה
// ++ 1 - 2 חלקים עיקריים עם הוראות מפורטות והסברים שמשרתים את מטרות הפעולה,
// השתדל לייצר פעילות שבה המדריך פחות מדבר ויש יותר משחקים, חידונים, תחרות או יצירה.
// אל תכלול משחקים או פעולות מסוכנות או בעלי אופי אלים.
// ++ סיכום קצר
// - תוודא שאתה עובד לפי המבנה ואל תשנה אותו.
// - חשוב שתהיה התאמה של הפעילויות והמשחקים לגיל של הילדים!.
// - במקרה ויש דמויות, מקומות או אירועים בפעולה, כלול הסברים מפורטים כך שהמדריך לא יצטרך לחפש מידע נוסף ממקורות אחרים.
// - במקרה ויש חידונים או רשימות בפעילות, תכלול 3 דוגמאות.
// - התשובה צריכה להיות מפורטת ובעברית בלבד, וודא שאין שגיאות כתיב או מילים בשפות אחרות.
// - תחזיר לי את התשובה בפורמט של markdown style.
//     `;

// const prompt = `
// Behaved as a guide in a youth movement who delivered activities to campers.
// I want you to create an action on "{0}" of length "{1}",
// For a group of {2} kids aged {3} of gender "{4}".
// The location of the activity will be "{5}".
// - The activity structure:
// + activity name
// + time
// + 2 goals related to the subject
// + Prerequisites - no expensive materials, presentations or video
// + activity parts + time required for each part
// ++ Short opening
// ++ 1 - 2 main parts with detailed instructions and explanations that serve the purpose of the activity.
// Try to create an activity where the guide talks less and there are more games, quizzes, contests or creations.
// Do not include dangerous or violent games.
// ++ Short summary
// - Make sure you work according to the structure and don't change it.
// - It is important that the activities and games match the age of the children!
// - If there are characters, places or events in the activity, include detailed explanations so that the guide does not have to look for additional information from other sources.
// - In case there are quizzes or lists in the activity, include 3 examples.
// - The answer should be detailed and in Hebrew only, make sure there are no spelling errors or words in other languages.
// - Return the answer to me in markdown style format.
//     `;

// const prompt = `
// * התנהג כמדריך בתנועת נוער שמעביר פעולה לחניכיו.
// אני רוצה שתיצר פעולה בנושא {0} באורך {1},
// לקבוצה של {2} ילדים קטנים בגילאים של {3} ממין {4}.
// מיקום הפעולה יהיה ב{5}.
// * מבנה הפעולה:
// - שם הפעילות
// - זמן כולל
// - 2 מטרות
// - ציוד נדרש - ללא חומרי גלם יקרים, מצגת או וידאו
// - חלקי הפעילות - 2-3 חלקים, הכוללים פתיחה קצרה וסיכום קצר + זמן נדרש לכל חלק
// * תוודא שאתה עובד לפי המבנה ואל תשנה אותה.
// * השתדל לייצר פעילות שבה המדריך פחות מדבר ויש יותר משחקים, חידונים, תחרות או יצירה.
// * אל תכלול משחקים או פעולות מסוכנות או בעלי אופי אלים.
// * חשוב שתהיה התאמה של הפעולה לגילאי הילדים ולמטרות הפעולה!.
// * במקרה ויש דמויות, מקומות או אירועים בפעולה, כלול הסברים מפורטים כך שהמדריך לא יצטרך לחפש מידע נוסף ממקורות אחרים.
// * במקרה ויש חידונים או רשימות בפעילות, תכלול 3 דוגמאות.
// * התשובה צריכה להיות מפורטת ובעברית בלבד, וודא שאין שגיאות כתיב או מילים בשפות אחרות.
// * תחזיר לי את התשובה בפורמט של markdown style.
//     `;

// const prompt = `
// * אתה מדריך בתנועת נוער שמעביר פעילות לחניכיו.
// אני רוצה שתיצר פעילות בנושא {0} שתימשך {1},
// לקבוצה של {2} ילדים קטנים בגילאים של {3} ממין {4}.
// מיקום הפעילות יהיה ב{5}.
// *שבלונה של הפעילות:
// - שם הפעילות
// - זמן כולל
// - 2 מטרות הפעילות - הקפד על מסרים חיוביים
// - חומרים נדרשים - ללא חומרי גלם יקרים, מצגת או וידאו
// - חלקי הפעילות - 2-3 חלקים, הכוללים פתיחה קצרה וסיכום קצר + זמן נדרש לכל חלק
// תוודא שאתה עובד לפי השבלונה ואל תשנה אותה.
// * השתדל לייצר פעילות שבה המדריך פחות מדבר ויש יותר משחקים, חידונים, תחרות או יצירה.
// * אל תכלול משחקים או פעולות מסוכנות או בעלי אופי אלים.
// * ודא התאמה של הפעילות לגילאי הילדים ולרמתם.
// * במקרה ויש דמויות, מקומות או אירועים בפעילות, כלול הסברים מפורטים כך שהמדריך לא יצטרך לחפש מידע נוסף ממקורות אחרים.
// * במקרה ויש חידונים או רשימות בפעילות, תכלול 3 דוגמאות.
// * בכל חלק של הפעילות, הקפד על כיסוי מלא של כל ההיבטים והוראות מפורטות.
// * השתדל לשקף תוכן ישיר כמו שמות וזמנים ללא שינוי, אך העשיר את התיאור בפרטים רלוונטיים נוספים להבנה מוגברת.
// * התשובה צריכה להיות מפורטת ובעברית בלבד, וודא שאין שגיאות כתיב או מילים בשפות אחרות.
// * תחזיר לי את התשובה בפורמט של markdown style.
//     `;

//     const prompt = `
// אתה מדריך בתנועת נוער שמעביר פעילות לחניכיו.
// אני רוצה שתיצר פעילות בנושא {0} שתימשך {1},
// לקבוצה של {2} ילדים קטנים בגילאים של {3} ממין {4}.
// מיקום הפעילות יהיה ב{5}.
// שבלונה של הפעילות:
// -- שם הפעילות
// -- זמן כולל
// -- 2 מטרות הפעילות - הקפד על מסרים חיוביים
// -- חומרים נדרשים - ללא חומרי גלם יקרים ואל תכלול מצגת או וידאו
// -- חלקי הפעילות - 2-3 חלקים, הכוללים פתיחה קצרה וסיכום קצר + זמן נדרש לכל חלק
// תוודא שאתה עובד לפי השבלונה ואל תשנה אותה.
// חשוב שהרעיונות יהיו מקוריים ויצירתיים, השתדל לייצר פעילות שבה המדריך פחות מדבר ויש יותר משחקים, חידונים, תחרות או יצירה.
// אל תכלול משחקים או פעולות מסוכנות או בעל אופי אלים.
// ודא התאמה של הפעילות לגילאי הילדים ולרמתם.
// במקרה ויש דמויות, מקומות או אירועים בפעילות, כלול הסברים מפורטים כך שהמדריך לא יצטרך לחפש מידע נוסף ממקורות אחרים.
// במקרה ויש חידונים או רשימות בפעילות, תכלול 3 דוגמאות.
// בכל חלק של הפעילות, הקפד על כיסוי מלא של כל ההיבטים והוראות מפורטות.
// השתדל לשקף תוכן ישיר כמו שמות וזמנים ללא שינוי, אך העשיר את התיאור בפרטים רלוונטיים נוספים להבנה מוגברת.
// התשובה צריכה להיות מפורטת ובעברית בלבד, וודא שאין שגיאות כתיב או מילים בשפות אחרות.
// תחזיר לי את התשובה בפורמט של markdown style.
//     `;

// const prompt = `אתה מדריך צופים המעביר פעילות לחניכיו בתנועת הנוער, ואני רוצה שתיצור פעילות בשם 'פעילות תוכן' בנושא ${subject} שתימשך ${time}, מספר הילדים בפעילות הוא ${amount}, הגילאים שלהם הם: ${grade} והמין שלהם הוא ${gender}. מקום הפעילות יהיה ${place}. (וודא שאין שגיאות כתיב) בתחילת התשובה תן שם לפעילות וציין את הזמן המיועד לה. בכל חלק מהפעילות, ציין את הזמן הנדרש בדקות. בנוסף, כלול הסברים מפורטים ומעמיקים על הנושא המרכזי של הפעילות, כך שהמדריך לא יצטרך לחפש מידע נוסף ממקורות אחרים. הסבר את התכנים של הפעילות בפירוט רב, כולל רקע היסטורי, עובדות מעניינות ודוגמאות רלוונטיות. הקפד על כיסוי מלא של כל ההיבטים והוראות מפורטות לפעילות. השתדל לייצר פעילות שבה המדריך פחות מדבר וחניכים יותר פעילים. התשובה צריכה להיות בפורמט של markdown style (תוודא שאתה לא מוסיף שפות אחרות). הבט לשקף תוכן ישיר כמו שמות וזמנים ללא שינוי, אך העשיר את התיאור בפרטים רלוונטיים נוספים להבנה מוגברת. אל תכלול מצגת או וידאו בפעילות שלך. התשובה צריכה להיות מפורטת ובעברית בלבד.`;
// const prompt = `אתה מדריך צופים שמעביר פעילות למתאמנים בתנועת נוער, ואני רוצה שתיצור פעילות בשם 'זמן צופים' על נושא ${subject} שתימשך ${time}, מספר הילדים בפעילות הוא ${amount}, הגילאים שלהם הם: ${grade} ומינם הוא ${gender}. מקום הפעילות יהיה ב${place}. חשוב על שם מושך לפעילות. בתחילת התשובה כתוב את שם הפעילות והזמן שהיא תימשך. בכל חלק מהפעילות ציין את זמנו (בדקות). על הפעילות להתמקד בתרגול ולא בלימוד. הקפד על כיסוי מקיף של כל ההיבטים והוראות מפורטות לביצוע הפעילות. בנוסף, כלול הסברים מפורטים ומעמיקים על הנושא המרכזי של הפעילות, כך שהמדריך לא יצטרך לחפש מידע נוסף ממקורות אחרים. הסבר את התכנים של הפעילות בפירוט רב, כולל רקע היסטורי, עובדות מעניינות ודוגמאות רלוונטיות. התשובה צריכה להיות בפורמט של markdown style שקף תוכן ישיר כמו שמות וזמנים ללא שינוי, אך העשיר את התיאור בפרטים רלוונטיים נוספים להבנה מעמיקה יותר. אל תכלול מצגת או וידאו בפעילות שלך, בנוסף וודא שאין שימוש בכלים מסוכנים בפעילות. התשובה צריכה להיות מפורטת ובעברית בלבד. (וודא שאין שגיאות כתיב ושאתה לא מחזיר מילים בשפות אחרות!).`;

//     const prompt = `
// אתה מדריך צופים המעביר פעילות לחניכיו בתנועת הנוער,
// אני רוצה שתיצור פעילות בנושא {0} שתימשך {1},
// מספר הילדים בפעילות הוא {2},
// הגילאים שלהם הם: {3} והמין שלהם הוא {4}.
// מקום הפעילות יהיה {5}.
// בתחילת התשובה תן שם לפעילות וציין את הזמן המיועד לה.
// בכל חלק מהפעילות, ציין את הזמן הנדרש בדקות.
// השתדל לייצר פעילות שבה המדריך פחות מדבר וחניכים יותר פעילים.
// הקפד על כיסוי מלא של כל ההיבטים והוראות מפורטות לפעילות.
// התשובה צריכה להיות בפורמט של markdown style.
// בנוסף, כלול הסברים מפורטים ומעמיקים על הנושא המרכזי של הפעילות, כך שהמדריך לא יצטרך לחפש מידע נוסף ממקורות אחרים.
// הסבר את התכנים של הפעילות בפירוט רב, כולל רקע היסטורי, עובדות מעניינות, ודוגמאות רלוונטיות.
// השתדל לשקף תוכן ישיר כמו שמות וזמנים ללא שינוי, אך העשיר את התיאור בפרטים רלוונטיים נוספים להבנה מוגברת.
// אל תכלול מצגת או וידאו בפעילות שלך.
// התשובה צריכה להיות מפורטת ובעברית בלבד
// (וודא שאין שגיאות כתיב ושאתה לא מחזיר מילים בשפות אחרות!).
// `;
