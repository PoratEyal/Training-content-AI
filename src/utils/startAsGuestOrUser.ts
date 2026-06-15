import { GUEST_BLOCK_MustLogin } from "../models/constants/cookie"
import { a24hoursPeriodPassed, isValidDateFormat } from "../utils/time"

export function startAsGuestOrUser({
    currentUser,
    isLoggedIn,
    cookieLimit,
    setLimitCookie,
    signInWithGoogle,
    navigateTo,
    navigate
}: {
    currentUser: any
    isLoggedIn: boolean
    cookieLimit: string | undefined
    setLimitCookie: (val: string) => void
    signInWithGoogle: () => void
    navigateTo: string
    navigate: (to: string) => void
}) {

    if (currentUser && isLoggedIn) {
        navigate(navigateTo)
        return
    }

    if (cookieLimit) {
        if (cookieLimit === GUEST_BLOCK_MustLogin) {
            signInWithGoogle()
        } else {
            const isValidDate = isValidDateFormat(cookieLimit)
            if (isValidDate && a24hoursPeriodPassed(cookieLimit)) {
                signInWithGoogle()
            } else {
                if (!cookieLimit) {
                    setLimitCookie(new Date().toString())
                }
                navigate(navigateTo)
            }
        }
    } else {
        setLimitCookie(new Date().toString())
        navigate(navigateTo)
    }
}
