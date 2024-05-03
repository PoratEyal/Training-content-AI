import moment from "moment";

export const getUpdateAt = () => {
    const currentDate = moment();
    return currentDate.format("YYYY-MM-DD HH:mm:ss").toString();
};
