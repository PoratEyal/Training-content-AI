import React, { useEffect, useState } from 'react';
import styles from './FabSave.module.css';
import { db } from '../../config/firebase';
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from "firebase/firestore";
import { useAuthContext } from "../../context/AuthContext";
import { useErrorContext } from "../../context/ErrorContext";
import { Activity } from "../../models/types/activity";

type Props = {
    activity: Activity;
};

const FabSave: React.FC<Props> = ({ activity }) => {
    const [checked, setChecked] = useState(false);
    const { currentUser } = useAuthContext();
    const { handleSuccess, handleError } = useErrorContext();

    useEffect(() => {
        const checkIfActivitySaved = async () => {
            if (!currentUser || !currentUser.id || !activity) return;
            
            const userDocRef = doc(db, "users", currentUser.id);
            const userSnap = await getDoc(userDocRef);
            
            if (userSnap.exists()) {
                const userData = userSnap.data();
                const activities = userData.activities || [];

                const isSaved = activities.some((act: Activity) => act.id === activity.id);
                setChecked(isSaved);
            }
        };

        checkIfActivitySaved();
    }, [currentUser, activity]);

    const handleClick = async () => {
        if (!currentUser || !currentUser.id || !activity) return;

        const userDocRef = doc(db, "users", currentUser.id);

        try {
            if (checked) {
                // Activity is currently saved, remove it
                await updateDoc(userDocRef, {
                    activities: arrayRemove(activity)
                });
            } else {
                // Activity is not currently saved, add it
                await updateDoc(userDocRef, {
                    activities: arrayUnion(activity)
                });
                // Show success message after successfully saving the activity
                handleSuccess("שמרנו את הפעולה! תוכלו למצוא אותה באזור הפעולות שלי");
            }

            setChecked(prev => !prev);
        } catch (error: any) {
            handleError("הפעולה לא נשמרה, אנא נסו שנית");
        }
    };

    return (
        <div 
            className={`${styles.bookmark} ${checked ? styles.checked : ''}`} 
            onClick={handleClick}
            role="button"
            aria-pressed={checked}
        >
            <svg
                className={styles.svgIcon}
                viewBox="0 0 50 70"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M46 62.0085L46 3.88139L3.99609 3.88139L3.99609 62.0085L24.5 45.5L46 62.0085Z"
                ></path>
            </svg>
        </div>
    );
};

export default FabSave;
