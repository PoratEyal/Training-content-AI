import styles from "./PrivacyPolicy.module.css";
import { useNavigate } from "react-router-dom";
import policy from "../../models/resources/policy.json";
import BlurEffect from "../../components/BlurEffect/BlurEffect";
import Header from "../../components/Layout/Header/Header";

function PrivacyPolicy() {
    const navigate = useNavigate();

    const goBack = () => {
        navigate("/home");
    };

    return (
        <section className={styles.privacy_policy_container}>
            <BlurEffect height="70vh">
                <Header goBack={goBack} isFade />
                <article>
                    <h1 className={styles.page_title}>תנאי שירות</h1>

                    <div className={styles.text_p}>
                        <label>{policy.p1.label}</label> {policy.p1.text}
                    </div>

                    <div className={styles.text_p}>
                        <label>{policy.p2.label}</label> {policy.p2.text}
                    </div>

                    <div className={styles.text_p}>
                        <label>{policy.p3.label}</label> {policy.p3.text}
                    </div>

                    <div className={styles.text_p}>
                        <label>{policy.p4.label}</label> {policy.p4.text}
                    </div>

                    <div className={styles.text_p}>
                        <label>{policy.p5.label}</label> {policy.p5.text}
                    </div>

                    <div className={styles.text_p}>
                        <label>{policy.p6.label}</label> {policy.p6.text}
                    </div>

                    <div className={styles.text_p}>
                        <label>{policy.p7.label}</label> {policy.p7.text}
                    </div>

                    <div className={styles.text_p}>
                        <label>{policy.p8.label}</label> {policy.p8.text}
                    </div>

                    <div className={styles.email}>
                        {policy.p9.text1}
                        <a href={`mailto:${policy.p9.email}`}>{policy.p9.text2}</a>
                        <div>{policy.p9.text3}.</div>
                    </div>
                </article>
            </BlurEffect>
        </section>
    );
}

export default PrivacyPolicy;
