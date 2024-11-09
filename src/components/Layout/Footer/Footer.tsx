import styles from "./Footer.module.css";
import { useNavigate } from "react-router-dom";
import policy from "../../../models/resources/policy.json";
import { MdOutlinePrivacyTip } from "react-icons/md";
import route from "../../../router/route.json";
import AboutUsCollapse from "../../AboutUsCollapse/AboutUsCollapse";
import { IoMailOpen } from "react-icons/io5";

function Footer() {
    const navigate = useNavigate();

    return (
        <footer className={styles.footer}>
            <div onClick={() => navigate(route.privacyPolicy)} className={styles.footer_privacy}>
                <MdOutlinePrivacyTip />
                <label>תנאי שירות</label>
            </div>
            <AboutUsCollapse>
                <p>
                    ActivityWiz הוא אתר ליצירת פעולות לנוער. תוכלו לבחור מתוך מאגר של פעולות מוכנות
                    מראש או להשתמש בבינה מלאכותית ליצירת פעולות מותאמות אישית, המתאימות בדיוק לצרכים
                    שלכם. האתר מיועד למדריכים המחפשים רעיונות ודרכים חדשות להעשרת החוויה החינוכית
                    והחברתית. אל תהססו לפנות אלינו לכל שאלה, הצעה או רעיון דרך המייל או הרשתות
                    החברתיות – אנחנו כאן בשבילכם!
                </p>
            </AboutUsCollapse>
            <div className={styles.footer_contact}>
                <IoMailOpen />
                <a href={`mailto:${policy.p10.email}`}>{policy.p10.text4}</a>
            </div>
        </footer>
    );
}

export default Footer;
