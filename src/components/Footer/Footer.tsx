import React from "react";
import styles from "./Footer.module.css";
import { useNavigate } from "react-router-dom";
import policy from "../../models/resources/policy.json";
import { MdOutlinePrivacyTip } from "react-icons/md";

function Footer() {
    const navigate = useNavigate();

    return (
        <footer className={styles.footer}>
            <div className={styles.connect_div}>
                <label>{policy.p9.text2}</label>
                <a href={`mailto:${policy.p9.email}`}>{policy.p9.text3}</a>.
            </div>
            <div onClick={() => navigate("/privacyPolicy")} className={styles.privacy_div}>
                <label>מדיניות פרטיות</label>
                <MdOutlinePrivacyTip className={styles.icon_privacy}></MdOutlinePrivacyTip>
            </div>
        </footer>
    );
}

export default Footer;
