import { createContext, useContext, useState } from "react";
import { ContentContextType, DataType } from "../models/types/context";
import { typeContext } from "../models/defualtState/context";
import { PROMPT_LIMIT } from "../models/constants/state";
import { useCookies } from "react-cookie";
import Session from "../utils/sessionStorage";
import { oneDay } from "../utils/time";

export const ContentContext = createContext<ContentContextType>(typeContext);

export const useContentContext = () => useContext(ContentContext);

export const ContentProvider = ({ children }: { children: React.ReactNode }) => {
    const [cookies, setCookie] = useCookies(["limit", "user-consent"]);

    const [data, setData] = useState<DataType | undefined>();
    const [limit, setLimit] = useState<number | undefined>();

    const setStateFromSession = () => {
        if (data === undefined) {
            const sessionData: DataType | undefined = Session.get("data");
            if (sessionData) {
                setData(sessionData);
            }
        }
        if(limit === undefined){
            console.log("setStateFromSession", limit)
            const cookieLimit = cookies["limit"];
            if(cookieLimit){
                setLimit(parseInt(cookieLimit));
            }
        }
    };
    setStateFromSession();

    const updateDetails = (grade, amount, place, gender) => {
        setData((prevData) => {
            const d = {
                ...prevData,
                grade: grade,
                amount: amount,
                place: place,
                gender: gender,
            };
            Session.set("data", d);
            return d;
        });
    };

    const updateLimit = () => {
        setLimit((prev) => {
            const lim = prev ? prev + 1 : 1;
            if(lim <= PROMPT_LIMIT){
                setCookie("limit", JSON.stringify(lim), {
                    path: "/",
                    expires: oneDay,
                });
            }
            return lim;
        });
    };

    const resetAllUseFields = () => {
        setData((prevData) => ({
            ...prevData,
            pointOfView: { ...prevData.pointOfView, use: false },
            contentActivity: { ...prevData.contentActivity, use: false },
            scoutingTime: { ...prevData.scoutingTime, use: false },
            playingTime: { ...prevData.playingTime, use: false },
        }));
        Session.clear();
    };

    // - - - - - - Content Activity - - - - - - - - - - - - - - -

    const updateContentActivity = (subject, time, result) => {
        setData((prevData) => {
            const d = {
                ...prevData,
                contentActivity: { subject, time, use: true, data: result },
            };
            Session.set("data", d);
            return d;
        });
    };

    // - - - - - - Point Of View - - - - - - - - - - - - - - -

    const updatePointOfView = (subject, time, result) => {
        setData((prevData) => {
            const d = {
                ...prevData,
                pointOfView: { subject, time, use: true, data: result },
            };
            Session.set("data", d);
            return d;
        });
    };

    // - - - - - - Scouting Time - - - - - - - - - - - - - - -

    const updateScoutingTime = (subject, time, result) => {
        setData((prevData) => {
            const d = {
                ...prevData,
                scoutingTime: { subject, time, use: true, data: result },
            };
            Session.set("data", d);
            return d;
        });
    };

    // - - - - - - playing Time - - - - - - - - - - - - - - -

    const updatePlayingTime = (subject, time, result) => {
        setData((prevData) => {
            const d = {
                ...prevData,
                playingTime: { subject, time, use: true, data: result },
            };
            Session.set("data", d);
            return d;
        });
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
