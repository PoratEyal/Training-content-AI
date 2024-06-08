import { DocumentData } from "firebase-admin/firestore";
import { Movement } from "../model/types/movement";

export const initMovment = (name: string, title: string) => {
    return {
        name,
        title,
        parts: [],
    } as Movement;
};

export const initMovmentFromDB = (id: string, data: DocumentData) => {
    return {
        id,
        name: data.name || "",
        title: data.title || "",
        parts: data.parts || [],
    } as Movement;
};
