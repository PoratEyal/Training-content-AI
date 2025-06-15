import { GoogleGenerativeAI } from "@google/generative-ai";
import { defineString } from "firebase-functions/params";
import { Lang } from "../../model/types/common";

const genAI = new GoogleGenerativeAI(defineString("API_KEY").value() || "");

const getPromptByLang = (topic: string, lang: Lang): string => {

  switch (lang) {
    case "he":
      return `
        אתה יוצר תוכן חינוכי.
        כתוב 10 שאלות אמריקאיות בנושא: "${topic}".
        לכל שאלה יהיו 4 אפשרויות תשובה (א, ב, ג, ד).
        סמן את התשובה הנכונה באמצעות "**" משני צדיה (למשל: 1/2).
        ודא שכל ארבע האפשרויות שונות זו מזו – אין לחזור על תשובות זהות.
        השתמש בשפה ברורה ונגישה שמתאימה לקהל רחב.
        התחל כל שאלה במספר ונקודה (למשל: 1.).
        התחל כל אפשרות באות (א/ב/ג/ד) ואחריה נקודה ורווח (למשל: א. תשובה).
        השב רק עם רשימת השאלות והתשובות – ללא הסברים נוספים.`;

    case "es":
      return `
        Eres un creador de contenido educativo.
        Escribe 10 preguntas de opción múltiple sobre el tema: "${topic}".
        Cada pregunta debe tener 4 opciones de respuesta (A, B, C, D).
        Marca la respuesta correcta con "\*\*" a ambos lados (por ejemplo: **1/2**).
        Asegúrate de que las cuatro opciones sean diferentes entre sí – no se permiten respuestas repetidas.
        Usa un lenguaje claro y accesible para un público amplio.
        Empieza cada pregunta con un número y un punto (por ejemplo: 1.).
        Empieza cada opción con una letra (A/B/C/D), seguida de un punto y un espacio (por ejemplo: A. Respuesta).
        Responde solo con la lista de preguntas y respuestas – sin explicaciones adicionales.`;

    case "ar":
      return `
        أنت منشئ محتوى تعليمي.
        اكتب 10 أسئلة اختيار من متعدد حول الموضوع: "${topic}".
        يجب أن يحتوي كل سؤال على 4 خيارات للإجابة (أ، ب، ج، د).
        قم بتمييز الإجابة الصحيحة بوضع "**" على جانبيها (مثال: 1/2).
        تأكد من أن الخيارات الأربعة مختلفة تمامًا – لا يُسمح بتكرار الإجابات.
        استخدم لغة واضحة وسهلة تناسب جمهورًا واسعًا.
        ابدأ كل سؤال برقم ونقطة (مثال: 1.).
        ابدأ كل خيار بحرف (أ/ب/ج/د) متبوعًا بنقطة ومسافة (مثال: أ. إجابة).
        أجب فقط بقائمة الأسئلة والإجابات – بدون أي شروحات إضافية.`;

    case "en":
    default:
      return `
        You are an educational content creator.
        Write 10 multiple-choice questions on the topic: "${topic}".
        Each question should have 4 answer options (A, B, C, D).
        Mark the correct answer with "\*\*" on both sides (e.g., **1/2**).
        Make sure all four options are different – no repeated answers are allowed.
        Use clear and accessible language suitable for a wide audience.
        Start each question with a number and a period (e.g., 1.).
        Start each option with a letter (A/B/C/D), followed by a period and a space (e.g., A. Answer).
        Respond only with the list of questions and answers – no additional explanations.`;
  }
};

export async function getSmartPracticeQuestions(subject: string, lang: Lang): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const prompt = getPromptByLang(subject, lang);
  const result = await model.generateContent(prompt);
  return result.response.text();
}
