import {
    creationActivity,
    contantActivity,
    playingTime,
    playingTimeWithSubject,
    survivalActivity,
    survivalActivityWithSubject,
    viewActivity,
    contantActivityWithSubject,
} from "../model/prompts/parts";
import { PartStructure } from "../model/types/activity";

export const formatString = (template: string, values: string[]): string => {
    return template.replace(/{(\d+)}/g, (match, number) => {
        return typeof values[number] !== "undefined" ? values[number] : match;
    });
};

export const formatParts = (parts: PartStructure[]): string => {
    return parts
        .map((part) => {
            const { name, subject } = part;
            if (name === "pointOfView") {
                return viewActivity;
            } else if (name === "creation") {
                return creationActivity;
            } else if (name === "playTime") {
                if (subject !== "") return formatString(playingTimeWithSubject, [subject]);
                return playingTime;
            } else if (name === "survival") {
                if (subject !== "") return formatString(survivalActivityWithSubject, [subject]);
                return survivalActivity;
            } else if (name === "contant") {
                if (subject !== "") return formatString(contantActivityWithSubject, [subject]);
                return contantActivity;
            } else {
                return contantActivity;
            }
        })
        .join("\n");
};

export const formatStringifyParts = (parts: PartStructure[]): string => {
    return JSON.stringify(
        parts.map((part) => {
            const subject = part.subject === "" ? "" : ` - ${part.subject}`;
            return `${part.name}${subject}`;
        }),
    );
};
