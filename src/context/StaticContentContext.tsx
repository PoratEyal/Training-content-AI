import React, { createContext, useContext, useEffect, useState } from "react";
import { StaticSubjects } from "../models/interface/staticSubjects";
import { useErrorContext } from "./ErrorContext";
import msg from "../models/resources/errorMsg.json";
import { fetchStaticSubjects } from "../utils/fetch";

interface StaticContentContextType {
    subjects: StaticSubjects[];
    isLoading: boolean;
}

const StaticContentContext = createContext<StaticContentContextType>({
    subjects: [],
    isLoading: true,
});

export const useStaticContentContext = () => useContext(StaticContentContext);

export const StaticContentProvider = ({ children }: { children: React.ReactNode }) => {
    const { handleError } = useErrorContext();
    const [subjects, setSubjects] = useState<StaticSubjects[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchSubjects = async () => {
        setIsLoading(true);
        try {
            const response = await fetchStaticSubjects();

            if (response.result === "success" && response.subjects) {
                // Sort subjects by orderId in ascending order
                const sortedSubjects = response.subjects.sort((a, b) => a.orderId - b.orderId);
                setSubjects(sortedSubjects);
            } else {
                console.error("Error fetching static subjects:", response.message);
                handleError(msg.error.message);
            }
        } catch (error: any) {
            console.error("Error in fetchSubjects:", error);
            handleError(msg.error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSubjects();
    }, []);

    return (
        <StaticContentContext.Provider value={{ subjects, isLoading }}>
            {children}
        </StaticContentContext.Provider>
    );
};
