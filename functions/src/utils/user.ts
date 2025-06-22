import { DocumentData } from "firebase-admin/firestore";
import { DbUser, RawUser, User } from "../model/types/user";
import { getCurrentTime } from "./time";
import { UserMovementDetails } from "../model/types/movement";

export const initUserToDB = (user: RawUser) => {
    return {
        email: user.email,
        name: user.displayName,
        image: user.photoURL,
        limit: 0,
        lastUpdate: getCurrentTime(),
        createDate: getCurrentTime(),
        movement: null,
        grade: null,
        gender: null,
        amount: null,
        place: null,
        isAcceptTerms: true,
        isSendMsg: false,
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
            createDate: data.createDate || "",
            isAcceptTerms: data.isAcceptTerms || false,
            isSendMsg: data.isSendMsg || false,
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
            createDate: data.createDate || "",
            isAcceptTerms: data.isAcceptTerms || false,
            isSendMsg: data.isSendMsg || false,
        } as User;
    }
};

export const initUserFromReq = (id: string, data: DbUser) => {
    let movement: UserMovementDetails | null = null;

    if (data.movement !== null && data.grade !== null && data.gender !== null && data.amount !== null) {
        movement = {
            movement: data.movement,
            grade: data.grade,
            gender: data.gender,
            amount: data.amount,
        };
    }

    return {
        id,
        name: data.name || "",
        email: data.email || "",
        image: data.image || "",
        limit: data.limit || 0,
        movement: movement,
        lastUpdate: data.lastUpdate || "",
        createDate: data.createDate || "",
        isAcceptTerms: data.isAcceptTerms || false,
        isSendMsg: data.isSendMsg || false,
    } as User;
};

