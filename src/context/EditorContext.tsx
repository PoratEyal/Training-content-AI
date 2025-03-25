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

export const defualtEditorContext: EditorContextType = {
    isEdit: false,
    editMode: () => {},
    readOnlyMode: () => {},
    updateActivity: (defaultActivity: Activity, activityText: string) => {},
};

export const EditorContext = createContext<EditorContextType>(defualtEditorContext);

export const useEditorContext = () => useContext(EditorContext);

export const EditorProvider = ({ children }: { children: React.ReactNode }) => {
    const { updateMainActivity } = useContentContext();
    
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const editMode = (activity: Activity) => {
        setIsEdit(true);
        updateMainActivity(activity);
        updateActivity(activity, activity.activity);
    };

    const readOnlyMode = () => {
        setIsEdit(false);
    };

    const updateActivity = (defaultActivity: Activity, activityText: string) => {
        const convertedContent = convertHTMLToContent(activityText);
        const newUpdatedActivity = updateActivityWithContent(defaultActivity, convertedContent);
        updateMainActivity(newUpdatedActivity);
    };

    return (
        <EditorContext.Provider
            value={{
                isEdit,
                editMode,
                readOnlyMode,
                updateActivity
            }}
        >
            {children}
        </EditorContext.Provider>
    );
};
