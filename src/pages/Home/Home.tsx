import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import route from "../../router/route.json";
import useSignIn from "../../hooks/useSignIn";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import { NEED_TO_LOGIN } from "../../models/constants/cookie";
import ContinueWithAI from "../../components/titles/ContinueWithAI/ContinueWithAI";
import { isMoreThanADayAfter, isValidDateFormat } from "../../utils/time";
import Session from "../../utils/sessionStorage";
import { SessionKey } from "../../models/enum/storage";
import StartBtn from "../../components/StartBtn/StartBtn";
import SmallLoading from "../../components/Loading/SmallLoading/SmallLoading";
import helmet from "../../models/resources/helmet.json";
import ReviewPopup from "../../components/ReviewPopup/ReviewPopup";
import { useCookiesContext } from "../../context/CookiesContext";
import { SignInStatus } from "../../models/enum/registrationStatus";
import { HOME_AD_SLOT } from "../../models/constants/adsSlot";
import AboutUsCollapse from "../../components/AboutUsCollapse/AboutUsCollapse";
import { useStaticContentContext } from "../../context/StaticContentContext";
import { useSaveContext } from "../../context/SavedContext";
import styles from "./Home.module.css";
import InstallButton from "../../components/InstallButton/InstallButton";

const images = [
    "/backgroundImages/image1.jpg",
    "/backgroundImages/image2.jpg",
    "/backgroundImages/image3.jpg",
    "/backgroundImages/image4.jpg",
    "/backgroundImages/image5.jpg",
    "/backgroundImages/image6.jpg",
  ];
  

function Home() {
    const {
        cookieVisitCount,
        setVisitCount,
        cookiePopupReview,
        cookieLimit,
        setLimitCookie,
        cookieRememberMe,
    } = useCookiesContext();

    const navigate = useNavigate();
    const { currentUser, isLoggedIn, isPopupVisible, handlePopupClose, setIsPopupVisible } =
        useAuthContext();

    const { useFetchSubjectsData } = useStaticContentContext();
    const { useFetchSavedData } = useSaveContext();
    useFetchSubjectsData();
    useFetchSavedData();

    const [rememberMe, setRememberMe] = useState<SignInStatus>(SignInStatus.NEW_ACCESS);

    const { signInWithGoogle, isLoading, btnDisabled } = useSignIn(handleStart);

    function handleStart() {
        const navigateTo = Session.get(SessionKey.NAVIGATE);
        Session.remove(SessionKey.NAVIGATE);
        if (navigateTo) navigate(navigateTo);
    }

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * images.length);
        const randomImage = images[randomIndex];
      
        document.body.style.background = `url('${randomImage}') no-repeat center center fixed`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundAttachment = "fixed";
      }, []);  

    useEffect(() => {
        if (rememberMe === SignInStatus.NEW_ACCESS) {
            setRememberMe(cookieRememberMe ? SignInStatus.REMEMBER : SignInStatus.NOT_REMEMBER);
        }
    }, [isLoggedIn, currentUser]);

    // Run once to increment visit count and possibly show popup
    useEffect(() => {
        let visitCount = parseInt(cookieVisitCount || "0", 10);
        if (isNaN(visitCount)) {
            visitCount = 0;
        }
        visitCount += 1;
        setVisitCount(visitCount);

        if (!cookiePopupReview && visitCount >= 3) {
            const timer = setTimeout(() => {
                setIsPopupVisible(true);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, []);

    const navigateAndSetCookieDate = (navigateTo: string) => {
        setLimitCookie(new Date().toString());
        navigate(navigateTo);
    };

    const guestSignInOrNavigate = (limitDate: string, navigateTo: string) => {
        const isValidDate = isValidDateFormat(limitDate);
        if (isValidDate) {
            const isMoreThanDay = isMoreThanADayAfter(limitDate);
            if (isMoreThanDay) {
                signInWithGoogle();
            } else {
                navigateAndSetCookieDate(navigateTo);
            }
        }
    };

    const startAsGuestOrUser = (navigateTo: string) => {
        if (currentUser && isLoggedIn) {
            navigate(navigateTo);
            return;
        }

        Session.set(SessionKey.NAVIGATE, navigateTo);
        if (cookieLimit) {
            if (cookieLimit === NEED_TO_LOGIN) {
                signInWithGoogle();
            } else {
                guestSignInOrNavigate(cookieLimit, navigateTo);
            }
        } else {
            navigateAndSetCookieDate(navigateTo);
        }
    };

    return (
        <PageLayout
            path={route.home}
            title={helmet.home.title}
            content={helmet.home.content}
            hasHeader={{}} /** -> show only the profile image **/
            hesAds={HOME_AD_SLOT}
            hasNavBar
            index={true}
        >
            <div className={styles.logo_text_div}>
                <ContinueWithAI />
                <h2 className={styles.home_lable}>מותאם, פשוט ומהיר 🤟</h2>
            </div>

            {rememberMe === SignInStatus.REMEMBER && !isLoading && isLoggedIn && currentUser?.image ? (
                <section className={styles.button_section}>
                    <StartBtn
                        text="יצירת פעולות"
                        onClick={() => startAsGuestOrUser(route.details)}
                        isDisabled={btnDisabled}
                    />
                </section>
            ) : rememberMe === SignInStatus.NOT_REMEMBER && !isLoading ? (
                <section className={styles.button_section}>
                    <StartBtn
                        text="יצירת פעולות"
                        onClick={() => startAsGuestOrUser(route.details)}
                        isDisabled={btnDisabled}
                    />
                </section>
            ) : (
                <div className={styles.button_section_loading}>
                    <SmallLoading />
                </div>
            )}

            {/* <div className={styles.install_button_div}>
                <InstallButton />
            </div> */}

            <div className={styles.about_div}>
                <AboutUsCollapse>
                    <p>
                        ActivityWiz הוא אתר ליצירת פעולות לנוער. תוכלו לבחור מתוך מאגר של פעולות
                        מוכנות מראש או להשתמש בבינה מלאכותית ליצירת פעולות מותאמות אישית, המתאימות
                        בדיוק לצרכים שלכם. האתר מיועד למדריכים המחפשים רעיונות ודרכים חדשות להעשרת
                        החוויה החינוכית והחברתית.
                    </p>
                </AboutUsCollapse>
            </div>

            {isPopupVisible && <ReviewPopup onClose={handlePopupClose} />}
        </PageLayout>
    );
}

export default Home;
