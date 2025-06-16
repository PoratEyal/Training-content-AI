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
        לכל שאלה יהיו בדיוק 4 אפשרויות תשובה (א, ב, ג, ד).
        סמן את התשובה הנכונה באמצעות ** לפני ואחרי הטקסט של התשובה הנכונה.
        סמן כל שאלה עם ~ ומספרה, למשל: ~1~
        סמן כל תשובה עם ~ואות~, למשל: ~א~ עוף
        הקפד שכל 10 השאלות יהיו שונות זו מזו.
        הקפד שכל 4 התשובות בכל שאלה יהיו שונות זו מזו — אין לחזור על תשובות זהות.
        השתמש בשפה ברורה ונגישה שמתאימה לקהל רחב.
        !חובה שהתשובה שמסומנת כ-נכונה (עם **) תהיה נכונה עובדתית — אל תסמן תשובה שגויה.
        אל תמציא תשובות אם אינך בטוח.
        השב רק עם רשימת השאלות והתשובות – ללא הסברים נוספים.
        `;

    case "es":
      return `
        Eres un creador de contenido educativo.  
        Escribe 10 preguntas de opción múltiple sobre el tema: "${topic}".  
        Cada pregunta debe tener exactamente 4 opciones de respuesta (A, B, C, D).  
        Marca la respuesta correcta colocando ** antes y después del texto de la respuesta correcta.  
        Marca cada pregunta con ~ y su número, por ejemplo: ~1~  
        Marca cada respuesta con ~ y su letra, por ejemplo: ~A~ Gato  
        Asegúrate de que las 10 preguntas sean diferentes entre sí.  
        Asegúrate de que las 4 respuestas en cada pregunta sean únicas — sin respuestas repetidas.  
        Utiliza un lenguaje claro y accesible adecuado para un público amplio.  
        La respuesta marcada como correcta (con **) debe ser correcta y verificable — no marques una respuesta incorrecta!
        No inventes respuestas si no estás seguro. 
        Responde solo con la lista de preguntas y respuestas — sin explicaciones.`;

    case "ar":
      return `
        أنت منشئ محتوى تعليمي.  
        اكتب 10 أسئلة اختيار من متعدد حول الموضوع: "${topic}".  
        يجب أن يحتوي كل سؤال على 4 خيارات للإجابة بالضبط (أ، ب، ج، د).  
        حدد الإجابة الصحيحة بوضع ** قبل وبعد نص الإجابة الصحيحة.  
        ابدأ كل سؤال برمز ~ ورقمه، مثل: ~1~  
        ابدأ كل إجابة برمز ~ والحرف، مثل: ~أ~ قط  
        تأكد من أن جميع الأسئلة العشرة مختلفة عن بعضها البعض.  
        تأكد من أن الخيارات الأربعة في كل سؤال فريدة — لا تكرر أي إجابة.  
        استخدم لغة واضحة ومناسبة لجمهور واسع.  
        يجب أن تكون الإجابة التي تم تمييزها على أنها صحيحة (باستخدام **) صحيحة فعليًا — لا تحدد إجابة خاطئة!
        لا تخترع إجابات إذا لم تكن متأكدًا.  
        أجب فقط بقائمة الأسئلة والإجابات — دون أي شروحات.`;

    case "en":
    default:
      return `
        You are an educational content creator.  
        Write 10 multiple-choice questions on the topic: "${topic}".  
        Each question must have exactly 4 answer options (A, B, C, D).  
        Mark the correct answer by placing ** before and after the correct answer text.  
        Mark each question with ~ and its number, e.g.: ~1~  
        Mark each answer with ~ and its letter, e.g.: ~A~ Cat  
        Ensure that all 10 questions are different from each other.  
        Ensure that all 4 answers in each question are unique — no repeated answers.  
        Use clear and accessible language suitable for a wide audience.
        The answer marked as correct (with **) must be factually correct — do not mark a wrong answer!
        Do not invent answers if you are unsure.
        Reply with the list of questions and answers only — no explanations.`;
  }
};

export async function getSmartPracticeQuestions(subject: string, lang: Lang): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const prompt = getPromptByLang(subject, lang);
  const result = await model.generateContent(prompt);
  return result.response.text();
}
