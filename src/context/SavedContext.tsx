import { createContext, useContext, useEffect, useState } from "react";
import { Activity } from "../models/types/activity";
import { useAuthContext } from "./AuthContext";
import { fetchGetSavedActivities, fetchRemoveActivity } from "../utils/fetch";
import { useErrorContext } from "./ErrorContext";
import { RemoveActivityRequest } from "../models/types/api/request";
import msg from "../models/resources/errorMsg.json";
import { useLanguage } from "../i18n/useLanguage";

export type SaveContextType = {
    savedActivity: Activity[];
    isLoading: boolean;
    useFetchSavedData: () => void;
    getSavedActivities: () => Promise<void>;
    deleteActivity: (activityIdToDelete: string) => Promise<void>;
};

export const defualtSaveContext: SaveContextType = {
    savedActivity: [],
    isLoading: false,
    useFetchSavedData: () => {},
    getSavedActivities: async () => {},
    deleteActivity: async () => {},
}

export const SaveContext = createContext<SaveContextType>(defualtSaveContext);

export const useSaveContext = () => useContext(SaveContext);

export const SavedProvider = ({ children }: { children: React.ReactNode }) => {
    const { currentUser } = useAuthContext();
    const { handleError } = useErrorContext();
    const [savedActivity, setSavedActivity] = useState<Activity[]>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { lang } = useLanguage();

    const getSavedActivities = async () => {
        if (currentUser && currentUser.id) {
            try {
                setIsLoading(true);
                const response = await fetchGetSavedActivities(currentUser.id);
                if (response.result === "success" && response.activities) {
                    const sortedActivities = [...response.activities].sort((a, b) => {
                        if (!a.savedAt) return 1;
                        if (!b.savedAt) return -1;
                        return new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime();
                    });
                    setSavedActivity(sortedActivities);
                }
            } catch (error) {
                handleError(msg[lang].notSaved.message);
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
