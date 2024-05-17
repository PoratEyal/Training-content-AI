import { Movements } from "../models/resources/movment";
import Session from "./sessionStorage";

export const addSessionData = (movement, grade, amount, place, gender) => {
    const data = {
        movement: Movements[movement],
        grade: grade,
        amount: amount,
        place: place,
        gender: gender,
    };
    Session.set("data", data);
    return data;
}