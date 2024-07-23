import { Activity } from "./activity";
import { CategoryName } from "./movement";
import { RawUser, User } from "./user";

export type GetActivityRequest = {
    category: CategoryName;
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

export type FormatUserRequest = {
    ids: string[];
};

export type GetAllActivitiesRequest = {}
export type GetAllUsersRequest = {}
