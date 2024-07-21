import { Activity, PartStructure } from "../activity";
import { RawUser, User } from "../user";

export type FetchFrom = "DB" | "AI";

export type GetActivityRequest = {
    fetchFrom: FetchFrom[];
    parts: PartStructure[];
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

export type CreateNewUserRequest = {
    rawUser: RawUser
};

export type UpdateUserRequest = {
    user: User;
};

export type GetAllActivitiesRequest = {}
export type GetAllUsersRequest = {}
