import React, { useState } from 'react';
import styles from './activity.module.css';
import { useContentContext } from '../../context/ContentContext';
import { useNavigate } from 'react-router-dom';
import { IoArrowForward } from "react-icons/io5";
import { AiOutlineLoading } from "react-icons/ai";
import { FaWhatsapp } from "react-icons/fa";
import { BsFiletypeDocx } from "react-icons/bs";
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph } from 'docx';
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
            setWhatsupPoint(true);
            const message = encodeURIComponent("*נקודת מבט*\n" + data.pointOfView.data);
            const whatsappUrl = `https://wa.me/?text=${message}`;
            window.location.href = whatsappUrl;
            setWhatsupPoint(false);
        }        
        if (index === 2) {
            setWhatsupContent(true)
            const message = encodeURIComponent("*פעילות תוכן*\n" + data.contentActivity.data);
            const whatsappUrl = `https://wa.me/?text=${message}`;
            window.location.href = whatsappUrl;
            setWhatsupContent(false)
        }
        if (index === 3) {
            setWhatsupScoutingTime(true)
            const message = encodeURIComponent("*זמן תנועת נוער*\n" + data.scoutingTime.data);
            const whatsappUrl = `https://wa.me/?text=${message}`;
            window.location.href = whatsappUrl;
            setWhatsupScoutingTime(false)
        }
        if (index === 4) {
            setWhatsupPlaying(true)
            const message = encodeURIComponent("*זמן משחק*\n" + data.playingTime.data);
            const whatsappUrl = `https://wa.me/?text=${message}`;
            window.location.href = whatsappUrl;
            setWhatsupPlaying(false)
        }
    }
    
    const importDocs = async (index) => {
        if (index === 1) {
            setDocsPoint(true);
            const doc = new Document({
                styles: {
                    paragraphStyles: [
                        {
                            id: 'headerStyle',
                            name: 'Header Style',
                            basedOn: 'Heading3',  // Use Heading3 as the base for size and other attributes
                            next: 'Normal',
                            quickFormat: true,
                            run: {
                                bold: true,  // Make the text bold
                                size: 32,  // Font size, where 32 is equivalent to 16pt
                                font: {
                                    name: 'Arial'  // Ensuring the font is a commonly supported sans-serif
                                }
                            },
                            paragraph: {
                                spacing: {
                                    after: 200,  // Spacing after the paragraph to separate from the next
                                }
                            }
                        }
                    ]
                },
                sections: [
                    {
                        properties: {},
                        children: [
                            new Paragraph({
                                text: "נקודת מבט",
                                style: 'headerStyle',
                                bidirectional: true
                            }),
                            new Paragraph({
                                text: data.pointOfView.data,
                                style: 'Normal',
                                bidirectional: true,
                                rightToLeft: true,
                            })
                        ],
                    },
                ],
            });
            
            Packer.toBlob(doc).then(blob => {
                saveAs(blob, "פעילות נקודת מבט.docx");
            });
            setDocsPoint(false);
        }        
        if (index === 2) {
            setDocsContent(true);
            const doc = new Document({
                styles: {
                    paragraphStyles: [
                        {
                            id: 'headerStyle',
                            name: 'Header Style',
                            basedOn: 'Heading3',  // Use Heading3 as the base for size and other attributes
                            next: 'Normal',
                            quickFormat: true,
                            run: {
                                bold: true,  // Make the text bold
                                size: 32,  // Font size, where 32 is equivalent to 16pt
                                font: {
                                    name: 'Arial'  // Ensuring the font is a commonly supported sans-serif
                                }
                            },
                            paragraph: {
                                spacing: {
                                    after: 200,  // Spacing after the paragraph to separate from the next
                                }
                            }
                        }
                    ]
                },
                sections: [
                    {
                        properties: {},
                        children: [
                            new Paragraph({
                                text: "פעילות תוכן",
                                style: 'headerStyle',
                                bidirectional: true
                            }),
                            new Paragraph({
                                text: data.contentActivity.data,
                                style: 'Normal',
                                bidirectional: true,
                                rightToLeft: true,
                            })
                        ],
                    },
                ],
            });
            Packer.toBlob(doc).then(blob => {
                saveAs(blob, "פעילות תוכן.docx");
            });
            setDocsContent(false);
        }
        if (index === 3) {
            setDocsScoutingTime(true);
            const doc = new Document({
                styles: {
                    paragraphStyles: [
                        {
                            id: 'headerStyle',
                            name: 'Header Style',
                            basedOn: 'Heading3',  // Use Heading3 as the base for size and other attributes
                            next: 'Normal',
                            quickFormat: true,
                            run: {
                                bold: true,  // Make the text bold
                                size: 32,  // Font size, where 32 is equivalent to 16pt
                                font: {
                                    name: 'Arial'  // Ensuring the font is a commonly supported sans-serif
                                }
                            },
                            paragraph: {
                                spacing: {
                                    after: 200,  // Spacing after the paragraph to separate from the next
                                }
                            }
                        }
                    ]
                },
                sections: [
                    {
                        properties: {},
                        children: [
                            new Paragraph({
                                text: "זמן תנועת נוער",
                                style: 'headerStyle',
                                bidirectional: true
                            }),
                            new Paragraph({
                                text: data.scoutingTime.data,
                                style: 'Normal',
                                bidirectional: true,
                                rightToLeft: true,
                            })
                        ],
                    },
                ],
            });
            Packer.toBlob(doc).then(blob => {
                saveAs(blob, "זמן תנועת נוער.docx");
            });
            setDocsScoutingTime(false);
        }
        if (index === 4) {
            setDocsPlaying(true);
            const doc = new Document({
                styles: {
                    paragraphStyles: [
                        {
                            id: 'headerStyle',
                            name: 'Header Style',
                            basedOn: 'Heading3',  // Use Heading3 as the base for size and other attributes
                            next: 'Normal',
                            quickFormat: true,
                            run: {
                                bold: true,  // Make the text bold
                                size: 32,  // Font size, where 32 is equivalent to 16pt
                                font: {
                                    name: 'Arial'  // Ensuring the font is a commonly supported sans-serif
                                }
                            },
                            paragraph: {
                                spacing: {
                                    after: 200,  // Spacing after the paragraph to separate from the next
                                }
                            }
                        }
                    ]
                },
                sections: [
                    {
                        properties: {},
                        children: [
                            new Paragraph({
                                text: "זמן משחק",
                                style: 'headerStyle',
                                bidirectional: true
                            }),
                            new Paragraph({
                                text: data.playingTime.data,
                                style: 'Normal',
                                bidirectional: true,
                                rightToLeft: true,
                            })
                        ],
                    },
                ],
            });
            Packer.toBlob(doc).then(blob => {
                saveAs(blob, "זמן משחק.docx");
            });
            setDocsPlaying(false);
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

            <div className={styles.navbar}>
                <IoArrowForward onClick={goingBack} className={styles.back_icon}></IoArrowForward>
                {/* <img onClick={() => navigate('/')} className={styles.logo_img} src='icon.png'></img> */}
            </div>

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
                            <label>פעילות נוספת</label>
                            {!iconClickedPoint ?
                                <img className={styles.icon_svg} src='ai.svg'></img>
                            :
                                <AiOutlineLoading className={styles.icon_more}></AiOutlineLoading>}
                        </button>

                        <button onClick={() => moreData(1)} className={styles.button}>
                            <label>הרחבת התוכן</label>
                            {!moreDataPoint ?
                                <img className={styles.icon_svg} src='more.svg'></img>
                            :
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
                            <label>פעילות נוספת</label>
                            {!iconClickedContent ?
                                <img className={styles.icon_svg} src='ai.svg'></img>
                            :
                                <AiOutlineLoading className={styles.icon_more}></AiOutlineLoading>}
                        </button>

                        <button onClick={() => moreData(2)} className={styles.button}>
                            <label>הרחבת התוכן</label>
                            {!moreDataContent ?
                                <img className={styles.icon_svg} src='more.svg'></img>
                            :
                                <AiOutlineLoading className={styles.icon_more}></AiOutlineLoading>}
                        </button>
                    </div>
                </div>}

            {data.scoutingTime.use &&
                <div className={styles.activity_div}>
                    <div className={styles.h2_icon_div}>
                        <h2>זמן תנועת נוער</h2>
                        <div className={styles.icons}>
                            {!whatsupScoutingTime ? <FaWhatsapp onClick={() => importWhatsup(3)}></FaWhatsapp> : <AiOutlineLoading></AiOutlineLoading>}
                            {!docsScoutingTime ? <BsFiletypeDocx onClick={() => importDocs(3)}></BsFiletypeDocx> : <AiOutlineLoading></AiOutlineLoading>}
                        </div>
                    </div>
                    {formatTextWithLineBreaks(data.scoutingTime.data)}

                    <div className={styles.buttons_div}>
                        <button onClick={() => generateAgain(3)} className={styles.button}>
                            <label>פעילות נוספת</label>
                            {!iconClickedScoutingTime ?
                                <img className={styles.icon_svg} src='ai.svg'></img>
                            :
                                <AiOutlineLoading className={styles.icon_more}></AiOutlineLoading>}
                        </button>

                        <button onClick={() => moreData(3)} className={styles.button}>
                            <label>הרחבת התוכן</label>
                            {!moreDataScoutingTime ?
                                <img className={styles.icon_svg} src='more.svg'></img>
                            :
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
                            <label>פעילות נוספת</label>
                            {!iconClickedPlaying ?
                                <img className={styles.icon_svg} src='ai.svg'></img>
                            :
                                <AiOutlineLoading className={styles.icon_more}></AiOutlineLoading>}
                        </button>

                        <button onClick={() => moreData(4)} className={styles.button}>
                            <label>הרחבת התוכן</label>
                            {!moreDataPlaying ?
                                <img className={styles.icon_svg} src='more.svg'></img>
                            :
                                <AiOutlineLoading className={styles.icon_more}></AiOutlineLoading>}
                        </button>
                    </div>
                </div>}

        </div>
    );
}

export default Activity;
