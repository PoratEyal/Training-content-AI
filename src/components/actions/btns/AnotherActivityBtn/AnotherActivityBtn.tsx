import styles from "./AnotherActivityBtn.module.css";
import { AiOutlineLoading } from "react-icons/ai";

type AnotherActivityBtnProps = {
    loadingGenerate: boolean;
    generateAgain: () => Promise<void>;
};

function AnotherActivityBtn({ loadingGenerate, generateAgain }: AnotherActivityBtnProps) {
    return (
        <button onClick={generateAgain} className={styles.button}>
            {!loadingGenerate ? (
                <div className={styles.btn_content_div}>
                    <label>פעילות אחרת</label>
                </div>
            ) : (
                <div className={styles.btn_content_div}>
                    <AiOutlineLoading className={styles.icon_more}></AiOutlineLoading>
                </div>
            )}
        </button>
    );
}

export default AnotherActivityBtn;
