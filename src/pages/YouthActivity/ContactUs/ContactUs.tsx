//
// This is the Contact Us page where users can send feedback, questions, or requests.
//
import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import route from "../../../router/route.json";
import styles from "./ContactUs.module.css";
import PageLayout from "../../../components/Layout/PageLayout/PageLayout";
import MainBtn from "../../../components/MainBtn/MainBtn";
import { useLanguage } from "../../../i18n/useLanguage";
import { useAuthContext } from "../../../context/AuthContext";
import { useNotificationContext } from "../../../context/NotificationContext";
import { ProductType } from "../../../context/ProductType";
import { logEvent } from "../../../utils/logEvent";

const ContactUs: React.FC = () => {

  const { t, isRTL, dir, textAlign, lang } = useLanguage();
  const navigate = useNavigate();
  const { currentUser } = useAuthContext();
  const { notifySuccess: handleSuccess } = useNotificationContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    email: currentUser?.email || "",
    name: "",
    message: "",
  });

  const capitalizedLang = lang.charAt(0).toUpperCase() + lang.slice(1);
  const youthHomePagePath = route[`youthHomePage${capitalizedLang}`] || route.youthHomePageEn;

  emailjs.init("ZWKebkgRROVgM8nEV");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
        "service_p5bim93",
        "template_diemfva",
        templateParams,
        "ZWKebkgRROVgM8nEV"
      );

      handleSuccess(t("contactUs.form.successMessage"));
      setFormData({
        email: currentUser?.email || "",
        name: "",
        message: "",
      });

      navigate(youthHomePagePath);
    } catch (error) {
      const auth = getAuth();
      const user = auth.currentUser;
      const userEmail = user?.email || formData.email || "guest";
      logEvent(`[Youth.ContactUs]: Error sending email: ${error?.toString?.() || "unknown error"}`, userEmail);
    }
    finally {
      setIsLoading(false);
    }
  };

  const isDisabled =
    !formData.message.trim() ||
    !formData.name.trim() ||
    !formData.email.trim() ||
    isLoading;

  return (
    <PageLayout
      id="contactUs"
      productType={ProductType.Youth}
      hasHeader={{}}
      hasNavBar
    >
      <section className={styles.header} style={{ direction: dir }}>
        <h3 className={styles.title} style={{ textAlign }}>
          {t("contactUs.header.title")}
        </h3>
        <p className={styles.subtitle} style={{ textAlign }}>
          {t("contactUs.header.subtitle")}
        </p>
      </section>

      <form
        onSubmit={handleSubmit}
        className={styles.contactForm}
        style={{ direction: dir }}
      >
        <div className={styles.inputGroup}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder={t("contactUs.form.emailPlaceholder")}
            required
            disabled={!!currentUser?.email}
            className={styles.input}
            style={{ textAlign }}
          />
        </div>

        <div className={styles.inputGroup}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder={t("contactUs.form.namePlaceholder")}
            required
            maxLength={50}
            className={styles.input}
            style={{ textAlign }}
          />
        </div>

        <div className={styles.inputGroup}>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder={t("contactUs.form.messagePlaceholder")}
            required
            maxLength={200}
            className={styles.textarea}
            style={{ textAlign }}
          />
          <div
            className={styles.charCount}
            style={{
              right: isRTL ? "0.5rem" : "auto",
              left: isRTL ? "auto" : "0.5rem",
            }}
          >
            {formData.message.length}/200
          </div>
        </div>

        <div className={`${styles.btn_div} ${isRTL ? styles.RTLDir : styles.LTRDir}`}>
          <MainBtn
            text={t("contactUs.form.submitButton")}
            isDisabled={isDisabled}
            type="submit"
            func={handleSubmit}
            height={42}
            isLoading={isLoading}
          />
        </div>
      </form>
    </PageLayout>
  );
};

export default ContactUs;
