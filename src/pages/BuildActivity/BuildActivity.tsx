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
import {
    ActivityTimeOptions,
    CategoryOptions,
    ContestOptions,
    PlaceOptions,
    ToolsOptions,
    ReligionOptions,
} from "../../models/resources/select";
import SubjectInput from "../../components/SubjectInput/SubjectInput";
import { CategoryName } from "../../models/types/movement";
import helmet from "../../models/resources/helmet.json";
import { useErrorContext } from "../../context/ErrorContext";
import msg from "../../models/resources/errorMsg.json";
import LoadingActivity from "../../components/Loading/LoadingActivity/LoadingActivity";
import { BUILD_AD_SLOT } from "../../models/constants/adsSlot";
import MoreDetailsInput from "../../components/MoreDetailsInput/MoreDetailsInput";
import MoreOptionsCollapse from "../../components/MoreOptionsCollapse/MoreOptionsCollapse";

function BuildActivity() {
    const { handleError } = useErrorContext();
    const { data, clearMainActivity, updateMainActivity } = useContentContext();
    const { isLoggedIn, currentUser, loading } = useAuthContext();

    const [category, setCategory] = useState(data.movement.categories[0].name as string);
    const [subject, setSubject] = useState<string>("");
    const [place, setPlace] = useState<string>("");
    const [time, setTime] = useState<string>("");
    const [religion, setReligion] = useState<string>("");
    const [contest, setContest] = useState<string>("");
    const [tools, setTools] = useState<string>("");
    const [info, setInfo] = useState<string>("");

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

                        if (sessionActivity.religion) setReligion(sessionActivity.religion);
                        if (sessionActivity.contest) setContest(sessionActivity.contest);
                        if (sessionActivity.tools) setTools(sessionActivity.tools);
                        if (sessionActivity.info) setInfo(sessionActivity.info);
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
                religion,
                contest,
                tools,
                info,
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
            index={false}
            hasNavBar
        >
            <CreateYourActivity />

            <div className={styles.build_form_container}>
                <img
                    className={styles.path_img}
                    title="Yellow sign with heart"
                    alt="Yellow sign with heart"
                    src={"path.svg"}
                    width={95}
                    height={120}
                ></img>

                <div className={styles.selects_btn}>
                    {loading ? (
                        <section className={styles.loading_mock_selection_container}>
                            <PageLoading />
                        </section>
                    ) : (
                        <section className={styles.build_container}>
                            <section className={styles.build_content}>
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

                                <MoreOptionsCollapse>
                                    <SelectDetails
                                        placeholder="ציוד"
                                        obj={tools}
                                        setObj={setTools}
                                        data={ToolsOptions}
                                    />

                                    <SelectDetails
                                        placeholder="תחרות וקבוצות"
                                        obj={contest}
                                        setObj={setContest}
                                        data={ContestOptions}
                                    />

                                    <SelectDetails
                                        placeholder="שבת"
                                        obj={religion}
                                        setObj={setReligion}
                                        data={ReligionOptions}
                                    />

                                    <MoreDetailsInput
                                        placeholder="מידע נוסף"
                                        text={info}
                                        setText={setInfo}
                                    />
                                </MoreOptionsCollapse>

                                <div className={styles.btn_div}>
                                    <MainBtn
                                        isDisabled={isDisabled}
                                        height={42}
                                        text={"הצעה לפעולה"}
                                        func={submitHandler}
                                    ></MainBtn>
                                    {hasAlert ? (
                                        <div className={styles.input_alert}>
                                            שימו לב! מקור הפעולות הינו מערכת בינה מלאכותית, יכול
                                            להיות שנושאים מסויימים עדיין לא מעודכנים
                                        </div>
                                    ) : null}
                                </div>
                            </section>
                        </section>
                    )}
                </div>
                {clicked ? <LoadingActivity /> : null}
            </div>
        </PageLayout>
    );
}

export default BuildActivity;
