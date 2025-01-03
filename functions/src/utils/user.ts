import { DocumentData } from "firebase-admin/firestore";
import { DbUser, RawUser, User } from "../model/types/user";
import { getUpdateAt } from "./time";
import { UserMovementDetails } from "../model/types/movement";

export const initUserToDB = (user: RawUser) => {
    return {
        email: user.email,
        name: user.displayName,
        image: user.photoURL,
        limit: 0,
        lastUpdate: getUpdateAt(),
        movement: null,
        grade: null,
        gender: null,
        amount: null,
        place: null,
        isAcceptTerms: true,
    } as DbUser;
};

export const initUserFromDB = (id: string, data: DocumentData) => {
    try {
        let movement: UserMovementDetails | null = null;
        const { movement: m, grade, gender, amount } = data;

        if (m !== null && grade !== null && gender !== null && amount !== null) {
            movement = { movement: m, grade, gender, amount };
        }
        return {
            id,
            name: data.name || "",
            email: data.email || "",
            image: data.image || "",
            limit: data.limit || 0,
            movement: movement,
            lastUpdate: data.lastUpdate || "",
            isAcceptTerms: data.isAcceptTerms || false,
        } as User;
    } catch (error) {
        return {
            id,
            name: data.name || "",
            email: data.email || "",
            image: data.image || "",
            limit: data.limit || 0,
            movement: null,
            lastUpdate: data.lastUpdate || "",
            isAcceptTerms: data.isAcceptTerms || false,
        } as User;
    }
};

export const initUserFromReq = (id: string, data: DbUser) => {
    return {
        id,
        name: data.name || "",
        email: data.email || "",
        image: data.image || "",
        limit: data.limit || 0,
        movement: null,
        lastUpdate: data.lastUpdate || "",
        isAcceptTerms: data.isAcceptTerms || false,
    } as User;
};
