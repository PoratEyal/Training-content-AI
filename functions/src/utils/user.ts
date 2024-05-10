import { DocumentData } from "firebase-admin/firestore";
import { User } from "../model/types/user";

export const initUserFromDB = (id: string, data: DocumentData) => {
    return {
        id,
        name: data.name || "",
        email: data.email || "",
        image: data.image || "",
        role: data.role || "",
        movements: data.movements || undefined,
        isAcceptTerms: data.isAcceptTerms || false,
        limit: data.limit || 0,
    } as User;
};