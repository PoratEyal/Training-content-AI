import { ActivityPathName } from "../activity";

export type FetchFrom = "DB" | "AI";

export type GetActivityRequest = {
    fetchFrom: FetchFrom[];
    path: ActivityPathName;
    subject: string;
    time: string;
    amount: string;
    grade: string;
    gender: string;
    place: string;
};
