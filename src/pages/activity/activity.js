import React, { useState } from 'react';
import styles from './activity.module.css';
import { useContentContext } from '../../context/ContentContext';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowBack } from "react-icons/io";
import { AiOutlineLoading } from "react-icons/ai";
import { FaWhatsapp } from "react-icons/fa";
import { BsFiletypeDocx } from "react-icons/bs";
import { getPointOfView, getContentActivity, getScoutingTime, getPlayingTime, getMoreContent } from '../../service/openAiPrompts';

function Activity() {
    
    const { data,
        updatePointOfView,
        updateContentActivity,
        updateScoutingTime,
        updatePlayingTime,
        resetAllUseFields
    } = useContentContext();

    const navigate = useNavigate();

    const [iconClickedPoint, setIconClickedPoint] = useState(false)
    const [moreDataPoint, setMoreDataPoint] = useState(false)

    const [iconClickedContent, setIconClickedContent] = useState(false)
    const [moreDataContent, setMoreDataContent] = useState(false)

    const [iconClickedScoutingTime, setIconClickedScoutingTime] = useState(false)
    const [moreDataScoutingTime, setMoreDataScoutingTime] = useState(false)

    const [iconClickedPlaying, setIconClickedPlaying] = useState(false)
    const [moreDataPlaying, setMoreDataPlaying] = useState(false)

    const generateAgain = async (index) => {
        if(index == 1){
            setIconClickedPoint(true)
            const result = await getPointOfView(data.pointOfView.subject, data.pointOfView.time, data.amount, data.grade, data.gender, data.place)
            updatePointOfView(data.pointOfView.subject, data.pointOfView.time, result)
            setIconClickedPoint(false)
        }
        if(index == 2){
            setIconClickedContent(true)
            const result = await getContentActivity(data.contentActivity.subject, data.contentActivity.time, data.amount, data.grade, data.gender, data.place)
            updateContentActivity(data.contentActivity.subject, data.contentActivity.time, result)
            setIconClickedContent(false)
        }
        if(index == 3){
            setIconClickedScoutingTime(true)
            const result = await getScoutingTime(data.scoutingTime.subject, data.scoutingTime.time, data.amount, data.grade, data.gender, data.place)
            updateScoutingTime(data.scoutingTime.subject, data.scoutingTime.time, result)
            setIconClickedScoutingTime(false)
        }
        if(index == 4){
            setIconClickedPlaying(true)
            const result = await getPlayingTime(data.playingTime.subject, data.playingTime.time, data.amount, data.grade, data.gender, data.place)
            updatePlayingTime(data.playingTime.subject, data.playingTime.time, result)
            setIconClickedPlaying(false)
        }
    }

    const moreData = async (index) => {
        if(index == 1){
            setMoreDataPoint(true)
            const result = await getMoreContent(data.pointOfView.data)
            updatePointOfView(data.pointOfView.subject, data.pointOfView.time, result)
            setMoreDataPoint(false)
        }
        if(index == 2){
            setMoreDataContent(true)
            const result = await getMoreContent(data.contentActivity.data)
            updateContentActivity(data.contentActivity.subject, data.contentActivity.time, result)
            setMoreDataContent(false)
        }
        if(index == 3){
            setMoreDataScoutingTime(true)
            const result = await getMoreContent(data.scoutingTime.data)
            updateScoutingTime(data.scoutingTime.subject, data.scoutingTime.time, result)
            setMoreDataScoutingTime(false)
        }
        if(index == 4){
            setMoreDataPlaying(true)
            const result = await getMoreContent(data.playingTime.data)
            updatePlayingTime(data.playingTime.subject, data.playingTime.time, result)
            setMoreDataPlaying(false)
        }
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

    const goingBack = () => {
        resetAllUseFields()
        navigate('/choosePath')
    }

    return (
        <div className={styles.container}>

            <IoMdArrowBack onClick={goingBack} className={styles.back_icon}></IoMdArrowBack>

            {data.pointOfView.use &&
                <div className={styles.activity_div}>
                    <div className={styles.h2_icon_div}>
                        <h2>נקודת מבט</h2>
                    </div>
                    {formatTextWithLineBreaks(data.pointOfView.data)}
                    
                    <div className={styles.buttons_div}>
                        <button onClick={() => generateAgain(1)} className={styles.button}>
                            <label onClick={() => generateAgain(1)}>דוגמא נוספת</label>
                            {iconClickedPoint &&
                                <AiOutlineLoading className={styles.icon_more}></AiOutlineLoading>}
                        </button>

                        <button onClick={() => moreData(1)} className={styles.button}>
                            <label onClick={() => moreData(1)}>הרחבת התוכן</label>
                            {moreDataPoint &&
                                <AiOutlineLoading className={styles.icon_more}></AiOutlineLoading>}
                        </button>
                    </div>

                </div>}

            {data.contentActivity.use &&
                <div className={styles.activity_div}>
                    <div className={styles.h2_icon_div}>
                        <h2>פעילות תוכן</h2>
                    </div>
                    {formatTextWithLineBreaks(data.contentActivity.data)}

                    <div className={styles.buttons_div}>
                        <button onClick={() => generateAgain(2)} className={styles.button}>
                            <label onClick={() => generateAgain(2)}>דוגמא נוספת</label>
                            {iconClickedPoint &&
                                <AiOutlineLoading className={styles.icon_more}></AiOutlineLoading>}
                        </button>

                        <button onClick={() => moreData(2)} className={styles.button}>
                            <label onClick={() => moreData(2)}>הרחבת התוכן</label>
                            {moreDataPoint &&
                                <AiOutlineLoading className={styles.icon_more}></AiOutlineLoading>}
                        </button>
                    </div>
                </div>}

            {data.scoutingTime.use &&
                <div className={styles.activity_div}>
                    <div className={styles.h2_icon_div}>
                        <h2>זמן צופיות</h2>
                    </div>
                    {formatTextWithLineBreaks(data.scoutingTime.data)}

                    <div className={styles.buttons_div}>
                        <button onClick={() => generateAgain(3)} className={styles.button}>
                            <label onClick={() => generateAgain(3)}>דוגמא נוספת</label>
                            {iconClickedPoint &&
                                <AiOutlineLoading className={styles.icon_more}></AiOutlineLoading>}
                        </button>

                        <button onClick={() => moreData(3)} className={styles.button}>
                            <label onClick={() => moreData(3)}>הרחבת התוכן</label>
                            {moreDataPoint &&
                                <AiOutlineLoading className={styles.icon_more}></AiOutlineLoading>}
                        </button>
                    </div>
                </div>}

            {data.playingTime.use &&
                <div className={styles.activity_div}>
                    <div className={styles.h2_icon_div}>
                        <h2>זמן משחק</h2>
                    </div>
                    {formatTextWithLineBreaks(data.playingTime.data)}

                    <div className={styles.buttons_div}>
                        <button onClick={() => generateAgain(4)} className={styles.button}>
                            <label onClick={() => generateAgain(4)}>דוגמא נוספת</label>
                            {iconClickedPoint &&
                                <AiOutlineLoading className={styles.icon_more}></AiOutlineLoading>}
                        </button>

                        <button onClick={() => moreData(4)} className={styles.button}>
                            <label onClick={() => moreData(4)}>הרחבת התוכן</label>
                            {moreDataPoint &&
                                <AiOutlineLoading className={styles.icon_more}></AiOutlineLoading>}
                        </button>
                    </div>
                </div>}

            {/* <a href={data.img[0]?.url} download={`image.jpg`}><img className={styles.img} src={data.img[0]?.url} alt="Generated img" /></a> */}

        </div>
    );
}

export default Activity;
