import { SessionKey } from "../models/enums/session";
import { Movements } from "../models/resources/movment";
import Session from "./sessionStorage";

export const addSessionData = (movement, grade, amount, time, gender) => {
    const data = {
        movement: Movements[movement],
        grade: grade,
        amount: amount,
        time: time,
        gender: gender,
    };
    Session.set(SessionKey.DATA, data);
    return data;
}