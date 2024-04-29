import moment from "moment";

export const getUpdateAt = () => {
    const currentDate = moment();
    return currentDate.format("YYYY-MM-DD HH:mm:ss").toString();
};

export const oneDay = new Date(Date.now() + 1000 * 60 * 60 * 24)
