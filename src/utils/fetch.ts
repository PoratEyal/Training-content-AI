import { GetActivityRequest, UpdateActivityLikesRequest } from "../models/types/api/request";
import { GetActivityResponse, UpdateActivityLikesResponse } from "../models/types/api/response";
import { functions } from "../config/firebase";
import { httpsCallable } from "firebase/functions";
import msg from "../models/resources/errorMsg.json";

export const fetchGetActivity = async (
    conextUpdate: (activity: any) => void,
    request: GetActivityRequest,
): Promise<GetActivityResponse> => {
    const getActivityFunc = httpsCallable(functions, "getActivity");

    const response = (await getActivityFunc(request)).data as GetActivityResponse;
    if ((response.result === "success" || response.result === "safety") && response.activity) {
        conextUpdate(response.activity);
    } else {
        throw new Error(msg.error.message);
    }
    return response;
};

export const fetchUpdateActivityLikes = async (
    conextUpdate: (activity: any) => void,
    request: UpdateActivityLikesRequest,
): Promise<UpdateActivityLikesResponse> => {
    const updateActivityLikesFunc = httpsCallable(functions, "updateLikes");

    const response = (await updateActivityLikesFunc(request)).data as UpdateActivityLikesResponse;
    if (response.result === "success" && response.activity) {
        conextUpdate(response.activity);
    } else {
        throw new Error(msg.error.message);
    }
    return response;
};
