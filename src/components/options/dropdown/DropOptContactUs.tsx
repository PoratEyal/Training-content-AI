//
// This is a dropdown option that navigates the user to the Contact Us page.
// It handles dynamic language-based routing and closes the dropdown on click.
//
import { useNavigate } from "react-router-dom"
import { useLanguage } from "../../../i18n/useLanguage"
import { useProduct } from "../../../context/ProductContext"
import { ProductType } from "../../../context/ProductType"
import route from "../../../router/route.json"
import { Icons } from "../../Icons"
import styles from "./dropdown.module.css"

type ContactUsProps = {
  handleClose: () => void
}

function DropOptContactUs({ handleClose }: ContactUsProps) {

  const { t, lang } = useLanguage()
  const navigate = useNavigate()
  const product = useProduct()

  const isPractice = product === ProductType.Practice;
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
