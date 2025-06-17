//
// Allows users to share a link to invite friends
// The share message is based on the current URL:
// - If it's a Youth activity page, the message includes the activity's content
// - If it's from Youth any other page, the message includes the predefined Youth share text
// - If it's from Practice, the message includes the predefined practice share text
//

import { useLocation } from "react-router-dom"

import { useLanguage } from "../../../i18n/useLanguage"
import { useProduct } from "../../../context/ProductContext"
import { ProductType } from "../../../context/ProductType"
import { useContentContext } from "../../../context/ContentContext"
import route from "../../../router/route.json"
import { WEBSITE_URL } from "../../../models/constants"
import { formatWhatsUp } from "../../../utils/format"
import { Icons } from "../../Icons"
import styles from "./dropdown.module.css"

function DropOptInviteFriends() {

  const { t, lang } = useLanguage()
  const { mainActivity } = useContentContext()
  const { pathname } = useLocation()
  const product = useProduct()
  const isPractice = product === ProductType.Practice

  const activityContentPath = route[`youthActivityAI${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.youthActivityAIEn
  const isYouthActivityPage = pathname === activityContentPath

  const handleShare = async () => {
    let shareText = ""

    if (isYouthActivityPage) {
      shareText = formatWhatsUp(mainActivity?.activity)
    } else if (isPractice) {
      shareText = t("articleOptions.share.practiceDefaultMessage")
    } else {
      shareText = t("articleOptions.share.youthDefaultMessage")
    }

    let shareUrl = `${WEBSITE_URL}/${lang}`
    shareUrl += isPractice ? "/practice" : "/youth"

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
