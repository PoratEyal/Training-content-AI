import { GetActivityRequest, UpdateActivityLikesRequest } from "../models/types/api/request";
import { GetActivityResponse, UpdateActivityLikesResponse } from "../models/types/api/response";
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
    contextUpdate: (activity: any) => void,
    request: UpdateActivityLikesRequest,
): Promise<UpdateActivityLikesResponse> => {
    const updateActivityLikesFunc = httpsCallable(functions, "updateLikes");

    const response = (await updateActivityLikesFunc(request)).data as UpdateActivityLikesResponse;
    if (response.result === "success" && response.activity) {
        contextUpdate(response.activity);
    } else {
        throw new Error(msg.error.message);
    }
    return response;
};
