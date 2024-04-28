import { useEffect, useState } from "react";
import { VscLoading } from "react-icons/vsc";
import { useContentContext } from "../../context/ContentContext";
import { useNavigate } from "react-router-dom";
import { MdOutlinePrivacyTip } from "react-icons/md";
import styles from "./details.module.css";
import {
    ActivityLocation,
    ChildrensNumber,
    ClassLevel,
    Gender,
} from "../../models/resources/group";
import SelectDetails from "../../components/SelectDetails/SelectDetails";

function Details() {
    const [classLevel, setClassLevel] = useState("");
    const [numberOfChildren, setNumberOfChildren] = useState("");
    const [activityLocation, setActivityLocation] = useState("");
    const [gender, setGender] = useState("");

    const [clicked, setClicked] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);

    const { updateDetails } = useContentContext();

    const navigate = useNavigate();

    useEffect(()=>{
        if(classLevel && numberOfChildren && activityLocation && gender){
            setIsDisabled(false)
        }
    },[classLevel, numberOfChildren, activityLocation, gender])

    const handleSubmit = (e) => {
        e.preventDefault();
        setClicked(true);
        updateDetails(classLevel, +numberOfChildren, activityLocation, gender);
        navigate("/choosePath");
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <div className={styles.half_circle}>
                    <label>
                        הזינו מספר פרטים <br></br>על הקבוצה שלכם
                    </label>
                </div>

                <SelectDetails
                    data={ClassLevel}
                    placeholder={"כיתה"}
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

            <div onClick={() => navigate("/privacyPolicy")} className={styles.privacy_div}>
                <label>מדיניות פרטיות</label>
                <MdOutlinePrivacyTip className={styles.icon_privacy}></MdOutlinePrivacyTip>
            </div>
        </div>
    );
}

export default Details;
