import { DocumentData } from "firebase-admin/firestore";
import { Movment } from "../model/types/movment";

export const initMovment = (name: string, path: string[]) => {
    return {
        name,
        path,
        isForPublish: false,
    } as Movment;
};

export const initMovmentFromDB = (id: string, data: DocumentData) => {
    return {
        id,
        name: data.name || "",
        path: data.path || [],
        isForPublish: data.isForPublish || true,
    } as Movment;
};
