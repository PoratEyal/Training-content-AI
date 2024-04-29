import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI('AIzaSyDr9kYIKHMTB1hDtnv3BkT599LKIv3u8H8');

export async function getGeminiAnswer() {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `אתה מדריך צופים המעביר פעילות לחניכיו בתנועת הנוער ואני רוצה שתיצור פעילות בשם 'פעילות נקודת מבט' על הנושא קבלת האחר והשונה שתימשך שעה, מספר הילדים בפעילות הוא 20-30, כיתתם היא ו ומינם הוא חניכים. מקום הפעילות יהיה בחוץ .(וודא שאין שגיאות כתיב כלל) בתחילת התשובה כתוב את שם הפעילות ואת משך הזמן שלה. בכל חלק של הפעילות, ציין את הזמן הנדרש בדקות. וודא כיסוי מלא של כל ההיבטים והוראות מפורטות לפעילות. הבט לשקף תכנים ישירים כמו שמות וזמנים ללא שינוי, אך העשר את התיאור בפרטים רלוונטיים נוספים להבנה טובה יותר. אל תכלול מצגת או וידאו בפעילות. התשובה צריכה להיות מפורטת ובעברית בלבד.`

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    console.log(text)
}