import { MovementName } from "./movement";

export type SurveyCondition = "movement" | "newActivity" | "contactUs";

export type TSurvey = {
    condition: SurveyCondition;
    data: MovementSurvey | NewActivitySurvey | ContactUsSurvey;
};

export type MovementSurvey = {
    movement: MovementName;
};

export type NewActivitySurvey = {
    subject: string; //the subject of the activity
};

export type ContactUsSurvey = {
    message: string;
};