//
// This is an option that allows users to share a link to invite friends
// If on the activity page, it includes the activity's text in the share message
//
import styles from "./dropdown.module.css"
import { formatWhatsUp } from "../../../utils/format"
import { WEBSITE_URL } from "../../../models/constants"
import { Icons } from "../../Icons"
import { useContentContext } from "../../../context/ContentContext"
import { useLocation } from "react-router-dom"
import route from "../../../router/route.json"
import { useLanguage } from "../../../i18n/useLanguage"

function DropOptInviteFriends() {
  const { t, lang } = useLanguage()
  const { mainActivity } = useContentContext()
  const { pathname } = useLocation()

  const activityContentPath = route[`youthActivityAI${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.youthActivityAIEn

  // Only include activity text in the share message if on the activity page
  const shareText = formatWhatsUp(
    pathname === activityContentPath ? mainActivity?.activity : undefined
  )

  const fullText = `${shareText}\n\n${WEBSITE_URL}`

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: t("profile.dropOptInviteFriends.invite"),
          text: fullText,
        })
      } catch {
        window.open(`https://wa.me/?text=${encodeURIComponent(fullText)}`, "_blank")
      }
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(fullText)}`, "_blank")
    }
  }

  return (
    <span onClick={handleShare} className={styles.text_and_icon}>
      {t("profile.dropOptInviteFriends.invite")}
      <Icons.Share />
    </span>
  )
}

export default DropOptInviteFriends
