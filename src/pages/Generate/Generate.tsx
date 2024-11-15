import { useEffect } from "react";
import styles from "./Generate.module.css";
import AdsLoading from "../../components/ads/AdsLoading/AdsLoading";
import { SessionKey } from "../../models/enum/storage";
import Session from "../../utils/sessionStorage";
import { fetchGetActivity } from "../../utils/fetch";
import { CategoryName } from "../../models/types/movement";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useErrorContext } from "../../context/ErrorContext";
import msg from "../../models/resources/errorMsg.json";
import route from "../../router/route.json";
import { useContentContext } from "../../context/ContentContext";
import { Helmet } from "react-helmet-async";
import { WEBSITE_URL } from "../../models/constants";
import path from "../../router/route.json";

const Generate = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { handleError } = useErrorContext();
    const { updateMainActivity, data } = useContentContext();

    const generateActivity = async () => {
        try {
            const { movement, ...detailsData } = data;
            const category: string | undefined = searchParams.get("c");
            const subject: string | undefined = searchParams.get("s");
            const place: string | undefined = searchParams.get("p");
            const time: string | undefined = searchParams.get("t");
            Session.set(SessionKey.GENERATE, "true");
            const response = await fetchGetActivity({
                category: category as CategoryName,
                ...detailsData,
                subject,
                time,
                place,
            });
            if (
                (response.result === "success" || response.result === "safety") &&
                response.activity
            ) {
                updateMainActivity({ ...response.activity });
                Session.remove(SessionKey.GENERATE);
                navigate(route.activity);
            }
        } catch (error) {
            handleError(msg.error.message);
            Session.remove(SessionKey.GENERATE);
        }
    };

    useEffect(() => {
        const isGenerate: string | undefined = Session.get(SessionKey.GENERATE);
        if (!isGenerate) {
            generateActivity();
        }
    }, []);

    return (
        <>
            <Helmet>
                <title>יצירת פעילות</title>
                <meta name="description" content="יצירת פעילות" />
                <link rel="canonical" href={`${WEBSITE_URL}${path.generate}`} />
                <meta name="robots" content="noindex" />
            </Helmet>
            <section className={styles.loading_activity}>
                <div className={styles.loading_main}>
                    <img className={styles.gif} src="loading.gif" alt="loading gif" />
                    <label className={styles.h2}>הפעולה בדרך</label>
                    <label className={styles.text}>
                        שימו לב! מקור הפעולות הינו מערכת בינה מלאכותית, ייתכן ותמצאו אי דיוקים. אנא
                        בדקו את התוכן לפני כל פעולה
                    </label>
                    <div className={styles.progress_bar}></div>
                </div>

                <AdsLoading />
            </section>
        </>
    );
};

export default Generate;
