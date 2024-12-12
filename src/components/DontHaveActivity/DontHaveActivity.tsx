import styles from "./DontHaveActivity.module.css";

function DontHaveActivity() {
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>עדיין לא שמרתם פעולות?</h3>
            <div className={styles.mainText}>
                <div>לשמירת הפעולות, לחצו על כפתור ה </div>
                <div className={styles.iconWrapper}>
                    <svg
                        className={styles.svgIcon}
                        viewBox="0 0 50 70"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M46 62.0085L46 3.88139L3.99609 3.88139L3.99609 62.0085L24.5 45.5L46 62.0085Z"></path>
                    </svg>
                </div>
            </div>
            <div>לאחר יצירת פעולת חדשה</div>
        </div>
    );
}

export default DontHaveActivity;
