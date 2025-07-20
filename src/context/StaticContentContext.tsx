import React, { createContext, useContext, useEffect, useState } from "react";
import { useNotificationContext } from "./NotificationContext";
import msg from "../models/resources/errorMsg.json";
import { fetchStaticSubjects } from "../utils/fetch";
import { StaticSubjects } from "../models/types/activity";
import { useLanguage } from "../i18n/useLanguage";
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
    const { lang } = useLanguage();

    const fetchSubjectsData = async () => {
        setIsLoading(true);
        try {
            const response = await fetchStaticSubjects();
            if (response.result === "success" && response.subjects) {
                const sortedSubjects = response.subjects.sort((a, b) => a.orderId - b.orderId);
                setSubjects(sortedSubjects);
            } else {
            notifyAlert(msg[lang].error.message);
            logEvent(`[StaticContentContext.else]`, "");
        }
        } catch (error: any) {
            //notifyAlert(msg[lang].error.message);
            logEvent(`[StaticContentContext.catch]`, "");
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
