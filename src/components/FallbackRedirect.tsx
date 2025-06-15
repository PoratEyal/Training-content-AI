// This component handles fallback redirection when the user navigates to an unknown route.
// If the route is not prefixed with a supported language or a known static path like /practice,
// it redirects to the default homepage.

import { Navigate, useLocation } from "react-router-dom"
import { supportedLangs } from "../i18n/languages"

function FallbackRedirect() {
  const { pathname } = useLocation()

  // Check if the current path starts with one of the supported language prefixes
  const hasLanguagePrefix = supportedLangs.some(
    (lang) => pathname === `/${lang}` || pathname.startsWith(`/${lang}/`)
  )

  // Allow static paths like /practice and root path /
  const isStaticPath = pathname.startsWith("/practice") || pathname === "/"

  // If path is already valid, don't redirect
  if (hasLanguagePrefix || isStaticPath) {
    return null
  }

  // Redirect to default language if no valid prefix found
  return <Navigate replace to="/he" />
}

export default FallbackRedirect
