import moment from "moment";
import "moment-timezone";
import { Lang } from "../model/types/common";

export const getCurrentTime = (lang: Lang = "he") => {
    const currentDate = moment().tz(lang == "he" ? "Asia/Jerusalem" : "America/New_York");    
    return currentDate.format("YYYY-MM-DD HH:mm:ss").toString();
};
