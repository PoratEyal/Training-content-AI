import {
    CreateNewUserRequest,
    GetActivityRequest,
    UpdateActivityLikesRequest,
    UpdateUserRequest,
} from "../models/types/api/request";
import {
    CreateNewUserResponse,
    GetActivityResponse,
    UpdateActivityLikesResponse,
    UpdateUserResponse,
    getAllActivitiesResponse,
    getAllUsersResponse,
} from "../models/types/api/response";
import { functions } from "../config/firebase";
import { httpsCallable } from "firebase/functions";
import msg from "../models/resources/errorMsg.json";

export const fetchGetActivity = async (
    request: GetActivityRequest,
): Promise<GetActivityResponse> => {
    const getActivityFunc = httpsCallable(functions, "getActivityTest");
    const response = (await getActivityFunc(request)).data as GetActivityResponse;
    return response;
};

export const fetchUpdateActivityLikes = async (
    request: UpdateActivityLikesRequest,
): Promise<UpdateActivityLikesResponse> => {
    const updateActivityLikesFunc = httpsCallable(functions, "updateLikes");
    const response = (await updateActivityLikesFunc(request)).data as UpdateActivityLikesResponse;
    return response;
};

export const fetchCreateNewUser = async (
    request: CreateNewUserRequest,
): Promise<CreateNewUserResponse> => {
    const createNewUserFunc = httpsCallable(functions, "createNewUser");

    const response = (await createNewUserFunc(request)).data as CreateNewUserResponse;
    if (response.result === "success" && response.user) {
        return response;
    } else {
        throw new Error(msg.error.message);
    }
};

export const fetchUpdateUser = async (request: UpdateUserRequest): Promise<UpdateUserResponse> => {
    const updateUserFunc = httpsCallable(functions, "updateUserTest");

    const response = (await updateUserFunc(request)).data as UpdateUserResponse;
    if (response.result === "success") {
        return response;
    } else {
        throw new Error(msg.error.message);
    }
};

export const fetchGetActivities = async (): Promise<getAllActivitiesResponse> => {
    const getActivitiesFunc = httpsCallable(functions, "getAllActivities");

    const response = (await getActivitiesFunc()).data as getAllActivitiesResponse;
    if (response.result === "success") {
        return response;
    } else {
        throw new Error(msg.error.message);
    }
};

export const fetchGetUsers = async (): Promise<getAllUsersResponse> => {
    const getUsersFunc = httpsCallable(functions, "getAllUsers");

    const response = (await getUsersFunc()).data as getAllUsersResponse;
    if (response.result === "success") {
        return response;
    } else {
        throw new Error(msg.error.message);
    }
};
