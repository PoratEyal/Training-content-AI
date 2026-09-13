import moment from "moment";
import "moment-timezone";
import { Lang } from "../model/types/common";

export const getCurrentTime = (lang: Lang = "he") => {
    let timezone;
    switch (lang) {
        case "he":
            timezone = "Asia/Jerusalem";
            break;
        case "es":
            timezone = "Europe/Madrid";
            break;
        case "ar":
            timezone = "Asia/Riyadh";
            break;
        case "fr":
            timezone = "Europe/Paris";
            break;
        case "pt":
            timezone = "America/Sao_Paulo";
            break;
        default:
            timezone = "America/New_York";
    }

    const currentDate = moment().tz(timezone);
    return currentDate.format("YYYY-MM-DD HH:mm:ss").toString();
};
