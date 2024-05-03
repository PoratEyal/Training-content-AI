import { GetActivityRequest } from "../models/types/api/request";
import { GetActivityResponse } from "../models/types/api/response";
import { functions } from "../config/firebase";
import { httpsCallable } from "firebase/functions";

export const fetchGetActivity = async (
    conextUpdate: (activity: any) => void,
    request: GetActivityRequest,
): Promise<GetActivityResponse> => {
    const getActivityFunc = httpsCallable(functions, "getActivity");

    const response = (await getActivityFunc(request)).data as GetActivityResponse;
    if (response.success && response.activity) {
        conextUpdate(response.activity);
    } else {
        throw new Error(response.message);
    }
    return response;
};
