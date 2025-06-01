//
// This is a dropdown option to navigate the user to the FAQ page.
// It dynamically sets the route path based on the active language.
// On click, it navigates and closes the dropdown.
//
import styles from "./dropdown.module.css"
import { useNavigate } from "react-router-dom"
import route from "../../../router/route.json"
import { Icons } from "../../Icons"
import { useLanguage } from "../../../i18n/useLanguage"

type DropdownOption = {
  handleClose: () => void
}

function DropOptLang({ handleClose }: DropdownOption) {
  const navigate = useNavigate()
  const { t, lang } = useLanguage()

  // Determine the language-specific FAQ path (fallback to Hebrew)
  const faqPath =
    route[`faq${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || "/he/faq"

  const handleClick = () => {
    navigate(faqPath)
    handleClose()
  }

  return (
    <span className={styles.text_and_icon} onClick={handleClick}>
      {t("profile.dropOptFQA.fqa")}
      <Icons.fqa />
    </span>
  )
}

export default DropOptLang
