import { BlackList } from "../models/resources/blackList";
import { Lng } from "../models/types/common";

export const isInBlackList = (value: string, lang: Lng): boolean => {
    if (value.length > 4 || value !== "") {
        let isBlackListed = false;
        for (const name of BlackList[lang]) {
            if (value.includes(name)) {
                isBlackListed = true;
                break;
            }
        }
        return isBlackListed;
    }
    return false;
};
