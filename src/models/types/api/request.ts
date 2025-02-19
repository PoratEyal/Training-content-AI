import { Activity } from "../activity";
import { CategoryName } from "../movement";
import { RawUser, User } from "../user";

export type GetActivityRequest = {
    movement: string;
    category: CategoryName;
    subject: string;
    time: string;
    amount: string;
    grade: string;
    gender: string;
    place: string;
    religion?: string;
    contest?: string;
    tools?: string;
    info?: string;
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

export type GetStaticActivityRequest = {
    contentName: string;
}

export type GetAllActivitiesRequest = {}
export type GetAllUsersRequest = {}