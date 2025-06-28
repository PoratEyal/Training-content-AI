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

  const homePagePath = () => {
    const langKey = lang.charAt(0).toUpperCase() + lang.slice(1)
    let homeKey = ""
    if (product === ProductType.Practice)
      homeKey = "practiceHomePage"
    else if (product === ProductType.Words)
      homeKey = "wordsHomePage"
    else
      homeKey = "youthHomePage"

    return route[`${homeKey}${langKey}`] || route[`${homeKey}En`]
  }

  const handleClick = async () => {
    await logout()
    clearAll()
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
