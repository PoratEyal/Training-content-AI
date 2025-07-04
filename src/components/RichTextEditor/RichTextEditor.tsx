import React, { useState, useEffect } from "react";
import styles from "./RichTextEditor.module.css";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { convertContentToHTML } from "../../utils/format";
import { Activity } from "../../models/types/activity";
import EditorOptSave from "../options/editor/EditorOptSave/EditorOptSave";
import EditorOptStyle from "../options/editor/EditorOptStyle/EditorOptStyle";
import ArticleOptions from "../ArticleOptions/ArticleOptions";
import "./RichTextEditor.css";
import { useEditorContext } from "../../context/EditorContext";
import { useLanguage } from "../../i18n/useLanguage";

type RichTextEditorProps = {
    activity: Activity | undefined;
};

const RichTextEditor: React.FC<RichTextEditorProps> = ({ activity }) => {
    const { t, dir } = useLanguage();
    const { updateActivity } = useEditorContext();
    const [isLimitExceeded, setIsLimitExceeded] = useState<boolean>(false);
    const [debouncedHtml, setDebouncedHtml] = useState<string>("");
    const [lastUpdateTime, setLastUpdateTime] = useState<number>(Date.now());
    const MAX_CHARS = 3000;
    const DEBOUNCE_DELAY = 3000;
    const MIN_UPDATE_INTERVAL = 5000;

    useEffect(() => {
        const timer = setTimeout(() => {
            if (debouncedHtml && activity) {
                const now = Date.now();
                if (now - lastUpdateTime >= MIN_UPDATE_INTERVAL) {
                    updateActivity(activity, debouncedHtml);
                    setLastUpdateTime(now);
                }
            }
        }, DEBOUNCE_DELAY);

        return () => clearTimeout(timer);
    }, [debouncedHtml, activity, updateActivity, lastUpdateTime]);

    const editor = useEditor({
        extensions: [StarterKit],
        content: convertContentToHTML(activity?.activity || ""),
        onUpdate: ({ editor }) => {
            setDebouncedHtml(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: `${styles.editorContent} ${styles[dir]}`,
                dir: dir,
            },
            handleKeyDown: (view, event) => {
                const text = view.state.doc.textContent;

                if (
                    event.key === "Backspace" ||
                    event.key === "Delete" ||
                    event.key.startsWith("Arrow") ||
                    event.ctrlKey ||
                    event.metaKey
                ) {
                    setIsLimitExceeded(false);
                    return false;
                }

                if (text.length >= MAX_CHARS) {
                    setIsLimitExceeded(true);
                    return true;
                }

                setIsLimitExceeded(false);
                return false;
            },
        },
    });

    const Options = [
        <EditorOptStyle editor={editor} />,
        <EditorOptSave activity={activity} htmlContent={editor?.getHTML()} />,
    ].filter(Boolean);

    return (
        <section className={styles.container} style={{ direction: dir }}>
            <ArticleOptions Options={Options} backgroundColor={"#FFFFFF"} />
            <EditorContent 
                editor={editor} 
                className={`${styles.editor} ${styles[dir]}`}
            />
            <div className={styles.charCounter}>
                {isLimitExceeded && (
                    <span className={styles.charLimitWarning}>{t('editor.charLimitWarning')}</span>
                )}
            </div>
        </section>
    );
};

export default RichTextEditor;
