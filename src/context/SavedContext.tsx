import { createContext, useContext, useState } from "react";
import { SaveContextType } from "../models/types/context";
import { defualtSaveContext } from "../models/defualtState/context";
import { Activity } from "../models/types/activity";
import { useAuthContext } from "./AuthContext";
import { fetchGetSavedActivities, fetchRemoveActivity } from "../utils/fetch";
import { useErrorContext } from "./ErrorContext";
import msg from "../models/resources/errorMsg.json";
import { RemoveActivityRequest } from "../models/types/api/request";

export const SaveContext = createContext<SaveContextType>(defualtSaveContext);

export const useSaveContext = () => useContext(SaveContext);

export const SavedProvider = ({ children }: { children: React.ReactNode }) => {
    const { currentUser } = useAuthContext();
    const { handleError } = useErrorContext();
    const [savedActivity, setSavedActivity] = useState<Activity[]>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getSavedActivities = async () => {
        if (currentUser && currentUser.id) {
            try {
                setIsLoading(true);
                const response = await fetchGetSavedActivities(currentUser.id);
                if (response.result === "success" && response.activities) {
                    setSavedActivity(response.activities);
                }
            } catch (error) {
                handleError(msg.error.message);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const deleteActivity = async (activityToDelete: Activity) => {
        if (currentUser && currentUser.id) {
            try {
                setSavedActivity((prevActivities) =>
                    prevActivities.filter((act) => act !== activityToDelete),
                );
                //TODO: add alert that the activity was removed
                await fetchRemoveActivity({
                    userId: currentUser.id,
                    activityId: activityToDelete.id,
                } as RemoveActivityRequest);
            } catch (error) {
                // handleError("לא הצלחנו למחוק את הפעולה, אנא נסו שוב."); // TODO
            }
        }
    };

    return (
        <SaveContext.Provider
            value={{
                savedActivity,
                isLoading,
                getSavedActivities,
                deleteActivity,
            }}
        >
            {children}
        </SaveContext.Provider>
    );
};