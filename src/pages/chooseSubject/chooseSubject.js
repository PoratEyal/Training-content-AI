import { useState, useEffect } from 'react';
import { useContentContext } from '../../context/ContentContext';
import styles from './chooseSubject.module.css';
import { FaWandMagicSparkles } from "react-icons/fa6";
import { VscLoading } from "react-icons/vsc";
import { getSubjects, getActivity, getImg } from '../../service/openAiPrompts';
import AddSubject from '../../components/popups/addSubject/addSubject';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowBack } from "react-icons/io";
import { useCallback } from 'react';

function ChooseSubject() {

    const { updateSubjects, data, updateMainSubject, updateActivity, updateImage } = useContentContext();
    const [generateClicked, setGenerateClicked] = useState(false);
    const [popupOpen, setPopupOpen] = useState(false);
    const [selectedSubjectIndex, setSelectedSubjectIndex] = useState(null);
    const [btnClicked, setBtnClicked] = useState(false)

    const navigate = useNavigate();

    const generateAgain = async () => {
        setGenerateClicked(true);
        const ans = await getSubjects();
        console.log(ans);
        updateSubjects(ans.subjectList);
        setGenerateClicked(false);
    };

    const submitHandler = async () => {
        setBtnClicked(true)
        const ans =  await getActivity(data.mainSubject, data.time, data.amount, data.grade, data.place)
        updateActivity(ans)
        generateImg(ans)
    }

    const generateImg = async (activity) => {
        const img = await getImg(activity)
        const response = await getImg(img);
        if (response && response.data) {
            console.log(response.data);
            updateImage(response.data)
        }
        navigate('/activity')
    }

    const selectedSubjectHandler = (index, subject) => {
        setSelectedSubjectIndex(index)
        updateMainSubject(subject)
    }

    const closePopup = useCallback((newSubject = null) => {
        setPopupOpen(false);
        if (newSubject) {
            updateMainSubject(newSubject);
        }
    }, [updateMainSubject]);
    
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (popupOpen && e.target.classList.contains('darkOverlay')) {
                closePopup();
            }
        };
    
        window.addEventListener('click', handleOutsideClick);
        return () => window.removeEventListener('click', handleOutsideClick);
    }, [popupOpen, closePopup]);
    

    return (
        <div className={styles.container}>

            <IoMdArrowBack onClick={() => navigate('/')} className={styles.back_icon}></IoMdArrowBack>

            <div className={styles.middle_div}>

                <h3 className={styles.h3}>אנא בחרו נושא</h3>

                <div className={styles.subjects_div}>
                    {data.subjects.length > 0 && data.subjects.map((subject, index) => (
                        <button
                            className={`${styles.subject_btn} ${selectedSubjectIndex === index ? styles.selected : ''}`}
                            key={index}
                            onClick={() => selectedSubjectHandler(index, subject)}
                        >
                            <label>{subject}</label>
                        </button>
                    ))}
                </div>

                <div className={styles.down_buttons_div}>
                    <button onClick={generateAgain} className={styles.generate_btn}>
                        <label>נושאים נוספים</label>
                        {!generateClicked ?
                            <FaWandMagicSparkles></FaWandMagicSparkles>
                        :
                            <VscLoading className={styles.loading_icon}></VscLoading>
                        }
                    </button>

                    <button onClick={() => setPopupOpen(true)} className={styles.add_your_subject_btn}>נושא משלך</button>
                </div>

            </div>

            <button onClick={submitHandler} className={styles.submit_btn}>
                {!btnClicked ? 
                    <label>אני רוצה הצעה לפעילות</label>
                :
                    <div className={styles.submit_btn_div}>
                        <label>הפעילות בהכנה</label>
                        <VscLoading className={styles.submit_btn_loading_icon}></VscLoading>
                    </div>
                }
            </button>

            {popupOpen && (
                <>
                    <div className={styles.darkOverlay} onClick={() => closePopup()}></div>
                    <AddSubject closePopup={closePopup} />
                </>
            )}

        </div>
    );
}

export default ChooseSubject;
