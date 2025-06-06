import { createContext, useContext, useState } from "react";
import { Activity } from "../models/types/activity";
import { useContentContext } from "./ContentContext";
import { convertHTMLToContent } from "../utils/format";
import { updateActivityWithContent } from "../utils/activity";

export type EditorContextType = {
    isEdit: boolean;
    editMode: (activity: Activity) => void;
    readOnlyMode: () => void;
    updateActivity: (defaultActivity: Activity, activityText: string) => void;
};

export const defaultEditorContext: EditorContextType = {
    isEdit: false,
    editMode: () => {},
    readOnlyMode: () => {},
    updateActivity: () => {},
};

export const EditorContext = createContext<EditorContextType>(defaultEditorContext);

export const useEditorContext = () => useContext(EditorContext);

export const EditorProvider = ({ children }: { children: React.ReactNode }) => {
    const { updateMainActivity } = useContentContext();
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const enterEditMode = (activity: Activity) => {
        setIsEdit(true);
        updateMainActivity(activity);
        handleActivityUpdate(activity, activity.activity);
    };

    const readOnlyMode = () => {
        setIsEdit(false);
    };

    const handleActivityUpdate = (defaultActivity: Activity, activityText: string) => {
        if (!activityText) return;
        const converted = convertHTMLToContent(activityText);
        const updated = updateActivityWithContent(defaultActivity, converted);
        updateMainActivity(updated);
    };

    return (
        <EditorContext.Provider value={{
            isEdit,
            editMode: enterEditMode,
            readOnlyMode,
            updateActivity: handleActivityUpdate
        }}>
            {children}
        </EditorContext.Provider>
    );
};
