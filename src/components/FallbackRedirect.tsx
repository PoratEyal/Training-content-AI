// This component handles fallback redirection when the user navigates to an unknown route.
// If the route is not prefixed with a supported language or a known static path like /practice,
// it redirects to the default homepage and prevents indexing.

import { useLocation } from "react-router-dom"
import { supportedLangs } from "../i18n/languages"
import { Helmet } from "react-helmet-async"
import { useEffect, useState } from "react"

function FallbackRedirect() {
  const { pathname } = useLocation()
  const [redirectTo, setRedirectTo] = useState<string | null>(null)

  useEffect(() => {
    for (const lang of supportedLangs) {
      const youthPrefix = `/${lang}/youth`
      if (pathname.startsWith(`${youthPrefix}/`)) {
        setRedirectTo(youthPrefix)
        return
      }
    }

    const hasValidPrefix = supportedLangs.some((lang) => {
      return (
        pathname === `/${lang}` ||
        pathname === `/${lang}/youth` ||
        pathname === `/${lang}/practice` ||
        pathname.startsWith(`/${lang}/youth/`) ||
        pathname.startsWith(`/${lang}/practice/`)
      )
    })

    if (hasValidPrefix) return

    const isStaticPath =
      pathname === "/" ||
      pathname.startsWith("/practice") ||
      pathname.startsWith("/youth")

    if (isStaticPath) return

    setRedirectTo("/")
  }, [pathname])

  useEffect(() => {
    if (redirectTo) {
      setTimeout(() => {
        window.location.replace(redirectTo)
      }, 100)
    }
  }, [redirectTo])

  if (!redirectTo) return null

  return (
    <Helmet>
      <title>Page Not Found – ActivityWiz</title>
      <meta name="description" content="This page does not exist. You were redirected to the homepage." />
      <meta name="robots" content="noindex" />
    </Helmet>
  )
}

export default FallbackRedirect
