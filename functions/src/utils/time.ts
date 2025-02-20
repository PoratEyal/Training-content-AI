import moment from "moment";
import "moment-timezone";

export const getCurrentTime = () => {
    const currentDate = moment().tz("Asia/Jerusalem");
    return currentDate.format("YYYY-MM-DD HH:mm:ss").toString();
};
