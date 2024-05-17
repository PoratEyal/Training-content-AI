import { DocumentData } from "firebase-admin/firestore";
import { RawUser, User } from "../model/types/user";
import { getUpdateAt } from "./time";

export const initUser = (user: RawUser) => {
    return {
        id: user.uid,
        email: user.email,
        name: user.displayName,
        image: user.photoURL,
        limit: 0,
        lastUpdate: getUpdateAt(),
        movement: null,
        isAcceptTerms: true,
    } as User;
};

export const initUserFromDB = (id: string, data: DocumentData) => {
    return {
        id,
        name: data.name || "",
        email: data.email || "",
        image: data.image || "",
        limit: data.limit || 0,
        lastUpdate: data.lastUpdate || "",
        movement: data.movement || null,
        isAcceptTerms: data.isAcceptTerms || false,
    } as User;
};
