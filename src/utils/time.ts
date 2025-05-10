import moment from "moment";
import "moment-timezone";
import { Lng } from "../models/types/common";

export const getCurrentTime = (lang: Lng) => {
    const currentDate = moment().tz(lang == "he" ? "Asia/Jerusalem" : "America/New_York");
    return currentDate.format("YYYY-MM-DD HH:mm:ss").toString();
};

export const oneDay = new Date(Date.now() + 1000 * 60 * 60 * 24);
export const tillEndOfDay = new Date(new Date().setHours(23, 59, 59, 999));
export const forLongTime = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30 * 6);

export const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

export const isMoreThanADayAfter = (givenTimeStr: string): boolean => {
    const givenDate = new Date(givenTimeStr);
    const currentDate = new Date();

    const timeDifference = currentDate.getTime() - givenDate.getTime();
    const dayDifference = timeDifference / (1000 * 60 * 60 * 24);

    return dayDifference >= 1;
};

export const isMoreThanTwoMinutesAgo = (givenTimeStr: string): boolean => {
    const givenDate = new Date(givenTimeStr);
    const currentDate = new Date();
    
    const timeDifference = currentDate.getTime() - givenDate.getTime();
    const minuteDifference = timeDifference / (1000 * 60);
    
    return minuteDifference > 2;
};

export const isValidDateFormat = (dateStr: string): boolean => {
    const givenDate = new Date(dateStr);
    return !isNaN(givenDate.getTime());
};
