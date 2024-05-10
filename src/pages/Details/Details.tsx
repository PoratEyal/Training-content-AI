import { useEffect, useState } from "react";
import { VscLoading } from "react-icons/vsc";
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
import Footer from "../../components/Layout/Footer/Footer";
import { MovmentsTitle } from "../../models/resources/group";

function Details() {
    const { data, updateDetails } = useContentContext();

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
            <form onSubmit={handleSubmit} className={styles.detailsForm}>
                <SelectDetails
                    data={MovmentsTitle}
                    placeholder={"תנועת נוער"}
                    obj={movement}
                    setObj={setMovment}
                />
                <br />
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
                <SelectDetails data={Gender} placeholder={"מין"} obj={gender} setObj={setGender} />

                <div className={styles.btn_div}>
                    <button
                        disabled={isDisabled}
                        onClick={() => setClicked(true)}
                        className={styles.submit_btn}
                        type="submit"
                    >
                        {!clicked ? (
                            "המשיכו"
                        ) : (
                            <VscLoading className={styles.loading_icon}></VscLoading>
                        )}
                    </button>
                </div>
            </form>

            <Footer />
        </div>
    );
}

export default Details;
