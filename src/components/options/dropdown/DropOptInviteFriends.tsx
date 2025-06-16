//
// Allows users to share a link to invite friends
// The share message is based on the current URL:
// - If it's a Youth activity page, the message includes the activity's content
// - If it's from Youth any other page, the message includes the predefined Youth share text
// - If it's from Practice, the message includes the predefined practice share text
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

  const handleShare = async () => {

    const activityContentPath = route[`youthActivityAI${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.youthActivityAIEn

    let shareText = ""

    const isActivityPage = pathname === activityContentPath
    const isPracticePage = pathname.includes("/practice")

    if (isActivityPage) {
      shareText = formatWhatsUp(mainActivity?.activity)
    } else if (isPracticePage) {
      shareText = t("articleOptions.share.practiceDefaultMessage")
    } else {
      shareText = t("articleOptions.share.youthDefaultMessage")
    }

    let shareUrl = `${WEBSITE_URL}/${lang}`
    shareUrl += isPracticePage ? "/practice" : "/youth"

    const fullText = `${shareText}\n\n${shareUrl}`

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
