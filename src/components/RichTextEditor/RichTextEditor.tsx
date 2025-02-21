import React from "react";
import styles from "./RichTextEditor.module.css";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FaBold, FaListOl, FaListUl } from "react-icons/fa6";
import { convertContentToHTML, convertHTMLToContent } from "../../utils/format";
import { fetchSaveActivity } from "../../utils/fetch";
import { useSaveContext } from "../../context/SavedContext";
import { Activity } from "../../models/types/activity";
import { updateActivityWithContent } from "../../utils/activity";
import "./RichTextEditor.css";
import { useErrorContext } from "../../context/ErrorContext";
import { useContentContext } from "../../context/ContentContext";

type RichTextEditorProps = {
    activity: Activity | undefined;
};

const RichTextEditor: React.FC<RichTextEditorProps> = ({ activity }) => {
    const { getSavedActivities } = useSaveContext();
    const { updateMainActivity } = useContentContext();
    const { handleSuccess, handleError } = useErrorContext();

    const editor = useEditor({
        extensions: [StarterKit],
        content: convertContentToHTML(activity?.activity || ""),
        editorProps: {
            attributes: {
                class: styles.editorContent,
            },
        },
    });

    const handleClickSave = async () => {
        const htmlContent = editor?.getHTML();
        if (htmlContent) {
            try {
                handleSuccess("הפעולה נשמרה בהצלחה! תוכלו למצוא אותה באזור הפעולות שלי");
                const convertedContent = convertHTMLToContent(htmlContent);
                const newUpdatedActivity = updateActivityWithContent(activity, convertedContent);
                await fetchSaveActivity(newUpdatedActivity);
                updateMainActivity(newUpdatedActivity);
                await getSavedActivities();
            } catch (error) {
                handleError("הפעולה לא נשמרה, אנא נסו שנית");
            }
        }
    };

    return (
        <section className={styles.container}>
            <div className={styles.toolbar}>
                <button onClick={handleClickSave} className={styles.saveButton} title="Save">
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
        </section>
    );
};

export default RichTextEditor;
