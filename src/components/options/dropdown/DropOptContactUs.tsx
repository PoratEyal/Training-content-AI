//
// This is a dropdown option that navigates the user to the Contact Us page.
// It handles dynamic language-based routing and closes the dropdown on click.
//
import styles from "./dropdown.module.css"
import { Icons } from "../../Icons"
import { useNavigate } from "react-router-dom"
import route from "../../../router/route.json"
import { useLanguage } from "../../../i18n/useLanguage"

type ContactUsProps = {
  handleClose: () => void
}

function DropOptContactUs({ handleClose }: ContactUsProps) {
  const { t, lang } = useLanguage()
  const navigate = useNavigate()

  // Determine the contact page route based on language (fallback to He)
  const contactUsPath = route[`contactUs${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.contactUsHe;

  const handleClick = () => {
    navigate(contactUsPath)
    handleClose()
  }

  return (
    <span className={styles.text_and_icon} onClick={handleClick}>
      {t("profile.dropOptContactUs.contact")}
      <Icons.contactUs />
    </span>
  )
}

export default DropOptContactUs
