import { useRef, useState, useEffect } from "react";
import { useContentContext } from "../../context/ContentContext";
import { useNavigate } from "react-router-dom";
import route from "../../router/route.json";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import { ACTIVITY_AD_SLOT } from "../../models/constants/adsSlot";
import { useTranslation } from "react-i18next";
import ActivityArticle from "../../components/ActivityArticle/ActivityArticle";
import { useAuthContext } from "../../context/AuthContext";
import RichTextEditor from "../../components/RichTextEditor/RichTextEditor";
import { useEditorContext } from "../../context/EditorContext";

function Activity() {
    const { i18n } = useTranslation();
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
            id="activity"
            path={route.activity}
            hasGreenBackground
            hasHeader={{ goBack, hasTitle: mainActivity?.subject || undefined }}
            title={"helmet.activity.title"}
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
