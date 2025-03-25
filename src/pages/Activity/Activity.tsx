import { useRef, useState, useEffect } from "react";
import { useContentContext } from "../../context/ContentContext";
import { useNavigate } from "react-router-dom";
import route from "../../router/route.json";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import helmet from "../../models/resources/helmet.json";
import { ACTIVITY_AD_SLOT } from "../../models/constants/adsSlot";
import ActivityArticle from "../../components/ActivityArticle/ActivityArticle";
import { useAuthContext } from "../../context/AuthContext";
import RichTextEditor from "../../components/RichTextEditor/RichTextEditor";
import { useEditorContext } from "../../context/EditorContext";

function Activity() {
    const { data, mainActivity } = useContentContext();
    const { isEdit, readOnlyMode } = useEditorContext();
    const { isLoggedIn } = useAuthContext();
    const [newActivity, setNewActivity] = useState(false);
    const activityRef = useRef<HTMLElement>(null);
    const navigate = useNavigate();

    const goBack = () => {
        if (isEdit) {
            readOnlyMode();
        } else {
            navigate(route.build);
        }
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
        <PageLayout
            path={route.activity}
            hasGreenBackground
            hasHeader={{ goBack, hasTitle: mainActivity?.subject || undefined }}
            title={helmet.activity.title}
            content={helmet.home.content}
            hesAds={ACTIVITY_AD_SLOT}
            hasNavBar
            index={false}
        >
            {isEdit ? (
                <RichTextEditor activity={mainActivity} />
            ) : (
                <ActivityArticle
                    activity={mainActivity}
                    activityRef={activityRef}
                    hasSave={isLoggedIn}
                    hasEdit={isLoggedIn}
                    hasCopy
                    hasShare
                />
            )}
        </PageLayout>
    );
}

export default Activity;
