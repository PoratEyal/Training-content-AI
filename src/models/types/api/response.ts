import { Activity, StaticActivities, StaticSubjects } from "../activity";
import { User } from "../user";

export type Resposne = "success" | "notFound" | "safety" | "error"

export type GetActivityResponse = {
    result: Resposne;
    activity?: Activity;
    message?: string;
};

export type UpdateActivityLikesResponse = {
    result: Resposne;
    activity?: Activity;
    message?: string;
};

export type CreateNewUserResponse = {
    result: Resposne;
    user?: User;
    message?: string;
};

export type UpdateUserResponse = {
    result: Resposne;
    user?: User;
    message?: string;
};

export type getAllActivitiesResponse = {
    result: Resposne;
    activities?: any;
    message?: string;
};

export type getAllUsersResponse = {
    result: Resposne;
    users?: any;
    message?: string;
};

export type getSavedActivitiesResponse = {
    result: Resposne;
    activities?: Activity[];
    message?: string;
}

export type saveActivityResponse = {
    result: Resposne;
    activity?: Activity;
    message?: string;
}

export type removeActivityResponse = {
    result: Resposne;
    message?: string;
}

export type staticSubjectsResponse = {
    result: Resposne;
    subjects?: StaticSubjects[];
    message?: string;
}

export type GetStaticActivityResponse = {
    result: Resposne;
    activity?: StaticActivities;
    message?: string;
}

export type incrementActivityDisplayCountResponse = {
    result: Resposne;
    activity?: StaticActivities;
    message?: string;
}
