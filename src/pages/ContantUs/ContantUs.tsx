import { useState } from "react";
import styles from "./ContantUs.module.css";
import { useNavigate } from "react-router-dom";
import route from "../../router/route.json";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import MainBtn from "../../components/MainBtn/MainBtn";
import MsgInput from "../../components/MsgInput/MsgInput";
import { fetchSendMsg } from "../../utils/fetch";
import ContactWithUs from "../../components/titles/ContactWithUs/ContactWithUs";

function ContantUs() {
    const [isSent, setIsSent] = useState(false);

    const [formData, setFormData] = useState("");
    const [isDisabled, setIsDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setIsDisabled(true);

        try {
            await fetchSendMsg({ msg: formData });
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
            setIsDisabled(false);
            setIsSent(true);
        }
    };

    if (isSent) {
        return (
            <PageLayout path={route.contactUs} hasGreenBackground hasHeader={{ goBack }}>
                <ContactWithUs />
                <section className={styles.contact_thanks_container}>
                    <img
                        className={styles.lamp_img}
                        title="Yellow lamp"
                        alt="Yellow lamp"
                        src={"lamp.svg"}
                        loading="lazy"
                        width={135}
                        height={139}
                    ></img>
                    <p className={styles.contact_thanks}>
                        התגובה שלכם התקבלה <br/> תודה שאתם עוזרים לנו להשתפר 🙏
                    </p>
                    <button className={styles.contact_back_btn} onClick={goBack}>חזרה למסך הראשי</button>
                </section>
            </PageLayout>
        );
    }

    return (
        <PageLayout path={route.contactUs} hasGreenBackground hasHeader={{ goBack }}>
            <ContactWithUs />
            <form onSubmit={handleSubmit} className={styles.contact_form}>
                <img
                    className={styles.lamp_img}
                    title="Yellow lamp"
                    alt="Yellow lamp"
                    src={"lamp.svg"}
                    loading="lazy"
                    width={135}
                    height={139}
                ></img>

                <p className={styles.contact_p}>
                    אנחנו תמיד מחפשים דרכים לשפר את האתר. האם יש לכם רעיון לשיפור, שינוי או תיקון ?
                </p>
                <div className={styles.contact_btn}>
                    <div className={styles.contact_inputs}>
                        <MsgInput
                            subject={formData}
                            setSubject={setFormData}
                            setIsDisabled={setIsDisabled}
                        />
                    </div>
                    <div className={styles.btn_div}>
                        <MainBtn
                            type="submit"
                            isDisabled={isDisabled}
                            isLoading={isLoading}
                            height={42}
                            text="שלח"
                            func={handleSubmit}
                        ></MainBtn>
                    </div>
                </div>
            </form>
        </PageLayout>
    );
}

export default ContantUs;
