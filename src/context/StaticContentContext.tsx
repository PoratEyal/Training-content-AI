import React, { createContext, useContext, useEffect, useState } from "react";
import { useNotificationContext } from "./NotificationContext";
import { fetchStaticSubjects } from "../utils/fetch";
import { StaticSubjects } from "../models/types/activity";
import { useLanguage } from "../i18n/useLanguage";
import { useAuthContext } from "../context/AuthContext";
import { logEvent } from "../utils/logEvent";

export type StaticContentContextType = {
    useFetchSubjectsData: () => void;
    subjects: StaticSubjects[];
    isLoading: boolean;
};

export const defualtStaticContentContext: StaticContentContextType = {
    useFetchSubjectsData: () => { },
    subjects: [],
    isLoading: true,
};

const StaticContentContext = createContext<StaticContentContextType>(defualtStaticContentContext);

export const useStaticContentContext = () => useContext(StaticContentContext);

export const StaticContentProvider = ({ children }: { children: React.ReactNode }) => {

    const { notifyAlert: notifyAlert } = useNotificationContext();
    const [subjects, setSubjects] = useState<StaticSubjects[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { t } = useLanguage();
    const { currentUser } = useAuthContext();

    const fetchSubjectsData = async () => {
        setIsLoading(true);
        try {
            const response = await fetchStaticSubjects();   // Happens once in the HomePage Youth
            if (response.result === "success" && response.subjects) {
                const sortedSubjects = response.subjects.sort((a, b) => a.orderId - b.orderId);
                setSubjects(sortedSubjects);
            } else {
                notifyAlert(t("common.errorMsg"));
                logEvent(`[StaticContentContext.else]`, currentUser?.email);
            }
        } catch (error: any) {
            const message = error?.message;
            logEvent(`[StaticContentContext.catch]: ${message}`, currentUser?.email);
        } finally {
            setIsLoading(false);
        }
    };

    const useFetchSubjectsData = () => {
        useEffect(() => {
            if (subjects.length === 0) {
                fetchSubjectsData();
            }
        }, []);
    };

    return (
        <StaticContentContext.Provider value={{ useFetchSubjectsData, subjects, isLoading }}>
            {children}
        </StaticContentContext.Provider>
    );
};
