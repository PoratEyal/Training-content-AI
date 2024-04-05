import React, { useState } from 'react';
import styles from './details.module.css';
import { getSubjects } from '../../service/openAiPrompts';
import { VscLoading } from "react-icons/vsc";
import { useContentContext } from '../../context/ContentContext';
import { useNavigate } from 'react-router-dom';

function Details() {

    const [classLevel, setClassLevel] = useState('');
    const [numberOfChildren, setNumberOfChildren] = useState('');
    const [activityLocation, setActivityLocation] = useState('');
    const [activityDuration, setActivityDuration] = useState('');

    const [clicked, setClicked] = useState(false)
    const [subjects, setSubjects] = useState([])

    const { updateSubjects, updateDetails } = useContentContext();

    const navigate = useNavigate();

    const getAndSetSubjects = async () => {
        const ans = await getSubjects();
        setSubjects(ans.subjectList);
        updateSubjects(ans.subjectList);
        navigate('/chooseSubject')
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setClicked(true);
        updateDetails(classLevel, activityDuration, numberOfChildren, activityLocation)
        getAndSetSubjects()
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>

                <h3>הזינו מספר פרטים על הפעולה</h3>

                <div className={styles.input_div}>
                    <select 
                      value={classLevel} 
                      onChange={(e) => setClassLevel(e.target.value)}
                      aria-label="כיתה"
                    >
                        <option value="" disabled>כיתה</option>
                        {['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח'].map((level) => (
                            <option key={level} value={level}>{level}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.input_div}>
                    <select 
                      value={numberOfChildren} 
                      onChange={(e) => setNumberOfChildren(e.target.value)}
                      aria-label="מספר ילדים"
                    >
                        <option value="" disabled>מספר ילדים</option>
                        {['1-5', '5-10', '10-20', '20-30'].map((range) => (
                            <option key={range} value={range}>{range}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.input_div}>
                    <select 
                      value={activityLocation} 
                      onChange={(e) => setActivityLocation(e.target.value)}
                      aria-label="מיקום הפעילות"
                    >
                        <option value="" disabled>מיקום הפעילות</option>
                        {['במקום סגור', 'במקום פתוח', 'לא משנה'].map((location) => (
                            <option key={location} value={location}>{location}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.input_div}>
                    <select 
                      value={activityDuration} 
                      onChange={(e) => setActivityDuration(e.target.value)}
                      aria-label="אורך הפעילות"
                    >
                        <option value="" disabled>אורך הפעילות</option>
                        {['20 דקות', 'חצי שעה', 'שעה', 'שעה וחצי', 'שעתיים'].map((duration) => (
                            <option key={duration} value={duration}>{duration}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.btn_div}>
                    <button onClick={() => setClicked(true)} className={styles.submit_btn} type="submit">
                        {!clicked ?
                            "צור לי פעולה"
                        :
                            <VscLoading className={styles.loading_icon}></VscLoading>}
                    </button>
                </div>

            </form>

        </div>
    );
}

export default Details;

