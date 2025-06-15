//
// This is a dropdown option that navigates the user to the Contact Us page.
// It handles dynamic language-based routing and closes the dropdown on click.
//
import styles from "./dropdown.module.css"
import { Icons } from "../../Icons"
import { useNavigate, useLocation } from "react-router-dom"
import route from "../../../router/route.json"
import { useLanguage } from "../../../i18n/useLanguage"

type ContactUsProps = {
  handleClose: () => void
}

function DropOptContactUs({ handleClose }: ContactUsProps) {
  
  const { t, lang } = useLanguage()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const isPractice = pathname.includes("/practice");
  const langKey = lang.charAt(0).toUpperCase() + lang.slice(1);

  const contactUsPath = isPractice
    ? route[`practiceContactUs${langKey}`] || route.practiceContactUsEn
    : route[`youthContactUs${langKey}`] || route.youthContactUsEn;

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
