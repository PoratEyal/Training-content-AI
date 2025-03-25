import React from "react";
import styles from "./EditorOptStyle.module.css";
import { FaBold, FaListOl, FaListUl } from "react-icons/fa6";
import { Editor } from "@tiptap/react";

type EditorOptStyleProps = {
    editor: Editor;
};

const EditorOptStyle: React.FC<EditorOptStyleProps> = ({ editor }) => {
    return (
        <div className={styles.toolbar}>
            <button
                className={`${styles.toolbarButton} ${editor?.isActive("bold") ? styles.toolbarButtonActive : ""}`}
                onClick={() => editor?.chain().focus().toggleBold().run()}
                title="Bold"
            >
                <FaBold />
            </button>
            <div className={styles.separator} />
            <button
                className={`${styles.toolbarButton} ${editor?.isActive("bulletList") ? styles.toolbarButtonActive : ""}`}
                onClick={() => editor?.chain().focus().toggleBulletList().run()}
                title="Bullet List"
            >
                <FaListUl />
            </button>
            <button
                className={`${styles.toolbarButton} ${editor?.isActive("orderedList") ? styles.toolbarButtonActive : ""}`}
                onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                title="Numbered List"
            >
                <FaListOl />
            </button>
        </div>
    );
};

export default EditorOptStyle;
