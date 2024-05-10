import { Activity, ActivityPathName } from "./activity";
import { Movement } from "./movement";

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

export type UpdateActivityLikesRequest = {
    activity: Activity;
    likesAmount: number;
};

export type AddMovmentRequest = {
    name: string;
    path: string[];
};

export type GetMovmentsRequest = {};

export type CreateNewUserRequest = {
    id: string;
    limit: number;
    movement: Movement;
    isAcceptTerms: boolean;
    name: string;
    email: string;
    image: string;
};
