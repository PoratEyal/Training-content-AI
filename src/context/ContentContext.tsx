import { createContext, useContext, useState } from "react";
import { ContentContextType, DataType } from "../models/types/context";
import { typeContext } from "../models/defualtState/context";
import { PROMPT_LIMIT } from "../models/constants/state";
import { useCookies } from "react-cookie";
import Session from "../utils/sessionStorage";
import { tillEndOfDay } from "../utils/time";
import { Activity } from "../models/types/activity";
import { getMovementByTitle } from "../utils/movement";
import { Movements } from "../models/resources/movment";

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

    const updateDetails = (movement, grade, amount, place, gender) => {
        setData((prevData) => {
            const d = {
                ...prevData,
                movement: Movements[movement],
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
            const d: DataType = { ...prevData, movement: undefined };
            Session.set("data", d);
            return d;
        });
    };

    const updateMovementPath = (index: number, activity: Activity) => {
        setData((prevData) => {
            prevData.movement.path[index].activity = activity;
            Session.set("data", { ...prevData });
            return { ...prevData };
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
                updateMovementPath,
            }}
        >
            {children}
        </ContentContext.Provider>
    );
};
