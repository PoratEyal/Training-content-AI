import { createContext, useContext, useEffect, useState } from "react";
import { Activity } from "../models/types/activity";
import { useAuthContext } from "./AuthContext";
import { useNotificationContext } from "./NotificationContext";
import { useLanguage } from "../i18n/useLanguage";
import { RemoveActivityRequest } from "../models/types/api/request";
import { fetchGetSavedActivities, fetchRemoveActivity } from "../utils/fetch";
import { logEvent } from "../utils/logEvent";

export type SaveContextType = {
    savedActivity: Activity[];
    isLoading: boolean;
    useFetchSavedData: () => void;
    saveActivity: () => Promise<void>;
    deleteActivity: (activityIdToDelete: string) => Promise<void>;
};

export const defualtSaveContext: SaveContextType = {
    savedActivity: [],
    isLoading: false,
    useFetchSavedData: () => { },
    saveActivity: async () => { },
    deleteActivity: async () => { },
}

export const SaveContext = createContext<SaveContextType>(defualtSaveContext);

export const useSaveContext = () => useContext(SaveContext);

export const SavedProvider = ({ children }: { children: React.ReactNode }) => {

    const { currentUser } = useAuthContext();
    const { notifyAlert: notifyAlert } = useNotificationContext();
    const [savedActivity, setSavedActivity] = useState<Activity[]>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { t } = useLanguage();

    const saveActivity = async () => {

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
                notifyAlert(t("editor.save.saveError"));
                logEvent(`[SavedContext.saveActivity]: ${error}`, currentUser?.email);
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
                await fetchRemoveActivity({
                    userId: currentUser.id,
                    activityId: activityIdToDelete,
                } as RemoveActivityRequest);
            } catch (error) {
                logEvent(`[SavedContext.deleteActivity]: ${activityIdToDelete}`, currentUser?.email);
            }
        }
    };


    const useFetchSavedData = () => {
        useEffect(() => {
            if (!savedActivity || savedActivity?.length === 0) {
                saveActivity();
            }
        }, [currentUser]);
    };

    return (
        <SaveContext.Provider
            value={{
                savedActivity,
                isLoading,
                useFetchSavedData,
                saveActivity,
                deleteActivity,
            }}
        >
            {children}
        </SaveContext.Provider>
    );
};
