import moment from "moment";

export const getUpdateAt = () => {
    const currentDate = moment();
    return currentDate.format("YYYY-MM-DD HH:mm:ss").toString();
};

export const oneDay = new Date(Date.now() + 1000 * 60 * 60 * 24);
export const tillEndOfDay = new Date(new Date().setHours(23, 59, 59, 999));
export const forLongTime = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30 * 6);

export const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
