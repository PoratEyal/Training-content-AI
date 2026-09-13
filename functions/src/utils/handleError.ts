import { GetActivityRequest } from "../model/types/request";
import { GetActivityResponse } from "../model/types/response";

/**
 * Handles any error that occurs while generating an activity.
 * Returns a flat message string with all relevant debug info.
 */
export const handleGetActivityErrors = (
  error: unknown,
  data: GetActivityRequest,
  userId: string,
): GetActivityResponse => {
  const errorMsg = error instanceof Error ? error.message : String(error);

  return {
    result: "error",
    message: `[handleGetActivityErrors] err: ${errorMsg} | user: ${userId} | subject: ${data.subject} | category: ${data.category} | time: ${data.time} | place: ${data.place} | religion: ${data.religion} | contest: ${data.contest} | tools: ${data.tools} | info: ${data.info}`
  };
};
