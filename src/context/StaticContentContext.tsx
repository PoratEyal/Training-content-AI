import React, { createContext, useContext, useEffect, useState } from "react";
import { useErrorContext } from "./ErrorContext";
import msg from "../models/resources/errorMsg.json";
import { fetchStaticSubjects } from "../utils/fetch";
import { StaticSubjects } from "../models/types/activity";
import { StaticContentContextType } from "../models/types/context";
import { defualtStaticContentContext } from "../models/defualtState/context";

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
                // Sort subjects by orderId in ascending order
                const sortedSubjects = response.subjects.sort((a, b) => a.orderId - b.orderId);
                setSubjects(sortedSubjects);
            } else {
                // If there's an error in the response but no exception
                handleError(msg.error.message);
            }
        } catch (error: any) {
            // On any error, handle it
            handleError(msg.error.message);
        } finally {
            // Ensure loading is false after attempt
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Always fetch subjects on mount, no condition needed
        fetchSubjectsData();
    }, []);

    return (
        <StaticContentContext.Provider value={{ subjects, isLoading }}>
            {children}
        </StaticContentContext.Provider>
    );
};
