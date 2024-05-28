import React from "react";
import styles from "./Footer.module.css";
import { useNavigate } from "react-router-dom";
import policy from "../../../models/resources/policy.json";
import { MdOutlinePrivacyTip } from "react-icons/md";
import route from "../../../router/route.json";

function Footer() {
    const navigate = useNavigate();

    return (
        <footer className={styles.footer}>
            <div className={styles.connect_div}>
                <label>{policy.p9.text3}</label>
                <a href={`mailto:${policy.p9.email}`}>{policy.p9.text4}</a>
            </div>
            <div onClick={() => navigate(route.privacyPolicy)} className={styles.privacy_div}>
                <label>תנאי שירות</label>
                <MdOutlinePrivacyTip className={styles.icon_privacy}></MdOutlinePrivacyTip>
            </div>
        </footer>
    );
}

export default Footer;
