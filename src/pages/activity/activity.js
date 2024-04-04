import styles from './activity.module.css';
import { useContentContext } from '../../context/ContentContext';
import { useNavigate } from 'react-router-dom';
import { RxUpdate } from "react-icons/rx";

function Activity() {

    const { data, updateActivity } = useContentContext();
    const navigate = useNavigate();

    return (
        <div className={styles.container}>

            <h2>הפעילות שלך מוכנה</h2>

            <div className={styles.activity_div}>
                {data.activity}
            </div>

        </div>

    )
}

export default Activity;