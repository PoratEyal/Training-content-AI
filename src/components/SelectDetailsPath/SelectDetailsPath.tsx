import React from "react";
import styles from "./SelectDetailsPath.module.css";

function SelectDetails({ data, placeholder, obj, setObj }) {
    return (
        <div className={styles.input_div}>
            <select value={obj} onChange={(e) => setObj(e.target.value)} aria-label={placeholder}>
                <option value="" disabled>
                    {placeholder}
                </option>
                {data.map((level) => (
                    <option key={level} value={level}>
                        {level}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default SelectDetails;
