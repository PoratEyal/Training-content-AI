import styles from './limitRequests.module.css';
import { MdCancel } from "react-icons/md";

function LimitRequest() {

    return (
        <div className={styles.container}>
            {/* <MdCancel className={styles.cancel_btn}></MdCancel> */}
            
            <label className={styles.label}>בשל עומס זמני על המערכת, אנו מגבילים את מספר הפעילויות שניתן לבנות ביום אחד. </label> 
            <label className={styles.label}>אנו מתנצלים על אי הנוחות ומבטיחים לחזור בהקדם האפשרי למצב רגיל</label>
        </div>
    );
}

export default LimitRequest;
