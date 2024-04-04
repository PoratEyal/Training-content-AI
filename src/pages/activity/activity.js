import styles from './activity.module.css';
import { useContentContext } from '../../context/ContentContext';

function Activity() {

    const { data, updateActivity } = useContentContext();

    return (
        <div className={styles.activity_div}>
            {data.activity}
        </div>
    )
}

export default Activity;