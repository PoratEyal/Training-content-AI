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

type RichTextEditorProps = {
    activity: Activity | undefined;
};

const RichTextEditor: React.FC<RichTextEditorProps> = ({ activity }) => {
    const { getSavedActivities } = useSaveContext()

    const editor = useEditor({
        extensions: [StarterKit],
        content: convertContentToHTML(activity?.activity || ""),
        editorProps: {
            attributes: {
                class: styles.editorContent,
            },
        },
    });

    const handleClick = async () => {
        const htmlContent = editor?.getHTML();
        if (htmlContent) {
            const convertedContent = convertHTMLToContent(htmlContent);
            await fetchSaveActivity(updateActivityWithContent(activity, convertedContent));
            await getSavedActivities();
        }
    };

    return (
        <section className={styles.container}>
            <div className={styles.toolbar}>
                <button onClick={handleClick} className={styles.saveButton} title="Save">
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
