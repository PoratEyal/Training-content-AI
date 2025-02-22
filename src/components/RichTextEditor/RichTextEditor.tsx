import React, { useState } from "react";
import styles from "./RichTextEditor.module.css";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FaBold, FaListOl, FaListUl } from "react-icons/fa6";
import { convertContentToHTML, convertHTMLToContent } from "../../utils/format";
import { fetchSaveActivity } from "../../utils/fetch";
import { useSaveContext } from "../../context/SavedContext";
import { Activity } from "../../models/types/activity";
import { updateActivityWithContent } from "../../utils/activity";
import { useErrorContext } from "../../context/ErrorContext";
import { useContentContext } from "../../context/ContentContext";
import "./RichTextEditor.css";
import { SAVE_COOLDOWN } from "../../models/constants/time";

type RichTextEditorProps = {
    activity: Activity | undefined;
};

const RichTextEditor: React.FC<RichTextEditorProps> = ({ activity }) => {
    const { getSavedActivities } = useSaveContext();
    const { updateMainActivity } = useContentContext();
    const { handleSuccess, handleError } = useErrorContext();
    const [isLimitExceeded, setIsLimitExceeded] = useState<boolean>(false);
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const MAX_CHARS = 2000;


    const editor = useEditor({
        extensions: [StarterKit],
        content: convertContentToHTML(activity?.activity || ""),
        editorProps: {
            attributes: {
                class: styles.editorContent,
            },
            handleKeyDown: (view, event) => {
                const text = view.state.doc.textContent;
                // Allow deletion and special keys
                if (
                    event.key === "Backspace" ||
                    event.key === "Delete" ||
                    event.key === "ArrowLeft" ||
                    event.key === "ArrowRight" ||
                    event.key === "ArrowUp" ||
                    event.key === "ArrowDown" ||
                    event.ctrlKey ||
                    event.metaKey
                ) {
                    setIsLimitExceeded(false);
                    return false;
                }

                if (text.length >= MAX_CHARS) {
                    setIsLimitExceeded(true);
                    return true; // Prevent input
                }
                setIsLimitExceeded(false);
                return false; // Allow input
            },
        },
    });

    const handleClickSave = async () => {
        const htmlContent = editor?.getHTML();
        if (htmlContent) {
            try {
                setIsDisabled(true);
                setTimeout(() => {
                    // prevent DDoS attacks
                    setIsDisabled(false);
                }, SAVE_COOLDOWN);
                handleSuccess("הפעולה נשמרה בהצלחה! תוכלו למצוא אותה באזור הפעולות שלי");
                const convertedContent = convertHTMLToContent(htmlContent);
                const newUpdatedActivity = updateActivityWithContent(activity, convertedContent);
                const res = await fetchSaveActivity(newUpdatedActivity);
                updateMainActivity({ ...newUpdatedActivity, id: res.activity.id } as Activity);
                await getSavedActivities();
            } catch (error) {
                handleError("הפעולה לא נשמרה, אנא נסו שנית");
            }
        }
    };

    return (
        <section className={styles.container}>
            <div className={styles.toolbar}>
                <button
                    onClick={handleClickSave}
                    disabled={isDisabled}
                    className={styles.saveButton}
                    title="Save"
                >
                    שמירה לפעולות שלי
                </button>
                <div className={styles.separator}></div>
                <button
                    onClick={() => editor?.chain().focus().toggleBulletList().run()}
                    className={`${styles.toolbarButton} ${editor?.isActive("bulletList") ? styles.toolbarButtonActive : ""}`}
                    title="Bullet List"
                >
                    <FaListUl />
                </button>
                <button
                    onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                    className={`${styles.toolbarButton} ${editor?.isActive("orderedList") ? styles.toolbarButtonActive : ""}`}
                    title="Numbered List"
                >
                    <FaListOl />
                </button>
                <div className={styles.separator}></div>
                <button
                    onClick={() => editor?.chain().focus().toggleBold().run()}
                    className={`${styles.toolbarButton} ${editor?.isActive("bold") ? styles.toolbarButtonActive : ""}`}
                    title="Bold"
                >
                    <FaBold />
                </button>
            </div>
            <EditorContent editor={editor} className={styles.editor} />
            <div className={styles.charCounter}>
                {isLimitExceeded ? (
                    <span className={styles.charLimitWarning}>הגעת למגבלת התווים האפשרית</span>
                ) : null}
            </div>
        </section>
    );
};

export default RichTextEditor;
