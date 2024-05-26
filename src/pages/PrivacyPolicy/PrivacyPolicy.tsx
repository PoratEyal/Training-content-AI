import styles from "./PrivacyPolicy.module.css";
import { useNavigate } from "react-router-dom";
import policy from "../../models/resources/policy.json";
import { IoArrowForward } from "react-icons/io5";

function PrivacyPolicy() {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    return (
        <div className={styles.privacyPolicyContainer}>
            <IoArrowForward onClick={goBack} className={styles.back_icon}></IoArrowForward>

            <div>
                <h1 className={styles.page_title}>תנאי שירות</h1>

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
            </div>

            <div className={styles.email}>
                {policy.p9.text1}
                <a href={`mailto:${policy.p9.email}`}>{policy.p9.text2}</a>
                <div>{policy.p9.text3}.</div>
            </div>
        </div>
    );
}

export default PrivacyPolicy;
