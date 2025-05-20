import { SessionKey } from "../models/enum/storage";
import { Movements } from "../models/resources/movment";
import { Lng } from "../models/types/common";
import Session from "./sessionStorage";

export const addSessionData = (lang: Lng, movement: string, grade: string, amount: string, gender: string) => {
    const data = {
        movement: Movements[lang][movement],
        grade: grade,
        amount: amount,
        gender: gender,
    };
    Session.set(SessionKey.DATA, data);
    return data;
};
