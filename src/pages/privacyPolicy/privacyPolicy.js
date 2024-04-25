import styles from './privacyPolicy.module.css';
import { IoArrowForward } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

function PrivacyPolicy() {

    const navigate = useNavigate();

    return <div className={styles.privacyPolicyContainer}>
        
        <IoArrowForward onClick={() => navigate('/')} className={styles.back_icon}></IoArrowForward>
        <h2>מדיניות פרטיות</h2>

        <div className={styles.space_div}>
            <strong>האפליקציה נמצאת כרגע בשלב בטא וניסוי, ולכן ייתכנו באגים ותקלות.</strong> השימוש בה נעשה על אחריותך בלבד, ואין אנו נושאים באחריות לכל נזק שעלול להיגרם כתוצאה משימוש בה.
        </div>

        <div className={styles.space_div}>
            <strong className={styles.bold}>מדיניות פרטיות:</strong> אנו לא שומרים שום מידע אודות השימוש שלך באפליקציה.
            הפרטיות שלך חשובה לנו, ולכן אנו לא אוספים שום נתונים על פעילותך באפליקציה.
        </div>

        <div className={styles.space_div}>
            <strong className={styles.bold}>זכויות יוצרים:</strong> כל הזכויות באפליקציה, כולל זכויות היוצרים, עיצובים, קוד ונתונים, שייכות לנו או למקורות מורשים.
        </div>
       
        <div className={styles.space_div}>
            <strong className={styles.bold}>אחריות:</strong> אנו מספקים את האפליקציה "כפי שהיא" ואיננו נותנים שום אחריות, מפורשת או משתמעת, ביחס אליה. איננו אחראים לנזקים ישירים, עקיפים, תוצאתיים או מיוחדים שעלולים להיגרם כתוצאה משימוש באפליקציה.
        </div>

        <div className={styles.space_div}>
            <strong className={styles.bold}>הגבלת אחריות:</strong> האפליקציה ניתנת "כפי שהיא" ואין אנו נושאים באחריות לכל נזק שעלול להיגרם לך כתוצאה משימוש בה. השימוש בה נעשה על אחריותך בלבד.
        </div>

        <div className={styles.space_div}>
            <strong className={styles.bold}>שיפוט ופתרון סכסוכים:</strong> כל סכסוך הנובע מהאפליקציה כפוף לשיפוט בלעדי של בתי המשפט המוסמכים בישראל.
        </div>

        <div className={styles.space_div}>
            <strong className={styles.bold}>שינויים:</strong> אנו רשאים לשנות את תנאי השימוש, מדיניות הפרטיות וכל הסכם אחר הקשור לאפליקציה בכל עת. הודעה על שינויים אלו תינתן בעדכון עמוד זה
        </div>
    </div>    

}

export default PrivacyPolicy