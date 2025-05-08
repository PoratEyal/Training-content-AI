import { useEffect, useState } from "react";
import { useContentContext } from "../../context/ContentContext";
import { useNavigate } from "react-router-dom";
import styles from "./Details.module.css";
import {
    MovmentsOptions,
    GradeOptions,
    AmountOptions,
    GenderOptions,
} from "../../models/resources/he/select";
import SelectDetails from "../../components/SelectDetails/SelectDetails";
import MainBtn from "../../components/MainBtn/MainBtn";
import { useAuthContext } from "../../context/AuthContext";
import route from "../../router/route.json";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import PageLoading from "../../components/Loading/PageLoading/PageLoading";
import TellUsAboutYourGroup from "../../components/titles/TellUsAboutYourGroup/TellUsAboutYourGroup";
import { DETAILS_AD_SLOT } from "../../models/constants/adsSlot";
import { useLanguage } from "../../i18n/useLanguage";

function Details() {
    const { t, isHebrew, dir } = useLanguage();
    const { data, updateDetails, clearAll } = useContentContext();
    const { currentUser, loading } = useAuthContext();
    const navigate = useNavigate();

    const [movement, setMovment] = useState(
        data ? data?.movement?.name : currentUser?.movement ? currentUser?.movement?.movement : "",
    );

    const [classLevel, setClassLevel] = useState(
        data ? data?.grade : currentUser?.movement ? currentUser?.movement?.grade : "",
    );

    const [numberOfChildren, setNumberOfChildren] = useState(
        data ? data?.amount : currentUser?.movement ? currentUser?.movement?.amount : "",
    );

    const [gender, setGender] = useState(
        data ? data?.gender : currentUser?.movement ? currentUser?.movement?.gender : "",
    );

    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
        if (loading) setIsDisabled(true);
        else {
            if (movement && classLevel && numberOfChildren && gender) {
                setIsDisabled(false);
            }
        }
    }, [movement, classLevel, numberOfChildren, gender, loading]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        updateDetails(movement, classLevel, numberOfChildren, gender);
        navigate(route.build);
    };

    const goBack = () => {
        clearAll();
        navigate(route.home);
    };

    return (
        <PageLayout
            id="details"
            path={route.details}
            hasGreenBackground
            hasHeader={{ goBack }}
            hesAds={DETAILS_AD_SLOT}
            hasNavBar
            index={false}
        >
            <TellUsAboutYourGroup />

            <form
                onSubmit={handleSubmit}
                className={styles.details_form_container}
                style={{ direction: dir }}
            >
                <img
                    className={`${styles.lamp_img} ${isHebrew ? styles.lamp_img_rtl : styles.lamp_img_ltr}`}
                    title={t("details.lampAlt")}
                    alt={t("details.lampAlt")}
                    src={"lamp.svg"}
                    loading="lazy"
                    width={105}
                    height={109}
                />

                <div className={styles.selects_btn}>
                    {loading ? (
                        <div className={styles.loading_mock_selection_container}>
                            <PageLoading />
                        </div>
                    ) : (
                        <div className={styles.details_content}>
                            <SelectDetails
                                data={MovmentsOptions}
                                placeholder={t("details.youthMovement")}
                                obj={movement}
                                setObj={setMovment}
                            />
                            <SelectDetails
                                data={GradeOptions}
                                placeholder={t("details.grade")}
                                obj={classLevel}
                                setObj={setClassLevel}
                            />
                            <SelectDetails
                                data={AmountOptions}
                                placeholder={t("details.numberOfChildren")}
                                obj={numberOfChildren}
                                setObj={setNumberOfChildren}
                            />
                            <SelectDetails
                                data={GenderOptions}
                                placeholder={t("details.gender")}
                                obj={gender}
                                setObj={setGender}
                            />
                        </div>
                    )}
                    <div className={isHebrew ? styles.hebrewDir : styles.nonHebrewDir}>
                        <MainBtn
                            text={t("details.submit")}
                            isDisabled={isDisabled}
                            type="submit"
                            func={handleSubmit}
                            height={42}
                        />
                    </div>
                </div>
            </form>
        </PageLayout>
    );
}

export default Details;
