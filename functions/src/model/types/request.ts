import { Activity } from "./activity";
import { RawUser, User } from "./user";

export type FetchFrom = "DB" | "AI";

export type GetActivityRequest = {
    fetchFrom: FetchFrom[];
    path: string;
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
    title: string;
};

export type GetMovmentsRequest = {};

export type CreateNewUserRequest = {
    rawUser: RawUser
};

export type GetUserByIdRequest = {
    id: string;
};

export type UpdateUserRequest = {
    user: User;
};
