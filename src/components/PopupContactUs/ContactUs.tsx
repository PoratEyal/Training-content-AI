import React, { useState } from "react"
import styles from "./ContactUs.module.css"
import { useLanguage } from "../../i18n/useLanguage"
import { useNotificationContext } from "../../context/NotificationContext"
import { useAuthContext } from "../../context/AuthContext"
import emailjs from "emailjs-com"
import { logEvent } from "../../utils/logEvent";

type Props = {
  onClose: () => void
}

function PopupContactUs({ onClose }: Props) {
  const { t, dir, textAlign, lang } = useLanguage()
  const { currentUser } = useAuthContext()
  const { notifySuccess } = useNotificationContext()
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    email: currentUser?.email || "",
    name: "",
    message: "",
  })

  emailjs.init("ZWKebkgRROVgM8nEV")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name === "name" && value.length > 50) return
    if (name === "message" && value.length > 200) return
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await emailjs.send(
        "service_p5bim93",
        "template_diemfva",
        {
          user_response: formData.message,
          user_email: formData.email,
          user_name: formData.name,
        },
        "ZWKebkgRROVgM8nEV"
      )
      notifySuccess(t("contactUs.form.successMessage"))
      setFormData({ email: currentUser?.email || "", name: "", message: "", })
      onClose()

    } catch (error) {
      const userEmail = currentUser?.email || "guest";
      logEvent(`[ContactUs]: "Failed to send contactUs mail:", error}`, userEmail);

    } finally {
      setIsLoading(false)
    }
  }

  const isDisabled =
    !formData.message.trim() ||
    !formData.name.trim() ||
    !formData.email.trim() ||
    isLoading

  return (
    <div className={styles.popup_overlay}>
      <div className={styles.popup_container} dir={dir}>
        <button className={styles.close_button} onClick={onClose}>✕</button>

        <h3 className={styles.title} style={{ textAlign }}>{t("contactUs.header.title")}</h3>
        <p className={styles.subtitle} style={{ textAlign }}>{t("contactUs.header.subtitle")}</p>

        <form onSubmit={handleSubmit} className={styles.contactForm}>
          <input
            type="email"
            name="email"
            placeholder={t("contactUs.form.emailPlaceholder")}
            value={formData.email}
            onChange={handleInputChange}
            required
            disabled={!!currentUser?.email}
            className={styles.input}
            style={{ textAlign }}
          />
          <input
            type="text"
            name="name"
            placeholder={t("contactUs.form.namePlaceholder")}
            value={formData.name}
            onChange={handleInputChange}
            required
            className={styles.input}
            style={{ textAlign }}
          />
          <textarea
            name="message"
            placeholder={t("contactUs.form.messagePlaceholder")}
            value={formData.message}
            onChange={handleInputChange}
            required
            className={styles.textarea}
            style={{ textAlign }}
          />

          <div className={styles.charCount}>
            {formData.message.length}/200
          </div>

          <button type="submit" className={styles.submitButton} disabled={isDisabled}>
            {isLoading ? t("contactUs.form.loadingButton") : t("contactUs.form.submitButton")}
          </button>
        </form>
      </div>
    </div>
  )
}

export default PopupContactUs
