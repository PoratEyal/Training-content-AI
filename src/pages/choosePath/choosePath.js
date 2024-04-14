import { useState } from 'react';
import { useContentContext } from '../../context/ContentContext';
import styles from './choosePath.module.css';
import { VscLoading } from "react-icons/vsc";
import {  } from '../../service/openAiPrompts';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowBack } from "react-icons/io";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { getPlayingTimeSubject, getPointOfView, getContentActivity, getScoutingTime, getPlayingTime, getScoutingTimeSubject, getContentActivitySubject, getPointOfViewSubject } from '../../service/openAiPrompts';

function ChoosePath() {

    const { data,
            updatePointOfView,
            updateContentActivity,
            updateScoutingTime,
            updatePlayingTime
        } = useContentContext();

    const [clicked, setClicked] = useState(false)
    const navigate = useNavigate();

    // State hooks for managing visibility of input fields
    const [showPointOfView, setShowPointOfView] = useState(false);
    const [pointOfViewSubject, setPointOfViewSubject] = useState('');
    const [pointOfViewTime, setPointOfViewTime] = useState('');
    const [magicClickedPoint, setMagicClickedPoint] = useState(false);

    const [showContentActivity, setShowContentActivity] = useState(false);
    const [contentActivitySubject, setContentActivitySubject] = useState('');
    const [contentActivityTime, setContentActivityTime] = useState('');
    const [magicClickedContent, setMagicClickedContent] = useState(false);

    const [showScoutingTime, setShowScoutingTime] = useState(false);
    const [scoutingTimeSubject, setScoutingTimeSubject] = useState('');
    const [scoutingTimeTime, setScoutingTimeTime] = useState('');
    const [magicClicked, setMagicClicked] = useState(false);

    const [showPlayingTime, setShowPlayingTime] = useState(false);
    const [playingTimeSubject, setPlayingTimeSubject] = useState('');
    const [playingTimeTime, setPlayingTimeTime] = useState('');
    const [magicClickedPlaying, setMagicClickedPlaying] = useState(false);

    // Handlers for checkboxes
    const togglePointOfView = () => setShowPointOfView(!showPointOfView);
    const toggleContentActivity = () => setShowContentActivity(!showContentActivity);
    const toggleScoutingTime = () => setShowScoutingTime(!showScoutingTime);
    const togglePlayingTime = () => setShowPlayingTime(!showPlayingTime);

    const handleInputChange = (setter) => (e) => setter(e.target.value);

    const generateSubject = async (index) => {
        if(index == 3){
            setMagicClicked(true)
            setScoutingTimeSubject('')
            const response = await getScoutingTimeSubject()
            setMagicClicked(false)
            setScoutingTimeSubject(response)
        }
        if(index == 1){
            setMagicClickedPoint(true)
            setPointOfViewSubject('')
            const response = await getPointOfViewSubject()
            setMagicClickedPoint(false)
            setPointOfViewSubject(response)
        }
        if(index == 2){
            setMagicClickedContent(true)
            setContentActivitySubject('')
            const response = await getContentActivitySubject()
            setMagicClickedContent(false)
            setContentActivitySubject(response)
        }
        if(index == 4){
            setMagicClickedPlaying(true)
            setPlayingTimeSubject('')
            const response = await getPlayingTimeSubject()
            setMagicClickedPlaying(false)
            setPlayingTimeSubject(response)
        }
    }

    const submitHandler = async () => {
        setClicked(true);
        const promises = [];

        if (showPointOfView) {
            promises.push(getPointOfView(pointOfViewSubject, pointOfViewTime, data.amount, data.grade, data.gender, data.place)
                .then((result) => updatePointOfView(pointOfViewSubject, pointOfViewTime, result)));
        }
    
        if (showContentActivity) {
            promises.push(getContentActivity(contentActivitySubject, contentActivityTime, data.amount, data.grade, data.gender, data.place)
                .then((result) => updateContentActivity(contentActivitySubject, contentActivityTime, result)));
        }
        
        if (showScoutingTime) {
            promises.push(getScoutingTime(scoutingTimeSubject, scoutingTimeTime, data.amount, data.grade, data.gender, data.place)
                .then((result) => updateScoutingTime(scoutingTimeSubject, scoutingTimeTime, result)));
        }
        
        if (showPlayingTime) {
            promises.push(getPlayingTime(playingTimeSubject, playingTimeTime, data.amount, data.grade, data.gender, data.place)
                .then((result) => updatePlayingTime(playingTimeSubject, playingTimeTime, result)));
        }
    
        await Promise.allSettled(promises);
        navigate('/activity')
        //await generateImg(data.playingTime.data)
    }

    return (
        <div className={styles.container}>

            <IoMdArrowBack onClick={() => navigate('/')} className={styles.back_icon}></IoMdArrowBack>

            <div className={styles.checkbox_container}>

                <h3 className={styles.h3}>שלום מדריכים אלופים !<br></br>בחרו את הפעילות שלכם</h3>

                <div className={styles.checkbox_div}>
                    <label className={styles.checkbox_input}><input type="checkbox" checked={showPointOfView} onChange={togglePointOfView} /> נקודת מבט</label>
                    {showPointOfView && <div className={styles.inputs_div}>
                        <div className={styles.input_and_icon}>
                            <textarea className={styles.input} value={pointOfViewSubject} onChange={handleInputChange(setPointOfViewSubject)} placeholder="נושא הפעילות" type="text" />
                            {!magicClickedPoint? 
                                    <FaWandMagicSparkles onClick={() => generateSubject(1)} className={styles.magic_icon}></FaWandMagicSparkles>
                                :
                                    <VscLoading className={styles.loading_icon_magic}></VscLoading>}
                        </div>
                        <div className={styles.input_div}>
                            <select className={styles.input_select} value={pointOfViewTime} onChange={handleInputChange(setPointOfViewTime)} placeholder="זמן הפעילות">
                                <option value="" disabled selected>בחרו זמן פעילות</option>
                                <option value="20 דקות">20 דקות</option>
                                <option value="חצי שעה">חצי שעה</option>
                                <option value="45 דקות">45 דקות</option>
                                <option value="שעה">שעה</option>
                                <option value="שעה חצי">שעה חצי</option>
                                <option value="שעתיים">שעתיים</option>
                            </select>
                        </div>
                    </div>}
                </div>

                <div className={styles.checkbox_div}>
                    <label><input type="checkbox" checked={showContentActivity} onChange={toggleContentActivity} /> פעילות תוכן</label>
                    {showContentActivity && <div className={styles.inputs_div}>
                        <div className={styles.input_and_icon}>
                            <textarea className={styles.input} value={contentActivitySubject} onChange={handleInputChange(setContentActivitySubject)} placeholder="נושא הפעילות" type="text" />
                            {!magicClickedContent? 
                                <FaWandMagicSparkles onClick={() => generateSubject(2)} className={styles.magic_icon}></FaWandMagicSparkles>
                            :
                                <VscLoading className={styles.loading_icon_magic}></VscLoading>}
                        </div> 
                        <div className={styles.input_div}>
                            <select className={styles.input_select} value={contentActivityTime} onChange={handleInputChange(setContentActivityTime)} placeholder="זמן הפעילות">
                                <option value="" disabled selected>בחרו זמן פעילות</option>
                                <option value="20 דקות">20 דקות</option>
                                <option value="חצי שעה">חצי שעה</option>
                                <option value="45 דקות">45 דקות</option>
                                <option value="שעה">שעה</option>
                                <option value="שעה חצי">שעה חצי</option>
                                <option value="שעתיים">שעתיים</option>
                            </select>
                        </div>
                    </div>}
                </div>

                <div className={styles.checkbox_div}>
                    <label><input type="checkbox" checked={showScoutingTime} onChange={toggleScoutingTime} /> זמן צופיות</label>
                    {showScoutingTime && <div className={styles.inputs_div}>
                        <div className={styles.input_and_icon}>
                            <textarea className={styles.input} value={scoutingTimeSubject} onChange={handleInputChange(setScoutingTimeSubject)} placeholder="נושא הפעילות" type="text" />
                            {!magicClicked? 
                                <FaWandMagicSparkles onClick={() => generateSubject(3)} className={styles.magic_icon}></FaWandMagicSparkles>
                            :
                                <VscLoading className={styles.loading_icon_magic}></VscLoading>}
                        </div>
                        <div className={styles.input_div}>
                            <select className={styles.input_select} value={scoutingTimeTime} onChange={handleInputChange(setScoutingTimeTime)}>
                                <option value="" disabled selected>בחרו זמן פעילות</option>
                                <option value="20 דקות">20 דקות</option>
                                <option value="חצי שעה">חצי שעה</option>
                                <option value="45 דקות">45 דקות</option>
                                <option value="שעה">שעה</option>
                                <option value="שעה חצי">שעה חצי</option>
                                <option value="שעתיים">שעתיים</option>
                            </select>
                        </div>
                    </div>}
                </div>

                <div className={styles.checkbox_div}>
                    <label><input type="checkbox" checked={showPlayingTime} onChange={togglePlayingTime} /> זמן משחק</label>
                    {showPlayingTime && <div className={styles.inputs_div}>
                        <div className={styles.input_and_icon}>
                            <textarea className={styles.input} value={playingTimeSubject} onChange={handleInputChange(setPlayingTimeSubject)} placeholder="הסבר על המשחק" type="text" />
                            {!magicClickedPlaying? 
                                <FaWandMagicSparkles onClick={() => generateSubject(4)} className={styles.magic_icon}></FaWandMagicSparkles>
                            :
                                <VscLoading className={styles.loading_icon_magic}></VscLoading>}
                        </div>
                        
                        <div className={styles.input_div}>
                            <select className={styles.input_select} value={playingTimeTime} onChange={handleInputChange(setPlayingTimeTime)}>
                                <option value="" disabled selected>בחרו זמן משחק</option>
                                <option value="20 דקות">20 דקות</option>
                                <option value="חצי שעה">חצי שעה</option>
                                <option value="45 דקות">45 דקות</option>
                                <option value="שעה">שעה</option>
                                <option value="שעה חצי">שעה חצי</option>
                                <option value="שעתיים">שעתיים</option>
                            </select>
                        </div>


                    </div>}
                </div>

            </div>

            <div className={styles.btn_div}>
                <button onClick={submitHandler} className={styles.submit_btn}>
                    {!clicked ?
                        "לקבלת הפעילות"
                    :
                        <VscLoading className={styles.loading_icon}></VscLoading>}
                </button>
            </div>

        </div>
    );
}

export default ChoosePath;
