import { DocumentData } from "firebase-admin/firestore";
import { User } from "../model/types/user";

export const initUserFromDB = (id: string, data: DocumentData) => {
    return {
        id,
        name: data.name || "",
        email: data.email || "",
        image: data.image || "",
        limit: data.limit || 0,
        lastUpdate: data.lastUpdate || "",
        movement: data.movement || undefined,
        isAcceptTerms: data.isAcceptTerms || false,
    } as User;
};