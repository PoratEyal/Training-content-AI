import { useEffect, useState } from "react";
import { useContentContext } from "../../context/ContentContext";
import { useNavigate } from "react-router-dom";
import styles from "./Details.module.css";
import {
    ActivityLocation,
    ChildrensNumber,
    ClassLevel,
    Gender,
} from "../../models/resources/group";
import SelectDetails from "../../components/SelectDetails/SelectDetails";
import { MovmentsTitle } from "../../models/resources/group";
import Btn from "../../components/btn/btn";
import { IoMdArrowRoundBack } from "react-icons/io";
import Profile from "../../components/auth/Profile/Profile";
import { useAuthContext } from "../../context/AuthContext";

function Details() {
    const { data, updateDetails } = useContentContext();
    const { isLoggedIn, currentUser } = useAuthContext();

    const [movement, setMovment] = useState(data?.movement?.title || "");
    const [classLevel, setClassLevel] = useState(data?.grade || "");
    const [numberOfChildren, setNumberOfChildren] = useState(data?.amount || "");
    const [activityLocation, setActivityLocation] = useState(data?.place || "");
    const [gender, setGender] = useState(data?.gender || "");

    const [clicked, setClicked] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        if (movement && classLevel && numberOfChildren && activityLocation && gender) {
            setIsDisabled(false);
        }
    }, [movement, classLevel, numberOfChildren, activityLocation, gender]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setClicked(true);
        updateDetails(movement, classLevel, numberOfChildren, activityLocation, gender);

        navigate("/choosePath");
    };

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
                onClick={() => navigate("/")}
                className={styles.back_icon}
            ></IoMdArrowRoundBack>

            <img className={styles.h2_img} alt="h2 text" src="h2_page2.svg"></img>

            <form onSubmit={handleSubmit} className={styles.detailsForm}>
                <img className={styles.lamp_img} alt="lamp image" src="lamp.svg"></img>

                <div className={styles.spacer}></div>

                <div>
                    <SelectDetails
                        data={MovmentsTitle}
                        placeholder={"תנועת נוער"}
                        obj={movement}
                        setObj={setMovment}
                    />
                    <SelectDetails
                        data={ClassLevel}
                        placeholder={"קבוצת גיל"}
                        obj={classLevel}
                        setObj={setClassLevel}
                    />
                    <SelectDetails
                        data={ChildrensNumber}
                        placeholder={"מספר ילדים"}
                        obj={numberOfChildren}
                        setObj={setNumberOfChildren}
                    />
                    <SelectDetails
                        data={ActivityLocation}
                        placeholder={"מיקום הפעילות"}
                        obj={activityLocation}
                        setObj={setActivityLocation}
                    />
                    <SelectDetails
                        data={Gender}
                        placeholder={"מין"}
                        obj={gender}
                        setObj={setGender}
                    />
                </div>

                <div className={styles.btn_div}>
                    <Btn
                        isDisabled={isDisabled}
                        height={38}
                        text={"בחירת פעילות"}
                        func={handleSubmit}
                    ></Btn>
                </div>
            </form>
        </div>
    );
}

export default Details;
