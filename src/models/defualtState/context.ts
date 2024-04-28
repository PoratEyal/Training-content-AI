import { PROMPT_LIMIT } from "../constants/state";
import { DataType } from "../types/context";

export const defualtData: DataType = {
    pointOfView: {
        subject: "",
        time: "",
        use: false,
        data: "",
    },
    contentActivity: {
        subject: "",
        time: "",
        use: false,
        data: "",
    },
    scoutingTime: {
        subject: "",
        time: "",
        use: false,
        data: "",
    },
    playingTime: {
        subject: "",
        time: "",
        use: false,
        data: "",
    },
    other: {
        use: false,
    },
    activity: "",
    grade: "",
    gender: "",
    amount: "",
    place: "",
    img: "",
};

export const typeContext = {
    data: defualtData,
    setData: () => {},
    limit: PROMPT_LIMIT,
    updateLimit: () => {},
    cookies: {},
    setCookie: () => {},
    updateDetails: () => {},
    updateActivity: () => {},
    updateImage: () => {},
    resetAllUseFields: () => {},
    updateContentActivity: () => {},
    updatePointOfView: () => {},
    updateScoutingTime: () => {},
    updatePlayingTime: () => {},
};

export const defualtErrorContext = {
    handleError: () => {},
    handleAlert: () => {},
    handleSuccess: () => {},
};

