import { createContext, useContext, useState } from "react";
import { ContentContextType, DataType } from "../models/types/context";
import { typeContext } from "../models/defualtState/context";
import { PROMPT_LIMIT } from "../models/constants/state";
import { useCookies } from "react-cookie";
import Session from "../utils/sessionStorage";
import { tillEndOfDay } from "../utils/time";
import { Activity } from "../models/types/activity";

export const ContentContext = createContext<ContentContextType>(typeContext);

export const useContentContext = () => useContext(ContentContext);

export const ContentProvider = ({ children }: { children: React.ReactNode }) => {
    const [cookies, setCookie] = useCookies(["limit", "user-consent"]);

    const [data, setData] = useState<DataType | undefined>();
    const [limit, setLimit] = useState<number | undefined>();

    const setStateFromSession = () => {
        try {
            if (data === undefined) {
                const sessionData: DataType | undefined = Session.get("data");
                if (sessionData) {
                    setData(sessionData);
                }
            }
            if (limit === undefined) {
                const cookieLimit = cookies["limit"];
                if (cookieLimit) {
                    setLimit(parseInt(cookieLimit));
                }
            }
        } catch (error) {}
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
            if (lim <= PROMPT_LIMIT) {
                setCookie("limit", JSON.stringify(lim), {
                    path: "/",
                    expires: tillEndOfDay,
                });
            }
            return lim;
        });
    };

    const resetAllUseFields = () => {
        setData((prevData) => {
            const d = {
                ...prevData,
                pointOfView: undefined,
                contentActivity: undefined,
                scoutingTime: undefined,
                playingTime: undefined,
            };
            Session.set("data", d);
            return d;
        });
    };

    // - - - - - - Content Activity - - - - - - - - - - - - - - -

    const updateContentActivity = (activity: Activity) => {
        setData((prevData) => {
            const d = { ...prevData, contentActivity: activity };
            Session.set("data", d);
            return d;
        });
    };

    // - - - - - - Point Of View - - - - - - - - - - - - - - -

    const updatePointOfView = (activity: Activity) => {
        setData((prevData) => {
            const d = { ...prevData, pointOfView: activity };
            Session.set("data", d);
            return d;
        });
    };

    // - - - - - - Scouting Time - - - - - - - - - - - - - - -

    const updateScoutingTime = (activity: Activity) => {
        setData((prevData) => {
            const d = { ...prevData, scoutingTime: activity };
            Session.set("data", d);
            return d;
        });
    };

    // - - - - - - playing Time - - - - - - - - - - - - - - -

    const updatePlayingTime = (activity: Activity) => {
        setData((prevData) => {
            const d = { ...prevData, playingTime: activity };
            Session.set("data", d);
            return d;
        });
    };

    const contextUpdateSet = {
        pointOfView: updatePointOfView,
        contentActivity: updateContentActivity,
        scoutingTime: updateScoutingTime,
        playingTime: updatePlayingTime,
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
                contextUpdateSet,
            }}
        >
            {children}
        </ContentContext.Provider>
    );
};
