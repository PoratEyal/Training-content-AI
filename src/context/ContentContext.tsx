import { createContext, useContext, useEffect, useState } from "react";
import { ContentContextType, DataType } from "../models/types/context";
import { typeContext, defualtData } from "../models/defualtState/context";
import { PROMPT_LIMIT } from "../models/constants/state";
import { useCookies } from "react-cookie";

export const ContentContext = createContext<ContentContextType>(typeContext);

export const useContentContext = () => useContext(ContentContext);

export const ContentProvider = ({ children }: { children: React.ReactNode }) => {
    const [cookies, setCookie] = useCookies(["limit", "user-consent"]);

    const [data, setData] = useState<DataType>(defualtData);
    const [limit, setLimit] = useState<number>(PROMPT_LIMIT);

    const updateDetails = (grade, amount, place, gender) => {
        setData((prevData) => ({
            ...prevData,
            grade: grade,
            amount: amount,
            place: place,
            gender: gender,
        }));
    };

    const updateLimit = () => {
        setLimit((prev) => {
            if (prev === 0) return 0;
            const lim = prev - 1;
            let time = new Date(Date.now() + 1000 * 60 * 60 * 24);

            const cookieRes = cookies["limit"];
            if (cookieRes && cookieRes.time) time = new Date(cookieRes.time);

            setCookie("limit", JSON.stringify({ limit: lim, time }), {
                path: "/",
                expires: time,
            });
            return lim;
        });
    };

    const updateActivity = (activity) => {
        setData((prevData) => ({
            ...prevData,
            activity: activity,
        }));
    };

    const updateImage = (url) => {
        setData((prevData) => ({
            ...prevData,
            img: url,
        }));
    };

    const resetAllUseFields = () => {
        setData((prevData) => ({
            ...prevData,
            pointOfView: { ...prevData.pointOfView, use: false },
            contentActivity: { ...prevData.contentActivity, use: false },
            scoutingTime: { ...prevData.scoutingTime, use: false },
            playingTime: { ...prevData.playingTime, use: false },
        }));
    };

    // - - - - - - Content Activity - - - - - - - - - - - - - - -

    const updateContentActivity = (subject, time, result) => {
        setData((prevData) => ({
            ...prevData,
            contentActivity: { subject, time, use: true, data: result },
        }));
    };

    // - - - - - - Point Of View - - - - - - - - - - - - - - -

    const updatePointOfView = (subject, time, result) => {
        setData((prevData) => ({
            ...prevData,
            pointOfView: { subject, time, use: true, data: result },
        }));
    };

    // - - - - - - Scouting Time - - - - - - - - - - - - - - -

    const updateScoutingTime = (subject, time, result) => {
        setData((prevData) => ({
            ...prevData,
            scoutingTime: { subject, time, use: true, data: result },
        }));
    };

    // - - - - - - playing Time - - - - - - - - - - - - - - -

    const updatePlayingTime = (subject, time, result) => {
        setData((prevData) => ({
            ...prevData,
            playingTime: { subject, time, use: true, data: result },
        }));
    };

    return (
        <ContentContext.Provider
            value={{
                data,
                setData,
                limit,
                updateLimit,
                cookies,
                setCookie,
                updateDetails,
                updateActivity,
                updateImage,
                resetAllUseFields,
                updateContentActivity,
                updatePointOfView,
                updateScoutingTime,
                updatePlayingTime,
            }}
        >
            {children}
        </ContentContext.Provider>
    );
};
