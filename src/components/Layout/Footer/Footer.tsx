import styles from "./Footer.module.css";
import AboutUsCollapse from "../../AboutUsCollapse/AboutUsCollapse";
import { useNavigate } from "react-router-dom";
import route from "../../../router/route.json";
import { Icons } from "../../Icons";

function Footer({ showAbout = true, showPrivacyAndContact = true }) {
    const navigate = useNavigate();

    return (
        <footer className={styles.footer}>
            {showPrivacyAndContact && (
                <div onClick={() => navigate(route.privacyPolicy)} className={styles.footer_privacy}>
                    <Icons.privacyPolicy />
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
                    <Icons.contactUs />
                    <a href={`mailto:info@example.com`}>Contact Us</a>
                </div>
            )}
        </footer>
    );
}

export default Footer;
