import { WEBSITE_URL } from "../models/constants"
import i18n from "i18next"

export const formatWhatsUp = (text: string | undefined) => {
    if (!text) {
        return i18n.t("articleOptions.share.defaultMessage",
            "I found a website that builds activities using AI, worth trying!")
    }
    const title = i18n.t("articleOptions.share.createdBy",
        "Activity created by:")
    const br = "\n"
    const result = text.replace(/\*+/g, "*") + br + br + title
    return result
}

export const formatCopy = (text: string) => {
    const title = i18n.t("articleOptions.share.createdBy",
        "Activity created by:")
    const br = "\n"
    const result = text.replace(/\*+/g, "") + br + br + title + br + WEBSITE_URL
    return result
}

export const convertContentToHTML = (text: string) => {
    const lines = text.split("\n")
    let html = []
    let currentList = []
    let isInList = false

    lines.forEach((line) => {
        line = line.trim()

        if (!line) {
            if (isInList) {
                html.push("<ul>\n" + currentList.join("\n") + "\n</ul>")
                currentList = []
                isInList = false
            }
            return
        }

        line = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")

        if (line.startsWith("*")) {
            isInList = true
            currentList.push(`    <li>${line.substring(1).trim()}</li>`)
        } else {
            if (isInList) {
                html.push("<ul>\n" + currentList.join("\n") + "\n</ul>")
                currentList = []
                isInList = false
            }
            html.push(`<p>${line}</p>`)
        }
    })

    if (currentList.length > 0) {
        html.push("<ul>\n" + currentList.join("\n") + "\n</ul>")
    }

    const dir = i18n.language === "he" ? "rtl" : "ltr"
    return `<div dir="${dir}">\n${html.join("\n")}\n</div>`
}

export const convertHTMLToContent = (html: string) => {
    html = html.replace(/<br\s*\/?>/gi, "\n")

    html = html.replace(/<ol>\s*([\s\S]*?)\s*<\/ol>/g, (match, listContent) => {
        const items = listContent.match(/<li>([\s\S]*?)<\/li>/g) || []
        return "\n" + items
            .map((item, index) => `${index + 1}. ` + item.replace(/<li>([\s\S]*?)<\/li>/, "$1").trim() + "\n")
            .join("") + "\n"
    })

    html = html.replace(/<ul>\s*([\s\S]*?)\s*<\/ul>/g, (match, listContent) => {
        const items = listContent.match(/<li>([\s\S]*?)<\/li>/g) || []
        return "\n" + items
            .map(item => "* " + item.replace(/<li>([\s\S]*?)<\/li>/, "$1").trim() + "\n")
            .join("") + "\n"
    })

    html = html.replace(/<p>([\s\S]*?)<\/p>/g, "$1\n\n")
    html = html.replace(/<strong>([\s\S]*?)<\/strong>/g, "**$1**")
    html = html.replace(/<div[^>]*>\s*([\s\S]*?)\s*<\/div>/, "$1\n")

    html = html
        .replace(/\n{3,}/g, "\n\n")
        .replace(/^\s+|\s+$/g, "")
        .replace(/ +$/gm, "")
        .replace(/([^\n])$/, "$1\n")

    return html
}

export const compareNormalizedStrings = (text1: string, text2: string): boolean => {
    const normalizeString = (str: string): string => {
        return str
            .trim()
            .replace(/[?!.,/#!$%^&*;:{}=\-_`~()]/g, "")
            .replace(/\s+/g, "")
    }

    const normalized1 = normalizeString(text1)
    const normalized2 = normalizeString(text2)

    return normalized1 === normalized2
}
