import styles from "./PrivacyPolicy.module.css";
import { IoArrowForward } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import policy from "../../models/resources/policy.json";

function PrivacyPolicy() {
    const navigate = useNavigate();

    return (
        <div className={styles.privacyPolicyContainer}>
            <IoArrowForward
                onClick={() => navigate("/")}
                className={styles.back_icon}
            ></IoArrowForward>
            <h2 className={styles.h2_privacy}>מדיניות פרטיות</h2>

            <div className={styles.space_div}>
                <label>{policy.p1.label}</label> {policy.p1.text}
            </div>

            <div className={styles.space_div}>
                <label>{policy.p2.label}</label> {policy.p2.text}
            </div>

            <div className={styles.space_div}>
                <label>{policy.p3.label}</label> {policy.p3.text}
            </div>

            <div className={styles.space_div}>
                <label>{policy.p4.label}</label> {policy.p4.text}
            </div>

            <div className={styles.space_div}>
                <label>{policy.p5.label}</label> {policy.p5.text}
            </div>

            <div className={styles.space_div}>
                <label>{policy.p6.label}</label> {policy.p6.text}
            </div>

            <div className={styles.space_div}>
                <label>{policy.p7.label}</label> {policy.p7.text}
            </div>

            <div className={styles.space_div}>
                <label>{policy.p8.label}</label> {policy.p8.text}
            </div>

            <div className={styles.email}>
                {policy.p9.text1}
                <a href={`mailto:${policy.p9.email}`}>{policy.p9.email}</a>.
                <div>{policy.p9.text2}.</div>
            </div>
        </div>
    );
}

export default PrivacyPolicy;
