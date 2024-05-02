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
import Footer from "../../components/Footer/Footer";
import Cookies from 'js-cookie';

function Details() {
    const [classLevel, setClassLevel] = useState(Cookies.get('classLevel') || "");
    const [numberOfChildren, setNumberOfChildren] = useState(Cookies.get('numberOfChildren') || "");
    const [activityLocation, setActivityLocation] = useState(Cookies.get('activityLocation') || "");
    const [gender, setGender] = useState(Cookies.get('gender') || "");

    const [clicked, setClicked] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);

    const { updateDetails } = useContentContext();

    const navigate = useNavigate();

    useEffect(() => {
        if (classLevel && numberOfChildren && activityLocation && gender) {
            setIsDisabled(false);
        }
    }, [classLevel, numberOfChildren, activityLocation, gender]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setClicked(true);
        updateDetails(classLevel, numberOfChildren, activityLocation, gender);

        Cookies.set('classLevel', classLevel);
        Cookies.set('numberOfChildren', numberOfChildren);
        Cookies.set('activityLocation', activityLocation);
        Cookies.set('gender', gender);

        navigate("/choosePath");
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.detailsForm}>
                <div className={styles.half_circle}>
                    <label>
                        בונה פעולות <br></br> לתנועות נוער
                    </label>
                </div>

                <h2 className={styles.h2_group}>הזינו מספר פרטים על הקבוצה שלכם</h2>

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

            <Footer />
        </div>
    );
}

export default Details;
