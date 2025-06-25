import { TFunction } from "i18next"
import { useErrorContext } from "../context/ErrorContext"

export const useShareTextOrLink = () => {
  const { handleSuccess, handleError } = useErrorContext()

  return (t: TFunction, title: string, text: string, url?: string) => {
    if (navigator.share) {
      navigator.share({ title, text, url })
        .catch((err) => {
          if (err.name !== "AbortError" && err.name !== "NotAllowedError") {
            handleError(t("share.shareError"))
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
          handleError(t("share.shareError"))
        })
    }
  }
}
