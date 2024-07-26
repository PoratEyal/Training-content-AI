import { UserMovementDetails } from "./movement";

export type User = {
    id: string;
    name: string;
    email: string;
    image: string;
    limit: number;
    lastUpdate: string;
    movement: UserMovementDetails | null;
    isAcceptTerms: boolean;
};

export type DbUser = {
    name: string;
    email: string;
    image: string;
    limit: number;
    lastUpdate: string;
    movement: string | null; //the en name
    grade: string | null;
    gender: string | null;
    amount: string | null;
    isAcceptTerms: boolean;
};

export type RawUser = {
    uid: string;
    accessToken: string;
    displayName: string;
    email: string;
    phoneNumber: string;
    photoURL: string;
}