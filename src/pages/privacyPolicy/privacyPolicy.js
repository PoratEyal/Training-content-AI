import styles from './privacyPolicy.module.css';
import { IoArrowForward } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

function PrivacyPolicy() {

    const navigate = useNavigate();

    return <div className={styles.privacyPolicyContainer}>
        
        <IoArrowForward onClick={() => navigate('/')} className={styles.back_icon}></IoArrowForward>
        <h2>מדיניות פרטיות</h2>

        <div className={styles.space_div}>
            <label>האפליקציה נמצאת כרגע בשלב בטא וניסוי, ולכן ייתכנו באגים ותקלות.</label> השימוש בה נעשה על אחריותך בלבד, ואין אנו נושאים באחריות לכל נזק שעלול להיגרם כתוצאה משימוש בה.
        </div>

        <div className={styles.space_div}>
            <label className={styles.bold}>מדיניות פרטיות:</label> אנו מחויבים להגן על פרטיותך ולספק לך חווית שימוש בטוחה.
אנו לא אוספים נתונים אישיים אודותיך, כגון שם, כתובת דוא"ל או מספר טלפון.
אנו משתמשים ב cookies כדי לשפר את חווית השימוש שלך באפליקציה.
        </div>

        <div className={styles.space_div}>
            <label className={styles.bold}>זכויות יוצרים:</label> כל הזכויות באפליקציה, כולל זכויות היוצרים, עיצובים, קוד ונתונים, שייכות לנו או למקורות מורשים.
        </div>
       
        <div className={styles.space_div}>
            <label className={styles.bold}>אחריות:</label> אנו מספקים את האפליקציה "כפי שהיא" ואיננו נותנים שום אחריות, מפורשת או משתמעת, ביחס אליה. איננו אחראים לנזקים ישירים, עקיפים, תוצאתיים או מיוחדים שעלולים להיגרם כתוצאה משימוש באפליקציה.
        </div>

        <div className={styles.space_div}>
        <label className={styles.bold}>נגישות:</label> אנו מחויבים לספק חווית שימוש שווה לכל המשתמשים, ללא קשר למוגבלויותיהם.
בשלב זה, הנגשת האפליקציה מתבצעת באמצעות תכונות הנגישות המובנות במערכת ההפעלה שלך.
        </div>

        <div className={styles.space_div}>
            <label className={styles.bold}>הגבלת אחריות:</label> האפליקציה ניתנת "כפי שהיא" ואין אנו נושאים באחריות לכל נזק שעלול להיגרם לך כתוצאה משימוש בה. השימוש בה נעשה על אחריותך בלבד.
        </div>

        <div className={styles.space_div}>
            <label className={styles.bold}>שיפוט ופתרון סכסוכים:</label> כל סכסוך הנובע מהאפליקציה כפוף לשיפוט בלעדי של בתי המשפט המוסמכים בישראל.
        </div>

        <div className={styles.space_div}>
            <label className={styles.bold}>שינויים:</label> אנו רשאים לשנות את תנאי השימוש, מדיניות הפרטיות וכל הסכם אחר הקשור לאפליקציה בכל עת. הודעה על שינויים אלו תינתן בעדכון עמוד זה
        </div>
        

    </div>    

}

export default PrivacyPolicy