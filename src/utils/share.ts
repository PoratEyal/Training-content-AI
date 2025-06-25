import { TFunction } from "i18next"
import { useErrorContext } from "../context/ErrorContext"

export const useShareTextOrLink = () => {
  const { handleSuccess, handleError } = useErrorContext()

  return (t: TFunction, title: string, text: string, url?: string) => {
    const fullText = url ? `${text}\n\n${url}` : text

    if (navigator.share) {
console.log("title: ",title, "text: ", fullText, "url: ", url)
      navigator.share({ title, text: fullText, url })
        .catch((err) => {
          if (err.name !== "AbortError" && err.name !== "NotAllowedError") {
            handleError(t("share.shareError"))
          }
        })
    } else {
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
