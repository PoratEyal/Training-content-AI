import { Activity, StaticActivities } from "./activity";
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
    religion?: string;
    contest?: string;
    tools?: string;
    info?: string;
};

export type SaveActivityRequest = {
    activity: Activity;
}

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

export type GetSavedActivitiesReqeust = {
    userId: string;
}

export type RemoveSavedActivityRequest = {
    activityId: string;
    userId: string;
}

export type IsActivitySavedRequest = {
    activityId: string;
    userId: string;
}

export type IncrementActivityRequest = {
    activity: StaticActivities;
}

export type GetStaticActivityRequest = {
    contentName: string;
}

export type GetAllActivitiesRequest = {}
export type GetAllUsersRequest = {}
