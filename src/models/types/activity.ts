import { PathName } from "./path";

export type Activity = {
    id: string;
    updatedAt: string;
    fetchCount: number;
    likes: number;
    path: PathName;
    grade: string;
    amount: string;
    place: string;
    gender: string;
    subject: string;
    time: string;
    activity: string;
};

export type RawActivity = {
    subject: string;
    time: string;
    amount: string;
    grade: string;
    gender: string;
    place: string;
};

export type ActivityFunc = (
    subject: string,
    time: string,
    amount: string,
    age: string,
    gender: string,
    place: string,
) => Promise<any>;
