//
// Header component
// It shows the user's profile, title and back button
//
import React, { useState } from "react"
import { useAuthContext } from "../../../context/AuthContext"
import { useLanguage } from "../../../i18n/useLanguage"
import { Icons } from "../../Icons"
import Profile from "../../Profile/Profile"
import LangPopup from "../../PopupLang/LangPopup"
import PopupPrivacy from "../../PopupPrivacy/PrivacyContent"
import PopupContactUs from "../../PopupContactUs/ContactUs"
import styles from "./Header.module.css"


type HeaderProps = {
  goBack?: () => void
  hasTitle?: string
  isBlur?: boolean
}

const Header: React.FC<HeaderProps> = ({
  goBack,
  hasTitle = undefined,
  isBlur = false,
}) => {
  const { isRTL } = useLanguage()
  const { isLoggedIn, loading, currentUser } = useAuthContext()
  const style = isBlur ? styles.header_fade : styles.header
  const styleIcon = isBlur ? styles.back_icon_fade : styles.back_icon

  const [isLangPopupOpen, setIsLangPopupOpen] = useState(false)
  const [isPrivacyPopupOpen, setIsPrivacyPopupOpen] = useState(false)
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false)

  const openLangPopup = () => setIsLangPopupOpen(true)
  const closeLangPopup = () => setIsLangPopupOpen(false)

  const openPrivacyPopup = () => setIsPrivacyPopupOpen(true)
  const closePrivacyPopup = () => setIsPrivacyPopupOpen(false)

  const openContactPopup = () => setIsContactPopupOpen(true)
  const closeContactPopup = () => setIsContactPopupOpen(false)

  return (
    <section className={style}>
      <div
        className={
          isRTL ? styles.header_container : `${styles.header_container} ${styles.rtl}`
        }
      >
        <Profile
          img={isLoggedIn ? currentUser?.image : undefined}
          isLoading={loading}
          openLangPopup={openLangPopup}
          openPrivacyPopup={openPrivacyPopup}
          openContactPopup={openContactPopup}
        />
        {hasTitle && (
          <h1 className={styles.header_title} dir={isRTL ? "rtl" : "ltr"}>
            {hasTitle}
          </h1>
        )}

        {!loading && goBack ? (
          isRTL ? (
            <Icons.arrowBack onClick={goBack} className={styleIcon} />
          ) : (
            <Icons.arrowForward onClick={goBack} className={styleIcon} />
          )
        ) : null}
      </div>

      {isLangPopupOpen && <LangPopup handleClose={closeLangPopup} />}
      {isPrivacyPopupOpen && <PopupPrivacy onClose={closePrivacyPopup} />}
      {isContactPopupOpen && <PopupContactUs onClose={closeContactPopup} />}
    </section>
  )
}

export default Header
