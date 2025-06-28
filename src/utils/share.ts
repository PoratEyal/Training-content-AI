import { TFunction } from "i18next"
import { useNotificationContext } from "../context/NotificationContext"

export const useShareTextOrLink = () => {
  const { notifySuccess: handleSuccess, notifyAlert: notifyAlert } = useNotificationContext()

  return (t: TFunction, title: string, text: string, url?: string) => {
    if (navigator.share) {
      navigator.share({ title, text, url })
        .catch((err) => {
          if (err.name !== "AbortError" && err.name !== "NotAllowedError") {
            notifyAlert(t("share.shareError"))
          }
        })
    } else {
      const fullText = url ? `${text}\n\n${url}` : text
      navigator.clipboard
        .writeText(fullText)
        .then(() => {
          handleSuccess(t("share.shared2Clipboard"))
        })
        .catch(() => {
          notifyAlert(t("share.shareError"))
        })
    }
  }
}
