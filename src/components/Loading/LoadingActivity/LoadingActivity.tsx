import { useEffect, useState, useCallback } from "react";
import styles from "./LoadingActivity.module.css";
import { useLanguage } from "../../../i18n/useLanguage";

type Rect = { top: number; left: number; width: number; height: number } | null;

function LoadingActivity() {
    const { t } = useLanguage();
    const [rect, setRect] = useState<Rect>(null);

    // Find the app container and measure it
    // important!!! It relies on class names so if any problem with the loading object, check class names.
    const measure = () => {
        const container = document.querySelector<HTMLElement>('[class*="pageContainer"]');
        if (!container) { setRect(null); return; }

        const c = container.getBoundingClientRect();

        // start at the form container (CSS Modules-safe)
        const formEl = container.querySelector<HTMLElement>('[class*="form_container"]');
        const top = Math.max((formEl?.getBoundingClientRect().top ?? c.top), c.top);

        // stop before ads or bottom nav (whichever comes first)
        const ads = document.querySelector<HTMLElement>('.ads-small-slot');
        const bottomNav = document.querySelector<HTMLElement>('nav[class^="NavigationBar_"], nav[class*="NavigationBar_"]');

        const candidates = [c.bottom];
        if (ads) candidates.push(ads.getBoundingClientRect().top);
        if (bottomNav) candidates.push(bottomNav.getBoundingClientRect().top);

        const bottomLimit = Math.min(...candidates);

        // final rect (ceil/round to avoid 1px רווחים)
        const height = Math.max(0, Math.ceil(bottomLimit) - Math.ceil(top));
        setRect({
            top: Math.ceil(top),
            left: Math.ceil(c.left),
            width: Math.ceil(c.width),
            height,
        });
    };



    useEffect(() => {
        measure();
        const onScroll = () => measure();
        const onResize = () => measure();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onResize);
        const id = window.setInterval(measure, 300); // handle layout shifts
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onResize);
            window.clearInterval(id);
        };
    }, [measure]);

    let heading = t("common.loadingHead");
    let text = t("common.loadingText");

    return (
        <section
            className={styles.loadingOverlay}
            style={
                rect
                    ? {
                        // cover only the app container
                        position: "fixed",
                        top: rect.top,
                        left: rect.left,
                        width: rect.width,
                        height: rect.height,
                    }
                    : undefined // fallback: full screen per existing CSS
            }
            aria-busy="true"
            role="alert"
        >
            <div className={styles.loadingContentWrapper}>
                <img className={styles.loadingImage} src="/Common/loading.gif" alt="loading" />
                <label className={styles.loadingTitle}>{heading}</label>
                <label className={styles.loadingSubtitle}>{text}</label>
                <div className={styles.progress_bar}></div>
            </div>
        </section>
    );
}

export default LoadingActivity;
