import { SessionKey } from "../models/enum/storage";
import { Movements } from "../models/resources/movment";
import Session from "./sessionStorage";

export const addSessionData = (movement, grade, amount, gender) => {
    const data = {
        movement: Movements[movement],
        grade: grade,
        amount: amount,
        gender: gender,
    };
    Session.set(SessionKey.DATA, data);
    return data;
};
