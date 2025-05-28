import React, { useEffect, useRef, useState } from "react"
import { Outlet } from "react-router-dom"
import TSCs from "../components/TSCs/TSCs"
import { useCookiesContext } from "../context/CookiesContext"
import ReviewPopup from "../components/ReviewPopup/ReviewPopup"
import { useAuthContext } from "../context/AuthContext"
import { fetchUpdateIsMsg } from "../utils/fetch"

const PrivateRoutes = () => {
    const { cookieUserConsent, setConsentCookie } = useCookiesContext()
    const { whatsNewMsg, setIsSendMsg, currentUser } = useAuthContext()
    const [tscs, setTscs] = useState<boolean>(false)
    const [whatsNew, setWhatsNew] = useState<boolean>(false)

    useEffect(() => {
        if (cookieUserConsent === undefined) {
            setTscs(true)
        }
    }, [cookieUserConsent])

    const blockRef = useRef<boolean>(true)
    useEffect(() => {
        if (blockRef.current && currentUser?.isSendMsg && whatsNewMsg !== "") {
            setWhatsNew(true)
            blockRef.current = false
        }
    }, [whatsNewMsg, currentUser?.isSendMsg])

    const handleAcceptTerms = () => {
        setConsentCookie()
        setTscs(false)
    }

    const handleWhatsNewClose = async () => {
        setWhatsNew(false)
        setIsSendMsg()
        if (currentUser?.id) await fetchUpdateIsMsg(currentUser.id)
    }

    return (
        <React.Fragment>
            {tscs && <TSCs handleAccept={handleAcceptTerms} />}
            {whatsNew && <ReviewPopup handleClose={handleWhatsNewClose} msg={whatsNewMsg} />}
            <Outlet />
        </React.Fragment>
    )
}

export default PrivateRoutes
