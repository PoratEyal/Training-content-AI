import React, { useState } from "react";
import styles from "./RichTextEditor.module.css";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { convertContentToHTML } from "../../utils/format";
import { Activity } from "../../models/types/activity";
import "./RichTextEditor.css";
import EditorOptSave from "../options/editor/EditorOptSave/EditorOptSave";
import EditorOptReadOnly from "../options/editor/EditorOptReadOnly/EditorOptReadOnly";
import EditorOptStyle from "../options/editor/EditorOptStyle/EditorOptStyle";
import ArticleOptions from "../ArticleOptions/ArticleOptions";

type RichTextEditorProps = {
    activity: Activity | undefined;
};

const RichTextEditor: React.FC<RichTextEditorProps> = ({ activity }) => {
    const [isLimitExceeded, setIsLimitExceeded] = useState<boolean>(false);
    const MAX_CHARS = 3000;

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

    const Options = [
        <EditorOptReadOnly activity={activity} />,
        <EditorOptSave activity={activity} htmlContent={editor?.getHTML()} />,
        <EditorOptStyle editor={editor} />,
    ].filter(Boolean);

    return (
        <section className={styles.container}>
            <ArticleOptions Options={Options} />
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
