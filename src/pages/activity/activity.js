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
    const [whatsupPoint, setWhatsupPoint] = useState(false)
    const [docsPoint, setDocsPoint] = useState(false)

    const [iconClickedContent, setIconClickedContent] = useState(false)
    const [moreDataContent, setMoreDataContent] = useState(false)
    const [whatsupContent, setWhatsupContent] = useState(false)
    const [docsContent, setDocsContent] = useState(false)

    const [iconClickedScoutingTime, setIconClickedScoutingTime] = useState(false)
    const [moreDataScoutingTime, setMoreDataScoutingTime] = useState(false)
    const [whatsupScoutingTime, setWhatsupScoutingTime] = useState(false)
    const [docsScoutingTime, setDocsScoutingTime] = useState(false)

    const [iconClickedPlaying, setIconClickedPlaying] = useState(false)
    const [moreDataPlaying, setMoreDataPlaying] = useState(false)
    const [whatsupPlaying, setWhatsupPlaying] = useState(false)
    const [docsPlaying, setDocsPlaying] = useState(false)

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

    const importWhatsup = (index) => {
        if (index === 1) {
            setWhatsupPoint(true)
            const message = encodeURIComponent(data.pointOfView.data);
            const whatsappUrl = `https://wa.me/?text=${message}`;
    
            window.open(whatsappUrl, '_blank');
            setWhatsupPoint(false)
        }
        if (index === 2) {
            setWhatsupContent(true)
            const message = encodeURIComponent(data.contentActivity.data);
            const whatsappUrl = `https://wa.me/?text=${message}`;
    
            window.open(whatsappUrl, '_blank');
            setWhatsupContent(false)
        }
        if (index === 3) {
            setWhatsupScoutingTime(true)
            const message = encodeURIComponent(data.scoutingTime.data);
            const whatsappUrl = `https://wa.me/?text=${message}`;
    
            window.open(whatsappUrl, '_blank');
            setWhatsupScoutingTime(false)
        }
        if (index === 4) {
            setWhatsupPlaying(true)
            const message = encodeURIComponent(data.playingTime.data);
            const whatsappUrl = `https://wa.me/?text=${message}`;
    
            window.open(whatsappUrl, '_blank');
            setWhatsupPlaying(false)
        }
    }
    
    const importDocs = async (index) => {
        if (index === 1) {
            setDocsPoint(true);
            console.log(data.pointOfView.data);
    
            const newWindow = window.open('', '_blank');
            if(newWindow) {
                newWindow.document.write(`
                    <html>
                    <head>
                        <title>נקודת מבט</title>
                        <style>
                            body { 
                                text-align: right; 
                                direction: rtl; 
                                font-family: 'Fredoka', sans-serif;
                            }
                            h1 {
                                font-weight: bold;
                                font-family: 'Fredoka', sans-serif;
                            }
                        </style>
                    </head>
                    <body>
                        <h1>נקודת מבט</h1>
                        <pre>${data.pointOfView.data}</pre>
                    </body>
                    </html>
                `);
                newWindow.document.close();
            } else {
                alert('Pop-up blocker might have prevented opening the new window.');
            }
    
            setDocsPoint(false);
        }
        if (index === 2) {
            setDocsPoint(true);
            console.log(data.pointOfView.data);
    
            const newWindow = window.open('', '_blank');
            if(newWindow) {
                newWindow.document.write(`
                    <html>
                    <head>
                        <title>פעילות תוכן</title>
                        <style>
                            body { 
                                text-align: right; 
                                direction: rtl; 
                                font-family: 'Fredoka', sans-serif;
                            }
                            h1 {
                                font-weight: bold;
                                font-family: 'Fredoka', sans-serif;
                            }
                        </style>
                    </head>
                    <body>
                        <h1>פעילות תוכן</h1>
                        <pre>${data.contentActivity.data}</pre>
                    </body>
                    </html>
                `);
                newWindow.document.close();
            } else {
                alert('Pop-up blocker might have prevented opening the new window.');
            }
    
            setDocsPoint(false);
        }
        if (index === 3) {
            setDocsPoint(true);
            console.log(data.pointOfView.data);
    
            const newWindow = window.open('', '_blank');
            if(newWindow) {
                newWindow.document.write(`
                    <html>
                    <head>
                        <title>זמן צופיות</title>
                        <style>
                            body { 
                                text-align: right; 
                                direction: rtl; 
                                font-family: 'Fredoka', sans-serif;
                            }
                            h1 {
                                font-weight: bold;
                                font-family: 'Fredoka', sans-serif;
                            }
                        </style>
                    </head>
                    <body>
                        <h1>זמן צופיות</h1>
                        <pre>${data.scoutingTime.data}</pre>
                    </body>
                    </html>
                `);
                newWindow.document.close();
            } else {
                alert('Pop-up blocker might have prevented opening the new window.');
            }
    
            setDocsPoint(false);
        }
        if (index === 4) {
            setDocsPoint(true);
            console.log(data.pointOfView.data);
    
            const newWindow = window.open('', '_blank');
            if(newWindow) {
                newWindow.document.write(`
                    <html>
                    <head>
                        <title>זמן משחק</title>
                        <style>
                            body { 
                                text-align: right; 
                                direction: rtl; 
                                font-family: 'Fredoka', sans-serif;
                            }
                            h1 {
                                font-weight: bold;
                                font-family: 'Fredoka', sans-serif;
                            }
                        </style>
                    </head>
                    <body>
                        <h1>זמן משחק</h1>
                        <pre>${data.playingTime.data}</pre>
                    </body>
                    </html>
                `);
                newWindow.document.close();
            } else {
                alert('Pop-up blocker might have prevented opening the new window.');
            }
    
            setDocsPoint(false);
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
                        <div className={styles.icons}>
                            {!whatsupPoint ? <FaWhatsapp onClick={() => importWhatsup(1)}></FaWhatsapp> : <AiOutlineLoading></AiOutlineLoading>}
                            {!docsPoint ? <BsFiletypeDocx onClick={() => importDocs(1)}></BsFiletypeDocx> : <AiOutlineLoading></AiOutlineLoading>}
                        </div>
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
                        <div className={styles.icons}>
                            {!whatsupContent ? <FaWhatsapp onClick={() => importWhatsup(2)}></FaWhatsapp> : <AiOutlineLoading></AiOutlineLoading>}
                            {!docsContent ? <BsFiletypeDocx onClick={() => importDocs(2)}></BsFiletypeDocx> : <AiOutlineLoading></AiOutlineLoading>}
                        </div>
                    </div>
                    {formatTextWithLineBreaks(data.contentActivity.data)}

                    <div className={styles.buttons_div}>
                        <button onClick={() => generateAgain(2)} className={styles.button}>
                            <label onClick={() => generateAgain(2)}>דוגמא נוספת</label>
                            {iconClickedContent &&
                                <AiOutlineLoading className={styles.icon_more}></AiOutlineLoading>}
                        </button>

                        <button onClick={() => moreData(2)} className={styles.button}>
                            <label onClick={() => moreData(2)}>הרחבת התוכן</label>
                            {moreDataContent &&
                                <AiOutlineLoading className={styles.icon_more}></AiOutlineLoading>}
                        </button>
                    </div>
                </div>}

            {data.scoutingTime.use &&
                <div className={styles.activity_div}>
                    <div className={styles.h2_icon_div}>
                        <h2>זמן צופיות</h2>
                        <div className={styles.icons}>
                            {!whatsupScoutingTime ? <FaWhatsapp onClick={() => importWhatsup(3)}></FaWhatsapp> : <AiOutlineLoading></AiOutlineLoading>}
                            {!docsScoutingTime ? <BsFiletypeDocx onClick={() => importDocs(3)}></BsFiletypeDocx> : <AiOutlineLoading></AiOutlineLoading>}
                        </div>
                    </div>
                    {formatTextWithLineBreaks(data.scoutingTime.data)}

                    <div className={styles.buttons_div}>
                        <button onClick={() => generateAgain(3)} className={styles.button}>
                            <label onClick={() => generateAgain(3)}>דוגמא נוספת</label>
                            {iconClickedScoutingTime &&
                                <AiOutlineLoading className={styles.icon_more}></AiOutlineLoading>}
                        </button>

                        <button onClick={() => moreData(3)} className={styles.button}>
                            <label onClick={() => moreData(3)}>הרחבת התוכן</label>
                            {moreDataScoutingTime &&
                                <AiOutlineLoading className={styles.icon_more}></AiOutlineLoading>}
                        </button>
                    </div>
                </div>}

            {data.playingTime.use &&
                <div className={styles.activity_div}>
                    <div className={styles.h2_icon_div}>
                        <h2>זמן משחק</h2>
                        <div className={styles.icons}>
                            {!whatsupPlaying ? <FaWhatsapp onClick={() => importWhatsup(4)}></FaWhatsapp> : <AiOutlineLoading></AiOutlineLoading>}
                            {!docsPlaying ? <BsFiletypeDocx onClick={() => importDocs(4)}></BsFiletypeDocx> : <AiOutlineLoading></AiOutlineLoading>}
                        </div>
                    </div>
                    {formatTextWithLineBreaks(data.playingTime.data)}

                    <div className={styles.buttons_div}>
                        <button onClick={() => generateAgain(4)} className={styles.button}>
                            <label onClick={() => generateAgain(4)}>דוגמא נוספת</label>
                            {iconClickedPlaying &&
                                <AiOutlineLoading className={styles.icon_more}></AiOutlineLoading>}
                        </button>

                        <button onClick={() => moreData(4)} className={styles.button}>
                            <label onClick={() => moreData(4)}>הרחבת התוכן</label>
                            {moreDataPlaying &&
                                <AiOutlineLoading className={styles.icon_more}></AiOutlineLoading>}
                        </button>
                    </div>
                </div>}

        </div>
    );
}

export default Activity;
