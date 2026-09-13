import React from "react"
import styles from "./ArtOptShare.module.css"
import { Activity } from "../../../../models/types/activity"
import { WEBSITE_URL } from "../../../../models/constants"
import { formatWhatsUp } from "../../../../utils/format"
import { useLanguage } from "../../../../i18n/useLanguage"
import { useShareTextOrLink } from "../../../../utils/share"
import { Icons } from "../../../Icons"
import { ProductType } from "../../../../context/ProductType";
import { useProduct } from "../../../../context/ProductContext"

type ArtOptShareProps = { activity: Activity }

const ArtOptShare: React.FC<ArtOptShareProps> = ({ activity }) => {
  const { t, dir, lang } = useLanguage()
  const share = useShareTextOrLink()
  const product = useProduct()

  const handleShare = () => {
    const text = formatWhatsUp(activity?.activity)
    if (product === ProductType.Youth) {
      share(t, t("common.youthAppName"), text, `${WEBSITE_URL}/youth`)
    } else if (product === ProductType.Event) {
      share(t, t("common.youthAppName"), text, `${WEBSITE_URL}/event`)
    } else {
      share(t, t("common.youthAppName"), text, `${WEBSITE_URL}`)
    }
  }

  return (
    <button
      className={`${styles.shareBtn} ${styles[dir]}`}
      onClick={handleShare}
      type="button"
    >
      <Icons.Share className={styles.icon} />
      <span className={styles.text}>{t("articleOptions.share.title")}</span>
    </button>
  )
}

export default ArtOptShare
