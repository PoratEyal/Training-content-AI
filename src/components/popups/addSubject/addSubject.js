import React from 'react';
import styles from './addSubject.module.css';
import { MdDownloadDone } from "react-icons/md";
import { MdCancel } from "react-icons/md";

function AddSubject({ closePopup }) {

    const handleClick = (e) => {
        e.stopPropagation();
    };
    
    return (
        <div className={styles.container}  onClick={handleClick}>
            <MdCancel className={styles.cancel_btn} onClick={closePopup}></MdCancel>
            
            <label>אנא בחרו נושא</label>
            
            <div className={styles.input_btn_div}>
                <input type='text'></input>
                <MdDownloadDone></MdDownloadDone>
            </div>
        </div>
    );
}

export default AddSubject