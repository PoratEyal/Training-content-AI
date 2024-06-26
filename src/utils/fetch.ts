import {
    CreateNewUserRequest,
    GetActivityRequest,
    GetUserByIdRequest,
    UpdateActivityLikesRequest,
    UpdateUserRequest,
} from "../models/types/api/request";
import {
    CreateNewUserResponse,
    GetActivityResponse,
    GetUserByIdResponse,
    UpdateActivityLikesResponse,
    UpdateUserResponse,
} from "../models/types/api/response";
import { functions } from "../config/firebase";
import { httpsCallable } from "firebase/functions";
import msg from "../models/resources/errorMsg.json";
import { Activity } from "../models/types/activity";

export const fetchGetActivity = async (
    contextUpdate: (index: number, activity: Activity) => void,
    index: number,
    request: GetActivityRequest,
): Promise<GetActivityResponse> => {
    const getActivityFunc = httpsCallable(functions, "getActivity");

    const response = (await getActivityFunc(request)).data as GetActivityResponse;
    if ((response.result === "success" || response.result === "safety") && response.activity) {
        contextUpdate(index, response.activity);
    } else {
        throw new Error(msg.error.message);
    }
    return response;
};

export const fetchUpdateActivityLikes = async (
    contextUpdate: (index: number, activity: Activity) => void,
    index: number,
    request: UpdateActivityLikesRequest,
): Promise<UpdateActivityLikesResponse> => {
    const updateActivityLikesFunc = httpsCallable(functions, "updateLikes");

    const response = (await updateActivityLikesFunc(request)).data as UpdateActivityLikesResponse;
    if (response.result === "success" && response.activity) {
        contextUpdate(index, response.activity);
    } else {
        throw new Error(msg.error.message);
    }
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

export const fetchGetUserById = async (
    request: GetUserByIdRequest,
): Promise<GetUserByIdResponse> => {
    const getUserByIdFunc = httpsCallable(functions, "getUserById");

    const response = (await getUserByIdFunc(request)).data as GetUserByIdResponse;
    if (response.result === "success" ) {
        return response;
    } else {
        throw new Error(msg.error.message);
    }
};

export const fetchUpdateUser = async (request: UpdateUserRequest): Promise<UpdateUserResponse> => {
    const updateUserFunc = httpsCallable(functions, "updateUser");

    const response = (await updateUserFunc(request)).data as UpdateUserResponse;
    if (response.result === "success") {
        return response;
    } else {
        throw new Error(msg.error.message);
    }
};
