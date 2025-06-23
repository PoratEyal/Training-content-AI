//
// Chooses between popup login (desktop) and redirect login (mobile)
//
import { GoogleAuthProvider, browserLocalPersistence as rememberMeSession, setPersistence, signInWithPopup, signInWithRedirect, Auth } from "firebase/auth";

export const signInNow = async (authInstance: Auth): Promise<void> => {
    
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
        prompt: "select_account",   // Always show account selection
    });
    const isMobile = /Android|iPhone|iPad|webOS|BlackBerry|Mobile|Tablet/i.test(navigator.userAgent);

    await setPersistence(authInstance, rememberMeSession);

    try {
        if (isMobile) {
            await signInWithRedirect(authInstance, provider);
        } else {
            await signInWithPopup(authInstance, provider);
        }
    } catch (error) {
        // Re-throw to let useSignIn handle it
        throw error;
    }
};
