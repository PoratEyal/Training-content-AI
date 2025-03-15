import React, { useState } from "react";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import route from "../../router/route.json";
import { useNavigate } from "react-router-dom";
import { DETAILS_AD_SLOT } from "../../models/constants/adsSlot";
import styles from "./ContactUs.module.css";
import { useAuthContext } from "../../context/AuthContext";
import { useErrorContext } from "../../context/ErrorContext";
import emailjs from "emailjs-com";
import SmallLoading from "../../components/Loading/SmallLoading/SmallLoading";
import { Icons } from "../../components/Icons";

const ContactUs: React.FC = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuthContext();
    const { handleSuccess } = useErrorContext();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [formData, setFormData] = useState({
        email: currentUser?.email || "",
        name: "",
        message: "",
    });

    emailjs.init("ZWKebkgRROVgM8nEV");

    const goBack = () => {
        navigate(-1);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === "name" && value.length > 50) return;
        if (name === "message" && value.length > 200) return;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const templateParams = {
                user_response: formData.message,
                user_email: formData.email,
                user_name: formData.name,
            };

            await emailjs.send(
                "service_p5bim93", // EmailJS Service ID
                "template_diemfva", // EmailJS Template ID
                templateParams,
                "ZWKebkgRROVgM8nEV", // EmailJS User ID
            );

            handleSuccess("ההודעה נשלחה בהצלחה!");
            setFormData({
                email: currentUser?.email || "",
                name: "",
                message: "",
            });
        } catch (error) {
            console.error("Error sending email:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const isDisabled =
        !formData.message.trim() || !formData.name.trim() || !formData.email.trim() || isLoading;

    return (
        <PageLayout
            id="contactUs"
            path={route.contactUs}
            hasHeader={{ goBack }}
            hesAds={DETAILS_AD_SLOT}
            hasNavBar
        >
            <section className={styles.header}>
                <h3 className={styles.title}>מה תרצו לספר לנו?</h3>
                <p className={styles.subtitle}>לכל הצעה, בקשה או בעיה, דברו איתנו!</p>
            </section>
            <form onSubmit={handleSubmit} className={styles.contactForm}>
                <div className={styles.inputGroup}>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="אימייל"
                        required
                        disabled={!!currentUser?.email}
                        className={styles.input}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="שם"
                        required
                        maxLength={50}
                        className={styles.input}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="מה תרצה לספר לנו?"
                        required
                        maxLength={200}
                        className={styles.textarea}
                    />
                    <div className={styles.charCount}>{formData.message.length}/200</div>
                </div>
                <div className={styles.buttonContainer}>
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={isDisabled}
                        className={`${styles.submitButton} ${isDisabled ? styles.submitButtonDisabled : ""}`}
                        style={{ height: 40 }}
                    >
                        {isLoading ? (
                            <div className={styles.btnLoading}>
                                <SmallLoading />
                            </div>
                        ) : (
                            <div className={styles.buttonContent}>
                                <span
                                    className={styles.buttonText}
                                    style={{ opacity: isDisabled ? 0.5 : 1 }}
                                >
                                    שליחה
                                </span>
                                <div
                                    className={styles.buttonIcon}
                                    style={{ opacity: isDisabled ? 0.5 : 1 }}
                                >
                                    <Icons.chevronsLeft className={styles.icon} />
                                </div>
                            </div>
                        )}
                    </button>
                </div>
            </form>
        </PageLayout>
    );
};

export default ContactUs;
