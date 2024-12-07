import React, { useState } from 'react';
import styles from './FabSave.module.css';

type Props = {
    text?: string;
};

const FabSave: React.FC<Props> = ({ text }) => {
    const [checked, setChecked] = useState(false);

    const handleClick = () => {
        setChecked(prev => !prev);
        console.log("Activity saved:", text);
    };

    return (
        <div 
            className={`${styles.bookmark} ${checked ? styles.checked : ''}`} 
            onClick={handleClick}
            role="button"
            aria-pressed={checked}
        >
            <svg
                className={styles.svgIcon}
                viewBox="0 0 50 70"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M46 62.0085L46 3.88139L3.99609 3.88139L3.99609 62.0085L24.5 45.5L46 62.0085Z"
                ></path>
            </svg>
        </div>
    );
};

export default FabSave;
