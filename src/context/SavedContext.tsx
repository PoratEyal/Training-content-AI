import { createContext, useContext, useEffect, useState } from "react";
import { SaveContextType } from "../models/types/context";
import { defualtSaveContext } from "../models/defualtState/context";
import { Activity } from "../models/types/activity";
import { useAuthContext } from "./AuthContext";
import { fetchGetSavedActivities, fetchRemoveActivity } from "../utils/fetch";
import { useErrorContext } from "./ErrorContext";
import { RemoveActivityRequest } from "../models/types/api/request";

export const SaveContext = createContext<SaveContextType>(defualtSaveContext);

export const useSaveContext = () => useContext(SaveContext);

export const SavedProvider = ({ children }: { children: React.ReactNode }) => {
    const { currentUser } = useAuthContext();
    const { handleSuccess, handleError } = useErrorContext();
    const [savedActivity, setSavedActivity] = useState<Activity[]>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getSavedActivities = async () => {
        if (currentUser && currentUser.id) {
            try {
                setIsLoading(true);
                handleSuccess("הפעולה נשמרה בהצלחה! תוכלו למצוא אותה באזור הפעולות שלי");
                const response = await fetchGetSavedActivities(currentUser.id);
                if (response.result === "success" && response.activities) {
                    setSavedActivity(response.activities);
                }
            } catch (error) {
                handleError("הפעולה לא נשמרה, אנא נסו שנית");
            } finally {
                setIsLoading(false);
            }
        }
    };

    const deleteActivity = async (activityIdToDelete: string) => {
        if (currentUser && currentUser.id) {
            try {
                setSavedActivity((prevActivities) =>
                    prevActivities.filter((act) => act.id !== activityIdToDelete),
                );
                //TODO: add alert that the activity was removed
                await fetchRemoveActivity({
                    userId: currentUser.id,
                    activityId: activityIdToDelete,
                } as RemoveActivityRequest);
            } catch (error) {
                // handleError("לא הצלחנו למחוק את הפעולה, אנא נסו שוב."); // TODO
            }
        }
    };

    const useFetchSavedData = () => {
        useEffect(() => {
            if (!savedActivity || savedActivity?.length === 0) {
                getSavedActivities();
            }
        }, [currentUser]);
    };

    return (
        <SaveContext.Provider
            value={{
                savedActivity,
                isLoading,
                useFetchSavedData,
                getSavedActivities,
                deleteActivity,
            }}
        >
            {children}
        </SaveContext.Provider>
    );
};
