import { useState, useEffect } from 'react';
import { useContentContext } from '../../context/ContentContext';
import styles from './chooseSubject.module.css';
import { FaWandMagicSparkles } from "react-icons/fa6";
import { VscLoading } from "react-icons/vsc";
import { getSubjects, getActivity } from '../../service/openAiPrompts';
import AddSubject from '../../components/popups/addSubject/addSubject';
import { useNavigate } from 'react-router-dom';

function ChooseSubject() {

    const { updateSubjects, data, updateMainSubject, updateActivity } = useContentContext();
    const [generateClicked, setGenerateClicked] = useState(false);
    const [popupOpen, setPopupOpen] = useState(false);
    const [selectedSubjectIndex, setSelectedSubjectIndex] = useState(null);

    const navigate = useNavigate();

    const generateAgain = async () => {
        setGenerateClicked(true);
        const ans = await getSubjects();
        console.log(ans);
        updateSubjects(ans.subjectList);
        setGenerateClicked(false);
    };

    const submitHandler = async () => {
        const ans =  await getActivity(data.mainSubject, data.time, data.amount, data.grade, data.place)
        updateActivity(ans)
        navigate('/activity')
    }

    const selectedSubjectHandler = (index, subject) => {
        setSelectedSubjectIndex(index)
        updateMainSubject(subject)
    }

    useEffect(() => {
        const closePopup = (e) => {
            if (popupOpen && e.target.classList.contains('darkOverlay')) {
                setPopupOpen(false);
            }
        };

        window.addEventListener('click', closePopup);
        return () => window.removeEventListener('click', closePopup);
    }, [popupOpen]);

    return (
        <div className={styles.container}>

            <h3>אנא בחרו נושא</h3>

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

            <button onClick={submitHandler} className={styles.submit_btn}>המשך</button>

            {popupOpen && (
                <>
                    <div className={styles.darkOverlay} onClick={() => setPopupOpen(false)}></div>
                    <AddSubject closePopup={() => setPopupOpen(false)} />
                </>
            )}

        </div>
    );
}

export default ChooseSubject;
