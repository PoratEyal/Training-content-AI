import {
    CreateNewUserRequest,
    GetActivityRequest,
    GetStaticActivityRequest,
    RemoveActivityRequest,
    UpdateActivityLikesRequest,
    UpdateUserRequest,
} from "../models/types/api/request";
import {
    AddStaticActivityResponse,
    CreateNewUserResponse,
    GetActivityResponse,
    GetMsgResponse,
    GetStaticActivityResponse,
    SendMsgResponse,
    UpdateActivityLikesResponse,
    UpdateIsMsgResponse,
    UpdateUserResponse,
    getAllActivitiesResponse,
    getAllUsersResponse,
    getSavedActivitiesResponse,
    incrementActivityDisplayCountResponse,
    removeActivityResponse,
    saveActivityResponse,
    staticSubjectsResponse,
} from "../models/types/api/response";
import { functions } from "../config/firebase";
import { httpsCallable } from "firebase/functions";
import msg from "../models/resources/errorMsg.json";
import { Activity, StaticActivities } from "../models/types/activity";
import { Lng as Lang } from "../models/types/common";

export const fetchGetActivity = async (
    request: GetActivityRequest,
): Promise<GetActivityResponse> => {
    const getActivityFunc = httpsCallable(functions, "getActivity");
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
    lang: Lang,
): Promise<CreateNewUserResponse> => {
    const createNewUserFunc = httpsCallable(functions, "createNewUser");

    const response = (await createNewUserFunc(request)).data as CreateNewUserResponse;
    if (response.result === "success" && response.user) {
        return response;
    } else {
        throw new Error(msg[lang].error.message);
    }
};

export const fetchUpdateUser = async (request: UpdateUserRequest): Promise<UpdateUserResponse> => {
    const updateUserFunc = httpsCallable(functions, "updateUser");

    const response = (await updateUserFunc(request)).data as UpdateUserResponse;
    if (response.result === "success") {
        return response;
    }
};

export const fetchUpdateLastLogin = async (): Promise<void> => {
    const updateLastLoginFunc = httpsCallable(functions, "updateLastLogin");
    const response = (await updateLastLoginFunc()).data as { result: string };
    if (response.result !== "success") {
        throw new Error("Failed to update last login");
    }
};

export const fetchGetActivities = async (): Promise<getAllActivitiesResponse> => {
    const getActivitiesFunc = httpsCallable(functions, "getAllActivities");

    const response = (await getActivitiesFunc()).data as getAllActivitiesResponse;
    if (response.result === "success") {
        return response;
    } else {
        throw new Error(msg.en.error.message);
    }
};

export const fetchGetUsers = async (): Promise<getAllUsersResponse> => {
    const getUsersFunc = httpsCallable(functions, "getAllUsers");

    const response = (await getUsersFunc()).data as getAllUsersResponse;
    if (response.result === "success") {
        return response;
    } else {
        throw new Error(msg.en.error.message);
    }
};

export const fetchGetSavedActivities = async (
    userId: string,
): Promise<getSavedActivitiesResponse> => {
    const getSavedActivitiesFunc = httpsCallable(functions, "getSavedActivities");

    const response = (await getSavedActivitiesFunc({ userId })).data as getSavedActivitiesResponse;
    if (response.result === "success") {
        return response;
    } else {
        throw new Error(msg.en.error.message);
    }
};

export const fetchSaveActivity = async (activity: Activity, lang: Lang): Promise<saveActivityResponse> => {
    const saveActivityFunc = httpsCallable(functions, "saveActivity");

    const response = (await saveActivityFunc({ activity, lang })).data as saveActivityResponse;
    if (response.result === "success") {
        return response;
    } else {
        throw new Error(msg.en.error.message);
    }
};

export const fetchRemoveActivity = async (
    request: RemoveActivityRequest,
): Promise<removeActivityResponse> => {
    const removeActivityFunc = httpsCallable(functions, "removeSavedActivity");

    const response = (await removeActivityFunc(request)).data as removeActivityResponse;
    if (response.result === "success") {
        return response;
    }
};

export const fetchStaticSubjects = async (): Promise<staticSubjectsResponse> => {
    try {
        const getStaticSubjectsFunc = httpsCallable(functions, "getStaticSubjectsHttp");
        const response = (await getStaticSubjectsFunc()).data as staticSubjectsResponse;
        if (response.result === "success" && response.subjects) {
            return response;
        } else {
            throw new Error(msg.en.error.message);
        }
    } catch (error: any) {
        throw new Error(msg.en.error.message);
    }
};

export const fetchGetStaticActivity = async (
    request: GetStaticActivityRequest,
): Promise<GetStaticActivityResponse> => {
    try {
        const getStaticActivityFunc = httpsCallable(functions, "getStaticActivity");
        const response = (await getStaticActivityFunc(request)).data as GetStaticActivityResponse;
        if (response.result === "success" && response.activity) {
            return response;
        } else {
            throw new Error(msg.he.error.message);
        }
    } catch (error: any) {
        throw new Error(msg.he.error.message);
    }
};

export const fetchIncrementActivityDisplayCount = async (
    activity: StaticActivities,
): Promise<incrementActivityDisplayCountResponse> => {
    try {
        const incrementActivityDisplayCountFunc = httpsCallable(
            functions,
            "incrementActivityDisplayCount",
        );
        const response = (await incrementActivityDisplayCountFunc({ activity }))
            .data as incrementActivityDisplayCountResponse;
        if (response.result === "success") {
            return response;
        } else {
            throw new Error(msg.he.error.message);
        }
    } catch (error: any) {
        throw new Error(msg.he.error.message);
    }
};

export const fetchSendMsg = async (password: string): Promise<SendMsgResponse> => {
    const sendMsgFunc = httpsCallable(functions, "sendMsg");
    const response = (await sendMsgFunc({ password })).data as SendMsgResponse;
    if (response.result === "success") {
        return response;
    } else {
        throw new Error(msg.en.error.message);
    }
};

export const fetchGetMsg = async (lang: Lang): Promise<GetMsgResponse> => {
    const getMsgFunc = httpsCallable(functions, "getMsg");
    const response = (await getMsgFunc()).data as GetMsgResponse;
    if (response.result === "success") {
        return response;
    } else {
        throw new Error(msg[lang].error.message);
    }
};

export const fetchUpdateIsMsg = async (userId: string): Promise<UpdateIsMsgResponse> => {
    const updateIsMsgFunc = httpsCallable(functions, "updateIsMsg");
    const response = (await updateIsMsgFunc({ userId })).data as UpdateIsMsgResponse;
    if (response.result === "success") {
        return response;
    }
};

export const fetchAddStaticActivity = async (
    activityText: string,
    activityId: string,
): Promise<AddStaticActivityResponse> => {
    try {
        const addStaticActivityFunc = httpsCallable(functions, "addStaticActivity");
        const response = (await addStaticActivityFunc({ activityText, activityId })).data as AddStaticActivityResponse;
        if (response.result === "success") {
            return response;
        } else {
            throw new Error(msg.en.error.message);
        }
    } catch (error: any) {
        throw new Error(msg.en.error.message);
    }
};
