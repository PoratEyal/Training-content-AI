//
// This is a dropdown option to navigate the user to the FAQ page.
//
import styles from "./dropdown.module.css"
import { useNavigate, useLocation } from "react-router-dom"
import route from "../../../router/route.json"
import { Icons } from "../../Icons"
import { useLanguage } from "../../../i18n/useLanguage"

type DropdownOption = {
  handleClose: () => void
}

function DropOptLang({ handleClose }: DropdownOption) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { t, lang } = useLanguage()

  const langKey = lang.charAt(0).toUpperCase() + lang.slice(1)

  const faqPath =
    pathname.includes("practice")
      ? route[`smartFAQ${langKey}`] || route.smartFAQEn
      : route[`faq${langKey}`] || route.faqEn

  const handleClick = () => {
    navigate(faqPath)
    handleClose()
  }

  return (
    <span className={styles.text_and_icon} onClick={handleClick}>
      {t("profile.dropOptFAQ.faq")}
      <Icons.faq />
    </span>
  )
}

export default DropOptLang
