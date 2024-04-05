import React, { useEffect } from 'react';
import styles from './activity.module.css';
import { useContentContext } from '../../context/ContentContext';
import { useNavigate } from 'react-router-dom';

function Activity() {
    const { data } = useContentContext();
    const navigate = useNavigate();

    // Function to format the activity text with line breaks
    const formatTextWithLineBreaks = (text) => {
        return text.split('\n').map((line, index, array) => (
            <React.Fragment key={index}>
                {line}
                {index !== array.length - 1 && <br />}
            </React.Fragment>
        ));
    };

    return (
        <div className={styles.container}>

            <h2>הפעילות שלך מוכנה</h2>

            <div className={styles.activity_div}>
                {formatTextWithLineBreaks(data.activity)}
            </div>

            <a href={data.img[0]?.url} download={`image.jpg`}><img className={styles.img} src={data.img[0]?.url} alt="Generated img" /></a>

        </div>
    );
}

export default Activity;
