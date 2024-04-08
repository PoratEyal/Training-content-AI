import React, { useEffect, useState } from 'react';
import styles from './activity.module.css';
import { useContentContext } from '../../context/ContentContext';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowBack } from "react-icons/io";

function Activity() {
    const { data } = useContentContext();
    const navigate = useNavigate();

    const [iconClickedPoint, setIconClickedPoint] = useState(false)
    const [iconClickedContent, setIconClickedContent] = useState(false)
    const [iconClickedScoutingTime, setIconClickedScoutingTime] = useState(false)
    const [iconClickedPlaying, setIconClickedPlaying] = useState(false)

    const generateAgain = async () => {

    }

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

            <IoMdArrowBack onClick={() => navigate('/choosePath')} className={styles.back_icon}></IoMdArrowBack>

            {data.pointOfView.use &&
                <div className={styles.activity_div}>
                    <div className={styles.h2_icon_div}>
                        <h2>נקודת מבט</h2>
                        <img onClick={() => generateAgain(1)} className={styles.svg_icon} src='ai.svg'></img>
                    </div>
                    {formatTextWithLineBreaks(data.pointOfView.data)}
                </div>}

            {data.contentActivity.use &&
                <div className={styles.activity_div}>
                    <div className={styles.h2_icon_div}>
                        <h2>פעילות תוכן</h2>
                        <img onClick={() => generateAgain(2)} className={styles.svg_icon} src='ai.svg'></img>
                    </div>
                    {formatTextWithLineBreaks(data.contentActivity.data)}
                </div>}

            {data.scoutingTime.use &&
                <div className={styles.activity_div}>
                    <div className={styles.h2_icon_div}>
                        <h2>זמן צופיות</h2>
                        <img onClick={() => generateAgain(3)} className={styles.svg_icon} src='ai.svg'></img>
                    </div>
                    {formatTextWithLineBreaks(data.scoutingTime.data)}
                </div>}

            {data.playingTime.use &&
                <div className={styles.activity_div}>
                    <div className={styles.h2_icon_div}>
                        <h2>זמן משחק</h2>
                        <img onClick={() => generateAgain(4)} className={styles.svg_icon} src='ai.svg'></img>
                    </div>
                    {formatTextWithLineBreaks(data.playingTime.data)}
                </div>}

            {/* <a href={data.img[0]?.url} download={`image.jpg`}><img className={styles.img} src={data.img[0]?.url} alt="Generated img" /></a> */}

        </div>
    );
}

export default Activity;
