import styles from "./PrivacyPolicy.module.css";
import { useNavigate } from "react-router-dom";
import policy from "../../models/resources/policy.json";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import route from "../../router/route.json";
import helmet from "../../models/resources/helmet.json";
import FadeEffect from "../../components/FadeEffect/FadeEffect";

function PrivacyPolicy() {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    return (
        <PageLayout
            path={route.privacyPolicy}
            hasHeader={{ goBack, isBlur: true }}
            title={helmet.policy.title}
            content={helmet.policy.content}
            index={false}
        >
            <FadeEffect hasFade>
                <article className={styles.privacy_article}>
                    <section>
                        <h1 className={styles.page_title}>תנאי שירות ומדיניות פרטיות</h1>

                        <div className={styles.space_div}>
                            <label>{policy.p0.text}</label>
                        </div>

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

                        <div className={styles.space_div}>
                            <label>{policy.p9.label}</label> {policy.p9.text}
                        </div>
                    </section>

                    <section className={styles.email}>
                        {policy.p10.text1}
                        <a href={`mailto:${policy.p10.email}`}>{policy.p10.text2}</a>
                        <div>{policy.p10.text3}.</div>
                    </section>
                </article>
            </FadeEffect>
        </PageLayout>
    );
}

export default PrivacyPolicy;
