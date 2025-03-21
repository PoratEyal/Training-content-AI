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
import { useTranslation } from "react-i18next";

const ContactUs: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuthContext();
  const { handleSuccess } = useErrorContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { t, i18n } = useTranslation();

  const [formData, setFormData] = useState({
    email: currentUser?.email || "",
    name: "",
    message: "",
  });

  emailjs.init("ZWKebkgRROVgM8nEV");

  const goBack = () => {
    navigate(-1);
  };

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
    } catch (error) {
      console.error("Error sending email:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isDisabled =
    !formData.message.trim() ||
    !formData.name.trim() ||
    !formData.email.trim() ||
    isLoading;

  // Determine if current language is Hebrew
  const isHebrew = i18n.language === "he";
  const direction = isHebrew ? "rtl" : "ltr";
  const textAlign = isHebrew ? "right" : "left";

  return (
    <PageLayout
      id="contactUs"
      path={route.contactUs}
      hasHeader={{ goBack }}
      hesAds={DETAILS_AD_SLOT}
      hasNavBar
    >
      <section className={styles.header} style={{ direction }}>
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
        style={{ direction }}
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
              right: isHebrew ? "0.5rem" : "auto",
              left: isHebrew ? "auto" : "0.5rem",
            }}
          >
            {formData.message.length}/200
          </div>
        </div>

        {/* Button container: For English, align right; for Hebrew, align left */}
        <div
          className={styles.buttonContainer}
          style={{
            justifyContent: isHebrew ? "flex-end" : "flex-start",
          }}
        >
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isDisabled}
            className={`${styles.submitButton} ${
              isDisabled ? styles.submitButtonDisabled : ""
            }`}
            style={{ height: 40 }}
          >
            {isLoading ? (
              <div className={styles.btnLoading}>
                <SmallLoading />
              </div>
            ) : (
              <div className={styles.buttonContent} style={{ direction }}>
                <span
                  className={styles.buttonText}
                  style={{ opacity: isDisabled ? 0.5 : 1 }}
                >
                  {t("contactUs.form.submitButton")}
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
