import { createContext, useContext, useState } from "react";
import { defualtSurveyContext } from "../models/defualtState/context";
import { SurveyContextType } from "../models/types/context";
import {
    ContactUsSurvey,
    MovementSurvey,
    NewActivitySurvey,
    SurveyCondition,
    TSurvey,
} from "../models/types/survey";

export const SurveyContext = createContext<SurveyContextType>(defualtSurveyContext);

export const useSurveyContext = () => useContext(SurveyContext);

export const SurveyContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [survey, setSurvey] = useState<TSurvey | undefined>(undefined);

    const openSurvey = (condition: SurveyCondition, data: any) => {
        const survey = { condition, data } as TSurvey;
        setSurvey(survey);
    };

    const openSurveyMovement = (data: MovementSurvey) => {
        const survey = { condition: "movement", data } as TSurvey;
        setSurvey(survey);
    };

    const openSurveyNewActivity = (data: NewActivitySurvey) => {
        const survey = { condition: "newActivity", data } as TSurvey;
        setSurvey(survey);
    };

    const openSurveyContactUs = (data: ContactUsSurvey) => {
        const survey = { condition: "contactUs", data } as TSurvey;
        setSurvey(survey);
    };

    const closeSurvey = () => {
        setSurvey(undefined);
    };

    return (
        <SurveyContext.Provider
            value={{
                survey,
                closeSurvey,
                openSurvey,
                openSurveyMovement,
                openSurveyNewActivity,
                openSurveyContactUs,
            }}
        >
            {children}
        </SurveyContext.Provider>
    );
};
