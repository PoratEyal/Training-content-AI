import styles from "../navbar.module.css"
import route from "../../../../router/route.json"
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Icons } from "../../../Icons"
import { useLanguage } from "../../../../i18n/useLanguage"
import { useCookiesContext } from "../../../../context/CookiesContext"
import { useAuthContext } from "../../../../context/AuthContext"
import useSignIn from "../../../../hooks/useSignIn"
import { startAsGuestOrUser } from "../../../../utils/startAsGuestOrUser"

const NavOptBuild = () => {

  const { t, lang } = useLanguage()
  const { cookieLimit, setLimitCookie } = useCookiesContext()
  const { currentUser, isLoggedIn } = useAuthContext()
  const { signInWithGoogle } = useSignIn()
  const [isSelected, setIsSelected] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const eventDetailsPath = route[`eventDetails${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.eventDetailsEn
  const eventBuildPath = route[`eventBuild${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.eventBuildEn
  const eventActivityAIPath = route[`eventActivityAI${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.eventActivityAIEn

  useEffect(() => {
    setIsSelected(
      location.pathname === eventDetailsPath ||
      location.pathname === eventBuildPath ||
      location.pathname === eventActivityAIPath
    )
  }, [location.pathname, eventDetailsPath, eventBuildPath, eventActivityAIPath])

  const handleClick = () => {
    startAsGuestOrUser({
      currentUser,
      isLoggedIn,
      cookieLimit,
      setLimitCookie,
      signInWithGoogle,
      navigateTo: eventDetailsPath,
      navigate,
    })
  }

  return (
    <div
      onClick={handleClick}
      className={isSelected ? styles.navbar_icon_selected : styles.navbar_icon}
    >
      <Icons.magic className={styles.icon} />
      <span className={styles.text}>{t("navbar.build")}</span>
    </div>
  )
}

export default NavOptBuild
