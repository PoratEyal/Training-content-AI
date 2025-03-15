import React from "react";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import helmet from "../../models/resources/helmet.json";
import route from "../../router/route.json";
import { useNavigate } from "react-router-dom";
import { EDIT_AD_SLOT } from "../../models/constants/adsSlot";
import RichTextEditor from "../../components/RichTextEditor/RichTextEditor";
import { useContentContext } from "../../context/ContentContext";

const Edit: React.FC = () => {
    const navigate = useNavigate();
    const { mainActivity } = useContentContext();

    const goBack = () => {
        navigate(-1);
    };

    return (
        <PageLayout
            path={route.edit}
            hasHeader={{ goBack }}
            title={helmet.edit.title}
            content={helmet.edit.content}
            hesAds={EDIT_AD_SLOT}
            index={false}
            hasNavBar
        >
            <RichTextEditor activity={mainActivity} />
        </PageLayout>
    );
};

export default Edit;
