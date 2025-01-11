import { useEffect, useRef, useState } from "react";
import { useContentContext } from "../../context/ContentContext";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { isGroupDetailsChanged, updateUserMovement } from "../../utils/user";
import { fetchGetActivity, fetchUpdateUser } from "../../utils/fetch";
import { Activity } from "../../models/types/activity";
import { SessionKey } from "../../models/enum/storage";
import Session from "../../utils/sessionStorage";
import route from "../../router/route.json";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import styles from "./BuildActivity.module.css";
import MainBtn from "../../components/MainBtn/MainBtn";
import PageLoading from "../../components/Loading/PageLoading/PageLoading";
import CreateYourActivity from "../../components/titles/CreateYourActivity/CreateYourActivity";
import SelectDetails from "../../components/SelectDetails/SelectDetails";
import { ActivityTimeOptions, CategoryOptions, PlaceOptions } from "../../models/resources/select";
import SubjectInput from "../../components/SubjectInput/SubjectInput";
import { CategoryName } from "../../models/types/movement";
import helmet from "../../models/resources/helmet.json";
import { useErrorContext } from "../../context/ErrorContext";
import msg from "../../models/resources/errorMsg.json";
import LoadingActivity from "../../components/Loading/LoadingActivity/LoadingActivity";
import { BUILD_AD_SLOT } from "../../models/constants/adsSlot";
import MoreOptionBtn from "../../components/MoreOptionBtn/MoreOptionBtn";

function BuildActivity() {
    const { handleError } = useErrorContext();
    const { data, clearMainActivity, updateMainActivity } = useContentContext();
    const { isLoggedIn, currentUser, loading } = useAuthContext();

    const [category, setCategory] = useState(data.movement.categories[0].name as string);
    const [subject, setSubject] = useState("");
    const [place, setPlace] = useState("");
    const [time, setTime] = useState("");

    const [clicked, setClicked] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const navigate = useNavigate();
    const lockRef = useRef(true);

    const [hasAlert, setHasAlert] = useState(false);

    useEffect(() => {
        const updateUser = async () => {
            lockRef.current = false;
            if (isLoggedIn && currentUser) {
                if (isGroupDetailsChanged(currentUser.movement, data)) {
                    const { movement, grade, gender, amount } = data;
                    const { name } = movement;
                    const user = updateUserMovement(currentUser, name, grade, gender, amount);
                    await fetchUpdateUser({ user });
                }
            }
        };

        const setStateFromSession = () => {
            try {
                if (!subject || subject === "") {
                    const sessionActivity: Activity | undefined = Session.get(SessionKey.ACTIVITY);
                    if (sessionActivity) {
                        setCategory(sessionActivity.category);
                        setSubject(sessionActivity.subject);
                        setPlace(sessionActivity.place);
                        setTime(sessionActivity.time);
                    }
                }
            } catch (error) {}
        };

        if (lockRef.current) {
            updateUser();
            setStateFromSession();
        }
    }, []);

    useEffect(() => {
        //set disabled button
        if (loading) setIsDisabled(true);
        setIsDisabled(subject === "" || place === "" || time === "" ? true : false);
    }, [loading, subject, place, time]);

    const submitHandler = async () => {
        setClicked(true);
        const { movement, ...detailsData } = data;
        try {
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
                navigate(route.activity);
            }
        } catch (error) {
            handleError(msg.error.message);
            setClicked(false);
        }
    };

    const goBack = () => {
        clearMainActivity();
        navigate(route.details);
    };

    return (
        <PageLayout
            path={route.build}
            hasGreenBackground
            hasHeader={{ goBack }}
            title={helmet.build.title}
            content={helmet.home.content}
            hesAds={BUILD_AD_SLOT}
            hasNavBar
            index={false}
        >
            <CreateYourActivity />

            <div className={styles.build_form_container}>
                <img
                    className={styles.path_img}
                    title="Yellow sign with heart"
                    alt="Yellow sign with heart"
                    src={"path.svg"}
                    width={100}
                    height={125}
                ></img>
                {loading ? (
                    <section className={styles.loading_mock_selection_container}>
                        <PageLoading />
                    </section>
                ) : (
                    <div className={styles.build_content}>
                        <section className={styles.build_container}>
                            <SelectDetails
                                placeholder="סוג הפעולה"
                                obj={category}
                                setObj={setCategory}
                                data={CategoryOptions(data.movement.categories)}
                            />

                            <SubjectInput
                                placeholder="נושא"
                                setSubject={setSubject}
                                subject={subject}
                                category={category as CategoryName}
                                setHasAlert={setHasAlert}
                            />

                            <SelectDetails
                                placeholder="מיקום"
                                obj={place}
                                setObj={setPlace}
                                data={PlaceOptions}
                            />

                            <SelectDetails
                                placeholder="זמן"
                                obj={time}
                                setObj={setTime}
                                data={ActivityTimeOptions}
                            />

                            {/* <MoreOptionBtn/> */}

                        </section>
                        <div className={styles.btn_div}>
                            <MainBtn
                                isDisabled={isDisabled}
                                height={42}
                                text={"הצעה לפעולה"}
                                func={submitHandler}
                            ></MainBtn>
                            {hasAlert ? (
                                <div className={styles.input_alert}>
                                    שימו לב! מקור הפעולות הינו מערכת בינה מלאכותית, יכול להיות
                                    וחיפושים מסויימים עדיין לא התעדכנו במערכת
                                </div>
                            ) : null}
                        </div>
                    </div>
                )}
                {clicked ? <LoadingActivity /> : null}
            </div>
        </PageLayout>
    );
}

export default BuildActivity;
