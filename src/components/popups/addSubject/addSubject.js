import React, { useState } from 'react'; // Import useState
import styles from './addSubject.module.css';
import { MdDownloadDone, MdCancel } from "react-icons/md";

function AddSubject({ closePopup }) {
    const [inputValue, setInputValue] = useState("");

    const handleIconClick = () => {
        if (inputValue.trim()) {
            closePopup(inputValue);
        }
    };

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div className={styles.container} onClick={handleClick}>
            <MdCancel className={styles.cancel_btn} onClick={() => closePopup()}></MdCancel>
            
            <label>אנא בחרו נושא</label>
            
            <div className={styles.input_btn_div}>
                <input type='text' value={inputValue} onChange={handleChange}></input>
                <MdDownloadDone className={styles.icon} onClick={handleIconClick}></MdDownloadDone>
            </div>
        </div>
    );
}

export default AddSubject;
