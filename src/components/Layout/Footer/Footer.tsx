import styles from "./Footer.module.css";
import AboutUsCollapse from "../../AboutUsCollapse/AboutUsCollapse";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { IoMailOpen } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import route from "../../../router/route.json";

function Footer({ showAbout = true, showPrivacyAndContact = true }) {
    const navigate = useNavigate();

    return (
        <footer className={styles.footer}>
            {showPrivacyAndContact && (
                <div onClick={() => navigate(route.privacyPolicy)} className={styles.footer_privacy}>
                    <MdOutlinePrivacyTip />
                    <label>תנאי שירות</label>
                </div>
            )}

            {showAbout && (
                <AboutUsCollapse>
                    <p>
                        ActivityWiz הוא אתר ליצירת פעולות לנוער. תוכלו לבחור מתוך מאגר של פעולות מוכנות
                        מראש או להשתמש בבינה מלאכותית ליצירת פעולות מותאמות אישית, המתאימות בדיוק לצרכים
                        שלכם. האתר מיועד למדריכים המחפשים רעיונות ודרכים חדשות להעשרת החוויה החינוכית
                        והחברתית.
                    </p>
                </AboutUsCollapse>
            )}

            {showPrivacyAndContact && (
                <div className={styles.footer_contact}>
                    <IoMailOpen />
                    <a href={`mailto:info@example.com`}>Contact Us</a>
                </div>
            )}
        </footer>
    );
}

export default Footer;
