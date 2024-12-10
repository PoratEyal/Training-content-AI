import { Activity } from "../activity";
import { CategoryName } from "../movement";
import { RawUser, User } from "../user";

export type FetchFrom = "DB" | "AI";

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

export type CreateNewUserRequest = {
    rawUser: RawUser
};

export type UpdateUserRequest = {
    user: User;
};

export type RemoveActivityRequest = {
    userId: string;
    activityId: string;
}

export type GetAllActivitiesRequest = {}
export type GetAllUsersRequest = {}
