import { useEffect, useState } from "react";
import { useContentContext } from "../../context/ContentContext";
import { useNavigate } from "react-router-dom";
import styles from "./Details.module.css";
import { VscLoading } from "react-icons/vsc";
import {
    MovmentsOptions,
    GradeOptions,
    AmountOptions,
    PlaceOptions,
    GenderOptions,
} from "../../models/resources/select";
import SelectDetails from "../../components/SelectDetails/SelectDetails";
import MainBtn from "../../components/MainBtn/MainBtn";
import { useAuthContext } from "../../context/AuthContext";
import Header from "../../components/Layout/Header/Header";
import { H2_PAGE2_IMG, LAMP_IMG } from "../../models/constants/img";

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

    const [activityLocation, setActivityLocation] = useState(
        data ? data?.place : currentUser?.movement ? currentUser?.movement?.place : "",
    );

    const [gender, setGender] = useState(
        data ? data?.gender : currentUser?.movement ? currentUser?.movement?.gender : "",
    );

    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
        if (loading) setIsDisabled(true);
        else {
            if (movement && classLevel && numberOfChildren && activityLocation && gender) {
                setIsDisabled(false);
            }
        }
    }, [movement, classLevel, numberOfChildren, activityLocation, gender, loading]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        updateDetails(movement, classLevel, numberOfChildren, activityLocation, gender);
        navigate("/choosePath");
    };

    const goBack = () => {
        clearAll();
        navigate("/home");
    };

    return (
        <div className={styles.container}>
            <Header goBack={isLoggedIn ? undefined : goBack} />

            <img className={styles.h2_img} alt="Tell us about your group" src={"h2_page2.svg"}></img>

            <form onSubmit={handleSubmit} className={styles.details_form}>
                <img className={styles.lamp_img} alt="Yellow lamp" src={"lamp.svg"}></img>

                <div className={styles.selects_btn}>
                    {loading ? (
                        <div className={styles.loading_mock_selection_container}>
                            <VscLoading className={styles.loading_icon_magic} />
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
                                data={PlaceOptions}
                                placeholder={"מיקום הפעילות"}
                                obj={activityLocation}
                                setObj={setActivityLocation}
                            />
                            <SelectDetails
                                data={GenderOptions}
                                placeholder={"מין"}
                                obj={gender}
                                setObj={setGender}
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
        </div>
    );
}

export default Details;
