import { useState } from 'react';
import { useContentContext } from '../../context/ContentContext';
import styles from './choosePath.module.css';
import { VscLoading } from "react-icons/vsc";
import {  } from '../../service/openAiPrompts';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowBack } from "react-icons/io";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { getPointOfView, getContentActivity, getScoutingTime, getPlayingTime, getScoutingTimeSubject, getPointOfViewSubject } from '../../service/openAiPrompts';

function ChoosePath() {

    const { updatePointOfView,
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

    const [showScoutingTime, setShowScoutingTime] = useState(false);
    const [scoutingTimeSubject, setScoutingTimeSubject] = useState('');
    const [scoutingTimeTime, setScoutingTimeTime] = useState('');
    const [magicClicked, setMagicClicked] = useState(false);

    const [showPlayingTime, setShowPlayingTime] = useState(false);
    const [playingTimeSubject, setPlayingTimeSubject] = useState('');
    const [playingTimeTime, setPlayingTimeTime] = useState('');

    const [showOthers, setShowOthers] = useState(false);

    // Handlers for checkboxes
    const togglePointOfView = () => setShowPointOfView(!showPointOfView);
    const toggleContentActivity = () => setShowContentActivity(!showContentActivity);
    const toggleScoutingTime = () => setShowScoutingTime(!showScoutingTime);
    const togglePlayingTime = () => setShowPlayingTime(!showPlayingTime);
    const toggleOthers = () => setShowOthers(!showOthers);

    const handleInputChange = (setter) => (e) => setter(e.target.value);

    const generateSubject = async (index) => {
        if(index == 3){
            setMagicClicked(true)
            setScoutingTimeSubject('')
            const response = await getScoutingTimeSubject()
            console.log(response);
            setMagicClicked(false)
            if (response.subjectList && response.subjectList.length > 0) {
                setScoutingTimeSubject(response.subjectList[0])
            }
        }

        if(index == 1){
            setMagicClickedPoint(true)
            setPointOfViewSubject('')
            const response = await getPointOfViewSubject()
            console.log(response);
            setMagicClickedPoint(false)
            if (response.subjectList && response.subjectList.length > 0) {
                setPointOfViewSubject(response.subjectList[0])
            }
        }
    }

    const submitHandler = async () => {
        setClicked(true);
        if(showPointOfView){
            const ans = await getPointOfView(pointOfViewSubject, pointOfViewTime)
            console.log(ans);
            updatePointOfView(ans)
        }
        if(showContentActivity){
            const ans = await getContentActivity(contentActivitySubject, contentActivityTime)
            console.log(ans);
            updateContentActivity(ans)
        }
        if(showScoutingTime){
            const ans = await getScoutingTime(scoutingTimeSubject, scoutingTimeTime)
            console.log(ans);
            updateScoutingTime(ans)
        }
        if(showPlayingTime){
            const ans = await getPlayingTime(playingTimeSubject, playingTimeTime)
            console.log(ans);
            updatePlayingTime(ans)
        }
        navigate('/activity')
    }

    // const generateImg = async (activity) => {
    //     const img = await getImg(activity)
    //     const response = await getImg(img);
    //     if (response && response.data) {
    //         console.log(response.data);
    //         updateImage(response.data)
    //     }
    //     navigate('/activity')
    // }

    return (
        <div className={styles.container}>

            <IoMdArrowBack onClick={() => navigate('/')} className={styles.back_icon}></IoMdArrowBack>

            <div className={styles.checkbox_container}>

                <h3 className={styles.h3}>שלום מדריכים אלופים! <br></br>בחרו במה תרצו להתמקד בפעילות שלכם</h3>

                <div className={styles.checkbox_div}>
                    <label className={styles.checkbox_input}><input type="checkbox" checked={showPointOfView} onChange={togglePointOfView} /> נקודת מבט</label>
                    {showPointOfView && <div className={styles.inputs_div}>
                    <div className={styles.input_and_icon}>
                        <input className={styles.input} value={pointOfViewSubject} onChange={handleInputChange(setPointOfViewSubject)} placeholder="נושא הפעילות" type="text" />
                        {!magicClickedPoint? 
                                <FaWandMagicSparkles onClick={() => generateSubject(1)} className={styles.magic_icon}></FaWandMagicSparkles>
                            :
                                <VscLoading className={styles.loading_icon_magic}></VscLoading>}
                    </div>
                        
                        <input className={styles.input} value={pointOfViewTime} onChange={handleInputChange(setPointOfViewTime)} placeholder="זמן הפעילות" type="text" />  
                    </div>}
                </div>

                <div className={styles.checkbox_div}>
                    <label><input type="checkbox" checked={showContentActivity} onChange={toggleContentActivity} /> פעילות תוכן</label>
                    {showContentActivity && <div className={styles.inputs_div}>
                        <input className={styles.input} value={contentActivitySubject} onChange={handleInputChange(setContentActivitySubject)} placeholder="נושא הפעילות" type="text" />
                        <input className={styles.input} value={contentActivityTime} onChange={handleInputChange(setContentActivityTime)} placeholder="זמן הפעילות" type="text" />  
                    </div>}
                </div>

                <div className={styles.checkbox_div}>
                    <label><input type="checkbox" checked={showScoutingTime} onChange={toggleScoutingTime} /> זמן צופיות</label>
                    {showScoutingTime && <div className={styles.inputs_div}>
                        <div className={styles.input_and_icon}>
                            <input className={styles.input} value={scoutingTimeSubject} onChange={handleInputChange(setScoutingTimeSubject)} placeholder="נושא הפעילות" type="text" />
                            {!magicClicked? 
                                <FaWandMagicSparkles onClick={() => generateSubject(3)} className={styles.magic_icon}></FaWandMagicSparkles>
                            :
                                <VscLoading className={styles.loading_icon_magic}></VscLoading>}
                        </div>
                        <input className={styles.input} value={scoutingTimeTime} onChange={handleInputChange(setScoutingTimeTime)} placeholder="זמן הפעילות" type="text" />  
                    </div>}
                </div>

                <div className={styles.checkbox_div}>
                    <label><input type="checkbox" checked={showPlayingTime} onChange={togglePlayingTime} /> זמן משחק</label>
                    {showPlayingTime && <div className={styles.inputs_div}>
                        <input className={styles.input} value={playingTimeSubject} onChange={handleInputChange(setPlayingTimeSubject)} placeholder="נושא הפעילות" type="text" />
                        <input className={styles.input} value={playingTimeTime} onChange={handleInputChange(setPlayingTimeTime)} placeholder="זמן הפעילות" type="text" />  
                    </div>}
                </div>

                {/* <div className={styles.checkbox_div}>
                    <label><input type="checkbox" checked={showOthers} onChange={toggleOthers} /> אחר</label>
                    {showOthers && <div className={styles.inputs_div}>
                        <input value={pointOfViewSubject} onChange={handleInputChange(setPointOfViewSubject)} placeholder="נושא הפעילות" type="text" />
                        <input value={pointOfViewTime} onChange={handleInputChange(setPointOfViewTime)} placeholder="זמן הפעילות" type="text" />  
                    </div>}
                </div> */}

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
