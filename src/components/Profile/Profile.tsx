import Dropdown from "../Layout/Dropdown/Dropdown"
import { Icons } from "../Icons"
import DropOptContactUs from "../options/dropdown/DropOptContactUs"
import DropOptFAQ from "../options/dropdown/DropOptFAQ"
import DropOptInviteFriends from "../options/dropdown/DropOptInviteFriends"
import DropOptLang from "../options/dropdown/DropOptLang"
import DropOptLogout from "../options/dropdown/DropOptLogout"
import DropOptPrivacy from "../options/dropdown/DropOptPrivacy"
import DropOptSignIn from "../options/dropdown/DropOptSignIn"
import { useAuthContext } from "../../context/AuthContext"
import useToggle from "../../hooks/useToggle"
import styles from "./Profile.module.css"

type ProfileProps = {
  img?: string
  isLoading: boolean
  openLangPopup: () => void
  openPrivacyPopup: () => void
  openContactPopup: () => void
}

function Profile({ img, isLoading, openLangPopup, openPrivacyPopup, openContactPopup }: ProfileProps) {
  const { isLoggedIn } = useAuthContext()
  const [isOpen, toggle, close] = useToggle(false)

  return (
    <div style={{ position: "relative" }}>
      {isLoading ? (
        <div className={styles.user_profile}>
          <div className={styles.img_div}>
            <Icons.user className={styles.no_user_profile_img} />
          </div>
        </div>
      ) : (
        <div className={styles.user_profile} onClick={toggle}>
          <div className={styles.img_div}>
            {img ? (
              <img
                className={styles.user_profile_img}
                src={img}
                height={30}
                width={30}
                alt="Profile"
                title="Profile"
              />
            ) : (
              <Icons.user className={styles.no_user_profile_img} />
            )}
          </div>
        </div>
      )}

      {isOpen && (
        <Dropdown handleClose={close}>
          <DropOptInviteFriends />
          <DropOptContactUs handleClose={close} openContactPopup={openContactPopup} />
          <DropOptPrivacy handleClose={close} openPrivacyPopup={openPrivacyPopup} />
          <DropOptFAQ handleClose={close} />
          <DropOptLang handleClose={close} openLangPopup={openLangPopup} />
          <hr className={styles.dropdown_divider} />
          {isLoggedIn ? (
            <DropOptLogout handleClose={close} />
          ) : (
            <DropOptSignIn handleClose={close} />
          )}
        </Dropdown>
      )}
    </div>
  )
}

export default Profile
