import React, { useEffect, useRef, useState } from "react";
import styles from "./Hint.module.css";
import { RxQuestionMarkCircled } from "react-icons/rx";

function Hint({ hint }) {
    const [showHint, setShowHint] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setShowHint(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);

    const handleOnClick = () => {
        setShowHint(prev => !prev);
    };

    return (
        <section className={styles.hintContainer}>
            <div onClick={handleOnClick} className={styles.hintBtn}>
                <RxQuestionMarkCircled />
            </div>
            {showHint ? <div className={styles.hint}>{hint}</div> : null}
        </section>
    );
}

export default Hint;
