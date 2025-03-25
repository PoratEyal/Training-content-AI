import React, { createContext, useContext, useEffect, useState } from "react";
import { useErrorContext } from "./ErrorContext";
import msg from "../models/resources/errorMsg.json";
import { fetchStaticSubjects } from "../utils/fetch";
import { StaticSubjects } from "../models/types/activity";

export type StaticContentContextType = {
    useFetchSubjectsData: () => void;
    subjects: StaticSubjects[];
    isLoading: boolean;
};

export const defualtStaticContentContext: StaticContentContextType = {
    useFetchSubjectsData: () => {},
    subjects: [],
    isLoading: true,
};

const StaticContentContext = createContext<StaticContentContextType>(defualtStaticContentContext);

export const useStaticContentContext = () => useContext(StaticContentContext);

export const StaticContentProvider = ({ children }: { children: React.ReactNode }) => {
    const { handleError } = useErrorContext();
    const [subjects, setSubjects] = useState<StaticSubjects[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchSubjectsData = async () => {
        setIsLoading(true);
        try {
            const response = await fetchStaticSubjects();
            if (response.result === "success" && response.subjects) {
                const sortedSubjects = response.subjects.sort((a, b) => a.orderId - b.orderId);
                setSubjects(sortedSubjects);
            }
        } catch (error: any) {
            handleError(msg.error.message);
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
