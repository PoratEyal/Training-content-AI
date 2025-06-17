//
// This is a dropdown option to navigate the user to the FAQ page.
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

function DropOptLang({ handleClose }: DropdownOption) {
  const navigate = useNavigate()
  const { t, lang } = useLanguage()
  const product = useProduct()

  const langKey = lang.charAt(0).toUpperCase() + lang.slice(1)

  const faqPath = product === ProductType.Practice
    ? route[`practiceFAQ${langKey}`] || route.practiceFAQEn
    : route[`youthFAQ${langKey}`] || route.youthFAQEn

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
