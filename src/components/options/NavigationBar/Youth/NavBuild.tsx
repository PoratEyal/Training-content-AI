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

  const youthDetailsPath = route[`youthDetails${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.youthDetailsEn
  const youthBuildPath = route[`youthBuild${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.youthBuildEn
  const youthActivityAIPath = route[`youthActivityAI${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.youthActivityAIEn

  useEffect(() => {
    setIsSelected(
      location.pathname === youthDetailsPath ||
      location.pathname === youthBuildPath ||
      location.pathname === youthActivityAIPath
    )
  }, [location.pathname, youthDetailsPath, youthBuildPath, youthActivityAIPath])

  const handleClick = () => {
    startAsGuestOrUser({
      currentUser,
      isLoggedIn,
      cookieLimit,
      setLimitCookie,
      signInWithGoogle,
      navigateTo: youthDetailsPath,
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
