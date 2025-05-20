import { SessionKey } from "../models/enum/storage";
import { Movements } from "../models/resources/movment";
import { Lng } from "../models/types/common";
import Session from "./sessionStorage";

export const addSessionData = (lang: Lng, movement: string, grade: string, amount: string, gender: string) => {
    // Normalize movement name to match keys (case-insensitive)
    const movementKey = Object.keys(Movements[lang]).find(
        key => key.toLowerCase() === movement.toLowerCase()
    );
    const movementObj = movementKey ? Movements[lang][movementKey] : null;
    if (!movementObj) {
        // שמור null כדי למנוע קריסה בהמשך
        const data = { movement: null, grade, amount, gender };
        Session.set(SessionKey.DATA, data);
        return data;
    }
    const data = {
        movement: movementObj,
        grade: grade,
        amount: amount,
        gender: gender,
    };
    Session.set(SessionKey.DATA, data);
    return data;
};
