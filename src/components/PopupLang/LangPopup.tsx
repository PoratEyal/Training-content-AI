//
// This is a language selection popup that lets users switch between supported languages.
// On language change, it clears the session data, updates the user's language in the database (if logged in),
// clears app data, and navigates to the home page for the new language.
//

import React, { useState } from "react"
import ReactDOM from "react-dom"
import { useNavigate } from "react-router-dom"
import { AiOutlineLoading } from "react-icons/ai"
import { useLanguage } from "../../i18n/useLanguage"
import { useAuthContext } from "../../context/AuthContext"
import { useContentContext } from "../../context/ContentContext"
import { useProduct } from "../../context/ProductContext"
import { ProductType } from "../../context/ProductType"
import { fetchUpdateUser } from "../../utils/fetch"
import route from "../../router/route.json"
import styles from "./LangPopup.module.css"

type LangPopupProps = {
  handleClose: () => void
}

const LangPopup: React.FC<LangPopupProps> = ({ handleClose }) => {
  const { changeLang, lang } = useLanguage()
  const { currentUser, setCurrentUser } = useAuthContext()
  const { clearAll } = useContentContext()
  const navigate = useNavigate()
  const product = useProduct()

  const [isLoading, setIsLoading] = useState(false)
  const [loadingLang, setLoadingLang] = useState<string | null>(null)

  const homePagePath = (newLang: string) => {
    const capitalizedLang = newLang.charAt(0).toUpperCase() + newLang.slice(1)
    switch (product) {
      case ProductType.Practice:
        return route[`practiceHomePage${capitalizedLang}`] || route.practiceHomePageEn
      case ProductType.Youth:
        return route[`youthHomePage${capitalizedLang}`] || route.youthHomePageEn
      case ProductType.Words:
        return route[`wordsHomePage${capitalizedLang}`] || route.wordsHomePageEn
      default:
        return "/"
    }
  }

  const closePopup = (callback?: () => void) => {
    if (callback) callback()
    handleClose()
  }

  const changeLanguage = async (newLang: string) => {
    setLoadingLang(newLang)
    setIsLoading(true)

    localStorage.setItem("i18nextLng", newLang)

    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        movement: {
          movement: null,
          grade: null,
          gender: null,
          amount: null,
        },
      }

      await fetchUpdateUser({ user: updatedUser })
      setCurrentUser(updatedUser)
      clearAll()  // Clean all data from Session Storage, MUST BE AT THE END OF THE FUNCTION !!!
    }

    changeLang(newLang)
    closePopup(() => {
      navigate(homePagePath(newLang))
    })

    setIsLoading(false)
    setLoadingLang(null)
  }

  return ReactDOM.createPortal(
    <div
      className={styles.popupOverlay}
      onClick={() => closePopup()}
      role="dialog"
      aria-modal="true"
      aria-label="Language Selection Popup"
    >
      <div
        className={styles.popupContent}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.buttonContainer}>
          {["he", "en", "es", "ar"].map((lng) => (
            <button
              key={lng}
              onClick={() => changeLanguage(lng)}
              className={`${styles.languageButton} ${
                lang === lng ? styles.selected : ""
              }`}
              disabled={lang === lng}
              lang={lng === "ar" ? "ar" : undefined}
            >
              {{
                en: "English",
                es: "Español",
                he: "עברית",
                ar: "العربية",
              }[lng]}
              {loadingLang === lng ? (
                <span className={styles.checkmark}>
                  <AiOutlineLoading className={styles.loadingIcon} />
                </span>
              ) : (
                lang === lng &&
                !loadingLang && <span className={styles.checkmark}>✔</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>,
    document.body
  )
}

export default LangPopup
