import { useEffect, useState } from "react";
import styles from "./InstallButton.module.css";
import { LuDownload } from "react-icons/lu";
import { MdDownloadForOffline } from "react-icons/md";

const InstallButton = () => {
    const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
    const [showInstallButton, setShowInstallButton] = useState(false);

    useEffect(() => {
        // Listen for the 'beforeinstallprompt' event
        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault(); // Prevent the mini-infobar from appearing
            setDeferredPrompt(e); // Save the event
            setShowInstallButton(true); // Show the install button
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = () => {
        if (deferredPrompt) {
            (deferredPrompt as any).prompt(); // Show the install prompt
            (deferredPrompt as any).userChoice.then((choiceResult: any) => {
                if (choiceResult.outcome === "accepted") {
                    console.log("User accepted the install prompt");
                } else {
                    console.log("User dismissed the install prompt");
                }
                setDeferredPrompt(null); // Reset the deferred prompt
                setShowInstallButton(false); // Hide the install button
            });
        }
    };

    if (!showInstallButton) {
        return null; // Render nothing if the button shouldn't be displayed
    }

    return (
        <div onClick={handleInstallClick} className={styles.installButton}>
            <label>לחצו להתקנה</label>
            <MdDownloadForOffline className={styles.icon}/>
        </div>
    );
};

export default InstallButton;
