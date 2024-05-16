import { useEffect, useState } from "react";
import { useContentContext } from "../../context/ContentContext";
import { useNavigate } from "react-router-dom";
import styles from "./Details.module.css";
import {
    MovmentsOptions,
    GradeOptions,
    AmountOptions,
    PlaceOptions,
    GenderOptions,
} from "../../models/resources/select";
import SelectDetails from "../../components/SelectDetails/SelectDetails";
import MainBtn from "../../components/MainBtn/MainBtn";
import { IoMdArrowRoundBack } from "react-icons/io";
import Profile from "../../components/auth/Profile/Profile";
import { useAuthContext } from "../../context/AuthContext";

function Details() {
    const { data, updateDetails, clearAll } = useContentContext();
    const { isLoggedIn, currentUser } = useAuthContext();
    const navigate = useNavigate();

    const [movement, setMovment] = useState(
        data ? data.movement?.name : currentUser?.movement ? currentUser.movement?.movement : "",
    );

    const [classLevel, setClassLevel] = useState(
        data ? data.grade : currentUser?.movement ? currentUser.movement?.grade : "",
    );

    const [numberOfChildren, setNumberOfChildren] = useState(
        data ? data.amount : currentUser?.movement ? currentUser.movement?.amount : "",
    );

    const [activityLocation, setActivityLocation] = useState(
        data ? data.place : currentUser?.movement ? currentUser.movement?.place : "",
    );

    const [gender, setGender] = useState(
        data ? data.gender : currentUser?.movement ? currentUser.movement?.gender : "",
    );

    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
        if (movement && classLevel && numberOfChildren && activityLocation && gender) {
            setIsDisabled(false);
        }
    }, [movement, classLevel, numberOfChildren, activityLocation, gender]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        updateDetails(movement, classLevel, numberOfChildren, activityLocation, gender);
        navigate("/choosePath");
    };

    const goBack = () => {
        clearAll();
        navigate("/");
    }

    return (
        <div className={styles.container}>
            {isLoggedIn ? (
                <Profile
                    img={currentUser?.image || ""}
                    name={currentUser?.name || "r"}
                    role="guide"
                />
            ) : null}

            <IoMdArrowRoundBack
                onClick={goBack}
                className={styles.back_icon}
            ></IoMdArrowRoundBack>

            <img className={styles.h2_img} alt="h2 text" src="h2_page2.svg"></img>

            <form onSubmit={handleSubmit} className={styles.detailsForm}>
                <img className={styles.lamp_img} alt="lamp image" src="lamp.svg"></img>

                <div className={styles.spacer}></div>

                <div className={styles.select_div}>
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

                <div className={styles.btn_div}>
                    <MainBtn
                        type="submit"
                        isDisabled={isDisabled}
                        height={38}
                        text={"בחירת פעילות"}
                        func={handleSubmit}
                    ></MainBtn>
                </div>
            </form>
        </div>
    );
}

export default Details;
