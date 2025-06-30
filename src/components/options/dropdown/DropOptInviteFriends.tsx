//
// Allows users to share a link to invite friends
// Note: If it's a Youth activity page, the message includes the activity's content
//
import { useLocation } from "react-router-dom"
import { useLanguage } from "../../../i18n/useLanguage"
import { useProduct } from "../../../context/ProductContext"
import { ProductType } from "../../../context/ProductType"
import { useContentContext } from "../../../context/ContentContext"
import { useShareTextOrLink } from "../../../utils/share"
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
  const share = useShareTextOrLink()

  const handleShare = () => {

    let shareTitle = ""
    let shareText = ""
    let shareUrl = `${WEBSITE_URL}`

    if (product === ProductType.Youth) {
      const youthActivityAIPath = route[`youthActivityAI${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.youthActivityAIEn
      const isYouthActivityPage = pathname === youthActivityAIPath

      shareText = isYouthActivityPage
        ? formatWhatsUp(mainActivity?.activity)
        : t("articleOptions.share.youthShareMessage")

      shareTitle = t("common.youthAppName")
      shareUrl += "/youth"

    } else if (product === ProductType.Practice) {
      shareText = t("articleOptions.share.practiceShareMessage")
      shareTitle = t("common.practiceAppName")
      shareUrl += "/practice"

    } else if (product === ProductType.Words) {
      shareText = t("articleOptions.share.wordsShareMessage")
      shareTitle = t("common.wordsAppName")
      shareUrl += "/words"

    } else {
      shareText = ""
      shareTitle = ""
      shareUrl += "/"
    }

    share(t, shareTitle, shareText, shareUrl)
  }

  return (
    <span onClick={handleShare} className={styles.text_and_icon}>
      {t("profile.dropOptInviteFriends.invite")}
      <Icons.Share />
    </span>
  )
}

export default DropOptInviteFriends
