import { BlackList } from "../models/resources/he/blackList";

export const isInBlackList = (value: string): boolean => {
    if (value.length > 4 || value !== "") {
        let isBlackListed = false;
        for (const name of BlackList) {
            if (value.includes(name)) {
                isBlackListed = true;
                break;
            }
        }
        return isBlackListed;
    }
    return false;
};
