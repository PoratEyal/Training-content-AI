//
// This component currently only renders <Outlet />.
// TOS and "What's New" popups are fully commented out but preserved for future use.
//
import React, { useEffect, useRef, useState } from "react"
import { Outlet } from "react-router-dom"
// import TSCs from "../components/TSCs/TSCs"
// import { useCookiesContext } from "../context/CookiesContext"
// import PopupFeedback from "../components/PopupFeedback/PopupFeedback"
// import { useAuthContext } from "../context/AuthContext"
// import { fetchUpdateIsMsg } from "../utils/fetch"

const PrivateRoutes = () => {
  // const { cookieUserConsent, setConsentCookie } = useCookiesContext()
  // const { whatsNewMsg, setIsSendMsg, currentUser } = useAuthContext()

  // 🔸 Terms of Service popup logic – currently disabled
  /*
  const [tscs, setTscs] = useState<boolean>(false)

  useEffect(() => {
    if (cookieUserConsent === undefined) {
      setTscs(true)
    }
  }, [cookieUserConsent])

  const handleAcceptTerms = () => {
    setConsentCookie()
    setTscs(false)
  }
  */

  // 🔸 "What's New" popup logic – currently disabled
  /*
  const [whatsNew, setWhatsNew] = useState<boolean>(false)
  const blockRef = useRef<boolean>(true)

  useEffect(() => {
    if (blockRef.current && currentUser?.isSendMsg && whatsNewMsg !== "") {
      setWhatsNew(true)
      blockRef.current = false
    }
  }, [whatsNewMsg, currentUser?.isSendMsg])

  const handleWhatsNewClose = async () => {
    setWhatsNew(false)
    setIsSendMsg()
    if (currentUser?.id) await fetchUpdateIsMsg(currentUser.id)
  }
  */

  return (
    <React.Fragment>
      {/*
        🔸 Terms of Service component – temporarily hidden
        {tscs && <TSCs handleAccept={handleAcceptTerms} />}
      */}

      {/*
        🔸 "What's New" popup – temporarily hidden
        {whatsNew && (
          <PopupFeedback
            handleClose={handleWhatsNewClose}
            msg={whatsNewMsg}
          />
        )}
      */}

      <Outlet />
    </React.Fragment>
  )
}

export default PrivateRoutes
