//
// This is a dropdown option to navigate the user to the Privacy Policy page.
//
import styles from "./dropdown.module.css"
import { useNavigate } from "react-router-dom"
import route from "../../../router/route.json"
import { Icons } from "../../Icons"
import { useLanguage } from "../../../i18n/useLanguage"
import { useProduct } from "../../../context/ProductContext"
import { ProductType } from "../../../context/ProductType"

type DropdownOption = {
  handleClose: () => void
}

function DropOptPrivacy({ handleClose }: DropdownOption) {
  const navigate = useNavigate()
  const { t, lang } = useLanguage()
  const product = useProduct()

  const langKey = lang.charAt(0).toUpperCase() + lang.slice(1)

  const privacyPolicyPath = product === ProductType.Practice
    ? route[`practicePrivacyPolicy${langKey}`] || route.practicePrivacyPolicyEn
    : route[`youthPrivacyPolicy${langKey}`] || route.youthPrivacyPolicyEn

  const handleClick = () => {
    navigate(privacyPolicyPath)
    handleClose()
  }

  return (
    <span className={styles.text_and_icon} onClick={handleClick}>
      {t("profile.dropOptPrivacy.policy")}
      <Icons.privacyPolicy />
    </span>
  )
}

export default DropOptPrivacy
