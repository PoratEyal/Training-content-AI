import { DocumentData } from "firebase-admin/firestore";
import { Movement } from "../model/types/movement";

export const initMovment = (name: string, path: string[]) => {
    return {
        name,
        path,
        isForPublish: false,
    } as Movement;
};

export const initMovmentFromDB = (id: string, data: DocumentData) => {
    return {
        id,
        name: data.name || "",
        path: data.path || [],
        isForPublish: data.isForPublish || true,
    } as Movement;
};
