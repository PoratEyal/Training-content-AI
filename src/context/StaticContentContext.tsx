// staticContentContext.tsx

import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchStaticSubjects } from "../utils/staticActivitiesAPI";
import { StaticSubjects } from "../models/interface/staticSubjects";

interface StaticContentContextType {
    subjects: StaticSubjects[];
    isLoading: boolean;
    error: string | null;
}

const StaticContentContext = createContext<StaticContentContextType>({
    subjects: [],
    isLoading: true,
    error: null,
});

export const useStaticContentContext = () => useContext(StaticContentContext);

export const StaticContentProvider = ({ children }: { children: React.ReactNode }) => {
    const [subjects, setSubjects] = useState<StaticSubjects[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSubjects = async () => {
        setIsLoading(true);
        try {
            const response = await fetchStaticSubjects();

            if (response.result === "success" && response.data) {
                // Sort subjects by orderId in ascending order
                const sortedSubjects = response.data.sort((a, b) => a.orderId - b.orderId);
                setSubjects(sortedSubjects);
            } else {
                console.error("Error fetching static subjects:", response.message);
                setError(response.message);
            }
        } catch (error: any) {
            console.error("Error in fetchSubjects:", error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSubjects();
    }, []);

    return (
        <StaticContentContext.Provider value={{ subjects, isLoading, error }}>
            {children}
        </StaticContentContext.Provider>
    );
};
