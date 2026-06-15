//
// This is a dropdown option that opens the Contact Us popup and closes the dropdown.
//
import { useLanguage } from "../../../i18n/useLanguage"
import { Icons } from "../../Icons"
import styles from "./dropdown.module.css"

type ContactUsProps = {
  handleClose: () => void
  openContactPopup: () => void
}

function DropOptContactUs({ handleClose, openContactPopup }: ContactUsProps) {
  const { t } = useLanguage()

  const handleClick = () => {
    openContactPopup()
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
