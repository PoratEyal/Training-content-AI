import { useEffect, useState } from "react";
import { useContentContext } from "../../context/ContentContext";
import { useNavigate } from "react-router-dom";
import styles from "./Details.module.css";
import {
    MovmentsOptions,
    GradeOptions,
    AmountOptions,
    GenderOptions,
    ActivityTimeOptions,
} from "../../models/resources/select";
import SelectDetails from "../../components/SelectDetails/SelectDetails";
import MainBtn from "../../components/MainBtn/MainBtn";
import { useAuthContext } from "../../context/AuthContext";
import route from "../../router/route.json";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import SmallLoading from "../../components/Loading/SmallLoading/SmallLoading";
import TellUsAboutYourGroup from "../../components/titles/TellUsAboutYourGroup/TellUsAboutYourGroup";

function Details() {
    const { data, updateDetails, clearAll } = useContentContext();
    const { isLoggedIn, currentUser, loading } = useAuthContext();
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

    const [time, setTime] = useState(
        data ? data?.time : currentUser?.movement ? currentUser?.movement?.time : "",
    );

    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
        if (loading) setIsDisabled(true);
        else {
            if (movement && classLevel && numberOfChildren && gender && time) {
                setIsDisabled(false);
            }
        }
    }, [movement, classLevel, numberOfChildren, gender, time, loading]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        updateDetails(movement, classLevel, numberOfChildren, time, gender);
        navigate(route.build);
    };

    const goBack = () => {
        clearAll();
        navigate(route.home);
    };

    return (
        <PageLayout
            path={route.details}
            hasGreenBackground
            hasHeader={{ goBack: isLoggedIn ? undefined : goBack }}
        >
            <TellUsAboutYourGroup />

            <form onSubmit={handleSubmit} className={styles.details_form}>
                <img
                    className={styles.lamp_img}
                    title="Yellow lamp"
                    alt="Yellow lamp"
                    src={"lamp.svg"}
                    loading="lazy"
                    width={135}
                    height={139}
                ></img>

                <div className={styles.selects_btn}>
                    {loading ? (
                        <div className={styles.loading_mock_selection_container}>
                            <SmallLoading />
                        </div>
                    ) : (
                        <div className={styles.selection_container}>
                            <SelectDetails
                                data={MovmentsOptions}
                                placeholder={"תנועת נוער"}
                                obj={movement}
                                setObj={setMovment}
                            />
                            <SelectDetails
                                data={GradeOptions}
                                placeholder={"קבוצת גיל"}
                                obj={classLevel}
                                setObj={setClassLevel}
                            />
                            <SelectDetails
                                data={AmountOptions}
                                placeholder={"מספר ילדים"}
                                obj={numberOfChildren}
                                setObj={setNumberOfChildren}
                            />
                            <SelectDetails
                                data={GenderOptions}
                                placeholder={"מין"}
                                obj={gender}
                                setObj={setGender}
                            />
                            <SelectDetails
                                data={ActivityTimeOptions}
                                placeholder="משך הפעילות"
                                obj={time}
                                setObj={setTime}
                            />
                        </div>
                    )}

                    <div className={styles.btn_div}>
                        <MainBtn
                            type="submit"
                            isDisabled={isDisabled}
                            height={42}
                            text="המשיכו"
                            func={handleSubmit}
                        ></MainBtn>
                    </div>
                </div>
            </form>
        </PageLayout>
    );
}

export default Details;
