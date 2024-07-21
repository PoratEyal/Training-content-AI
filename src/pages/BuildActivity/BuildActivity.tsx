import { useEffect, useRef, useState } from "react";
import { useErrorContext } from "../../context/ErrorContext";
import { useContentContext } from "../../context/ContentContext";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { isGroupDetailsChanged, updateUserMovement } from "../../utils/user";
import { fetchGetActivity, fetchUpdateUser } from "../../utils/fetch";
import styles from "./BuildActivity.module.css";
import SmallLoading from "../../components/Loading/SmallLoading/SmallLoading";
import MainBtn from "../../components/MainBtn/MainBtn";
import LoadingActivity from "../../components/Loading/LoadingActivity/LoadingActivity";
import { Activity, PartStructure } from "../../models/types/activity";
import msg from "../../models/resources/errorMsg.json";
import route from "../../router/route.json";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import BuildForm from "../../components/BuildForm/BuildForm";
import CreateYourActivity from "../../components/titles/CreateYourActivity/CreateYourActivity";
import { SessionKey } from "../../models/enums/session";
import Session from "../../utils/sessionStorage";

// TODO
// small part input size (height)
// close animated part when drag
// resize part is junky
// input text
// prompts
// saved the part subject if click back (should not be saved)
// on close part, add the input text as ...

function BuildActivity() {
    const { handleError } = useErrorContext();
    const { data, updateMainActivity, clearMainActivity } = useContentContext();
    const { isLoggedIn, currentUser, loading } = useAuthContext();

    const [subject, setSubject] = useState("");
    const [place, setPlace] = useState("");
    const [selectedParts, setSelectedParts] = useState<PartStructure[]>([]);

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
                    const { movement, grade, gender, amount, time } = data;
                    const { name } = movement;
                    const user = updateUserMovement(currentUser, name, grade, gender, amount, time);
                    await fetchUpdateUser({ user });
                }
            }
        };

        const setStateFromSession = () => {
            try {
                if (!subject || subject === "") {
                    const sessionActivity: Activity | undefined = Session.get(SessionKey.ACTIVITY);
                    if (sessionActivity){
                        setSubject(sessionActivity.subject);
                        setPlace(sessionActivity.place);
                        setSelectedParts(sessionActivity.parts);
                    };
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
        setIsDisabled(subject === "" || place === "" ? true : false);
        // setIsDisabled(subject === "" || place === "" || selectedParts.length <= 0 ? true : false);
    }, [loading, subject, place, selectedParts]);

    const submitHandler = async () => {
        setClicked(true);
        const { movement, ...detailsData } = data;
        try {
            const response = await fetchGetActivity({
                fetchFrom: ["AI", "DB"],
                parts: selectedParts,
                ...detailsData,
                subject,
                place,
            });
            if (
                (response.result === "success" || response.result === "safety") &&
                response.activity
            ) {
                updateMainActivity({...response.activity, parts: selectedParts});
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
        <PageLayout path={route.build} hasGreenBackground hasHeader={{ goBack }}>
            <CreateYourActivity />

            <div className={styles.build_form_container}>
                <img
                    className={styles.path_img}
                    title="Yellow sign with heart"
                    alt="Yellow sign with heart"
                    src={"path.svg"}
                    width={130}
                    height={160}
                ></img>
                <div className={styles.build_content}>
                    {loading ? (
                        <section className={styles.loading_mock_selection_container}>
                            <SmallLoading />
                        </section>
                    ) : (
                        <BuildForm
                            subject={subject}
                            place={place}
                            parts={data.movement.parts}
                            setHasAlert={setHasAlert}
                            setSubject={setSubject}
                            setPlace={setPlace}
                            setSelectedParts={setSelectedParts}
                        />
                    )}
                    <div className={styles.btn_div}>
                        <MainBtn
                            isDisabled={isDisabled}
                            height={42}
                            text={"הצעה לפעילות"}
                            func={submitHandler}
                        ></MainBtn>
                        {hasAlert ? (
                            <div className={styles.input_alert}>
                                שימו לב! מקור הפעילויות הינו מערכת בינה מלאכותית, יכול להיות
                                וחיפושים מסויימים עדיין לא התעדכנו במערכת
                            </div>
                        ) : null}
                    </div>
                </div>

                {clicked ? <LoadingActivity /> : null}
            </div>
        </PageLayout>
    );
}

export default BuildActivity;
