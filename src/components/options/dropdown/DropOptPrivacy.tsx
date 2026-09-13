import styles from "./dropdown.module.css"
import { Icons } from "../../Icons"
import { useLanguage } from "../../../i18n/useLanguage"

type DropOptPrivacyProps = {
  handleClose: () => void
  openPrivacyPopup: () => void
}

function DropOptPrivacy({ handleClose, openPrivacyPopup }: DropOptPrivacyProps) {
  const { t } = useLanguage()

  const handleClick = () => {
    openPrivacyPopup()
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
