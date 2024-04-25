import React, { useState } from 'react';
import styles from './details.module.css';
import { VscLoading } from "react-icons/vsc";
import { useContentContext } from '../../context/ContentContext';
import { useNavigate } from 'react-router-dom';
import { MdOutlinePrivacyTip } from "react-icons/md";

function Details() {

    const [classLevel, setClassLevel] = useState('');
    const [numberOfChildren, setNumberOfChildren] = useState('');
    const [activityLocation, setActivityLocation] = useState('');
    const [gender, setGender] = useState('');

    const [clicked, setClicked] = useState(false)

    const { updateDetails } = useContentContext();

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setClicked(true);
        updateDetails(classLevel, numberOfChildren, activityLocation, gender)
        navigate('/choosePath')
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>

                <div className={styles.half_circle}>
                    <label>הזינו מספר פרטים <br></br>על הקבוצה שלכם</label>
                </div>

                {/* <h3>הזינו מספר פרטים על הפעולה</h3> */}

                <div className={styles.input_div}>
                    <select 
                      value={classLevel} 
                      onChange={(e) => setClassLevel(e.target.value)}
                      aria-label="כיתה"
                    >
                        <option value="" disabled>כיתה</option>
                        {['ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט'].map((level) => (
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
                        {['1-5', '5-10', '10-20', '20-30', '30-50', '50-75', '75-100'].map((range) => (
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
                      value={gender} 
                      onChange={(e) => setGender(e.target.value)}
                      aria-label="מין"
                    >
                        <option value="" disabled>מין</option>
                        {['בנות', 'בנים', 'מעורב'].map((duration) => (
                            <option key={duration} value={duration}>{duration}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.btn_div}>
                    <button onClick={() => setClicked(true)} className={styles.submit_btn} type="submit">
                        {!clicked ?
                            "המשיכו"
                        :
                            <VscLoading className={styles.loading_icon}></VscLoading>}
                    </button>
                </div>

            </form>

            <div onClick={() => navigate('/privacyPolicy')} className={styles.privacy_div}>
                <label>מדיניות פרטיות</label>
                <MdOutlinePrivacyTip></MdOutlinePrivacyTip>
            </div>

        </div>
    );
}

export default Details;

