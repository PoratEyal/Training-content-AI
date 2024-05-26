import React, { useRef, useState } from "react";
import styles from "./Hint.module.css";
import { RxQuestionMarkCircled } from "react-icons/rx";
import useClickOutside from "../../hooks/useClickOutside";

function Hint({ hint }) {
    const [showHint, setShowHint] = useState(false);
    const ref = useRef(null);
    useClickOutside(ref, () => setShowHint(false));

    const handleOnClick = () => {
        setShowHint(prev => !prev);
    };

    return (
        <section className={styles.hintContainer} ref={ref}>
            <div onClick={handleOnClick} className={styles.hintBtn}>
                <RxQuestionMarkCircled />
            </div>
            {showHint ? <div className={styles.hint}>{hint}</div> : null}
        </section>
    );
}

export default Hint;
