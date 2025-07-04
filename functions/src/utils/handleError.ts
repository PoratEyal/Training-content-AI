import { GoogleGenerativeAIResponseError } from "@google/generative-ai";
import { initActivityFromAI } from "./activity";
import { GetActivityRequest } from "../model/types/request";
import { GetActivityResponse } from "../model/types/response";

/**
 * Handles errors from the Google Generative AI and returns a response in the appropriate language.
 * @param error - The error object received.
 * @param data - The original activity request data.
 * @param userId - The ID of the user.
 * @param lang - The language for the user-facing messages.
 * @returns A structured response for the client.
 */
export const handleGetActivityErrors = (
    error: unknown,
    data: GetActivityRequest,
    userId: string,
    lang: "he" | "en" | "es" | "ar" = "he",
): GetActivityResponse => {
    let message: string;
    let activityMessage: string;

    switch (lang) {
        case "he":
            message = "נכשל ניסיון לאחזר את הפעילות: המערכת חסמה את החיפוש עקב סיבות בטיחות.";
            activityMessage = "המערכת מצאה שהתוכן שהנכם מחפשים עלול להיות בעייתי ולכן חיפוש זה נחסם. אנו ממליצים לנסות שוב עם נושא פעולה אחר.";
            break;
        case "es":
            message = "No se pudo recuperar la actividad: la búsqueda fue bloqueada por razones de seguridad.";
            activityMessage = "El sistema detectó que el contenido solicitado podría ser problemático, por lo que la búsqueda fue bloqueada. Recomendamos intentar nuevamente con otro tema.";
            break;
        case "en":
            message = "Failed to retrieve activity: Generative AI blocked the candidate due to safety concerns.";
            activityMessage = "The system detected that the requested content might be problematic and therefore this search was blocked. We recommend trying again with a different topic.";
            break;
        case "ar":
            message = "فشل في استرجاع النشاط: النظام حظر البحث لأسباب تتعلق بالسلامة.";
            activityMessage = "اكتشف النظام أن المحتوى المطلوب قد يكون إشكاليًا، لذا تم حظر هذا البحث. نوصي بمحاولة البحث مرة أخرى بموضوع آخر.";
            break;
        default:
            message = "Failed to retrieve activity.";
            activityMessage = "The system detected that the requested content might be problematic and therefore this search was blocked. We recommend trying again with a different topic.";
    }

    if (
        error instanceof GoogleGenerativeAIResponseError &&
        error.message.includes("Candidate was blocked due to SAFETY")
    ) {
        const activity = initActivityFromAI(activityMessage, data, userId);
        return {
            result: "safety",
            activity,
            message,
        };
    }
    console.error("Failed to retrieve activity.", error);
    return { result: "error", message };
};
