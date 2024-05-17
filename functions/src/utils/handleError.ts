import { GoogleGenerativeAIResponseError } from "@google/generative-ai";
import { initActivityFromAI } from "./activity";
import { GetActivityRequest } from "../model/types/request";
import { GetActivityResponse } from "../model/types/response";

export const handleGetActivityErrors = (
    error: unknown,
    data: GetActivityRequest,
    userId: string,
): GetActivityResponse => {
    if (
        error instanceof GoogleGenerativeAIResponseError &&
        error.message.includes("Candidate was blocked due to SAFETY")
    ) {
        const activity = initActivityFromAI(
            `המערכת מצאה שהתוכן שהנכם מחפשים עלול להיות בעייתי ולכן חיפוש זה נחסם. אנו ממליצים לנסות שוב עם נושא פעולה אחר.`,
            data,
            userId,
        );
        return {
            result: "safety",
            activity,
            message:
                "Failed to retrieve activity: Google Generative AI blocked the candidate due to safety concerns.",
        };
    }
    console.error("Failed to retrieve activity.", error);
    return { result: "error", message: "Failed to retrieve activity." };
};
