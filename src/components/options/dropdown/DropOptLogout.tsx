//
// This is a dropdown option for logging out the user.
// It clears all user data from the context and logs them out.
// The page navigates to the home page, adjusting for the current language.
//

import { useNavigate } from "react-router-dom"
import { useLanguage } from "../../../i18n/useLanguage"
import { useContentContext } from "../../../context/ContentContext"
import { useAuthContext } from "../../../context/AuthContext"
import { useProduct } from "../../../context/ProductContext"
import { ProductType } from "../../../context/ProductType"
import route from "../../../router/route.json"
import { Icons } from "../../Icons"
import styles from "./dropdown.module.css"

type DropdownOption = {
  handleClose: () => void
}

function DropOptLogout({ handleClose }: DropdownOption) {

  const { t, lang } = useLanguage()
  const { clearAll } = useContentContext()
  const { logout } = useAuthContext()
  const navigate = useNavigate()
  const product = useProduct()
  const isPractice = product === ProductType.Practice

  const homePagePath = () => {
    const capitalizedLang = lang.charAt(0).toUpperCase() + lang.slice(1)
    return isPractice
      ? route[`practiceHomePage${capitalizedLang}`] || route.practiceHomePageEn
      : route[`youthHomePage${capitalizedLang}`] || route.youthHomePageEn
  }

  const handleLogout = async () => {
    await logout()
    clearAll()
  }

  const handleClick = async () => {
    await handleLogout()
    navigate(homePagePath())
    handleClose()
  }

  return (
    <span className={styles.text_and_icon} onClick={handleClick}>
      {t("profile.dropOptLogout.logout")}
      <Icons.logout />
    </span>
  )
}

export default DropOptLogout
