import React from "react";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import route from "../../router/route.json";
import { useNavigate } from "react-router-dom";
import { EDIT_AD_SLOT } from "../../models/constants/adsSlot";
import RichTextEditor from "../../components/RichTextEditor/RichTextEditor";
import { useContentContext } from "../../context/ContentContext";
import { getContent, getTitle } from "../../utils/helmet";
import { useTranslation } from "react-i18next";

const Edit: React.FC = () => {
    const navigate = useNavigate();
    const { mainActivity } = useContentContext();
    const { i18n } = useTranslation();

    const goBack = () => {
        navigate(-1);
    };

    return (
        <PageLayout
            path={route.edit}
            hasHeader={{ goBack }}
            title={getTitle("edit", i18n.language)}
            content={getContent("edit", i18n.language)}
            hesAds={EDIT_AD_SLOT}
            index={false}
            hasNavBar
        >
            <RichTextEditor activity={mainActivity} />
        </PageLayout>
    );
};

export default Edit;
