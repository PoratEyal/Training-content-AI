import { useRef, useState, useEffect } from "react";
import { useContentContext } from "../../context/ContentContext";
import { useNavigate } from "react-router-dom";
import route from "../../router/route.json";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import helmet from "../../models/resources/helmet.json";
import { ACTIVITY_AD_SLOT } from "../../models/constants/adsSlot";
import ActivityArticle from "../../components/ActivityArticle/ActivityArticle";

function Activity() {
    const { data, mainActivity } = useContentContext();
    const [newActivity, setNewActivity] = useState(false);
    const activityRef = useRef<HTMLElement>(null);
    const navigate = useNavigate();

    const goBack = () => {
        navigate(route.build);
    };

    useEffect(() => {
        if (!data || !data.grade || !data.movement || !mainActivity) {
            goBack();
        }
    }, [data, mainActivity]);

    useEffect(() => {
        if (newActivity && activityRef.current) {
            activityRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
            setNewActivity(false);
        }
    }, [newActivity]);

    return (
        <>
            <PageLayout
                path={route.activity}
                hasGreenBackground
                hasHeader={{ goBack }}
                title={helmet.activity.title}
                content={helmet.home.content}
                hesAds={ACTIVITY_AD_SLOT}
                hasNavBar
                allowEdit
                index={false}
            >
                <ActivityArticle
                    activityRef={activityRef}
                    activity={mainActivity}
                    hasCopy
                    hasEdit
                    hasSave
                    hasShare
                />
            </PageLayout>
        </>
    );
}

export default Activity;
