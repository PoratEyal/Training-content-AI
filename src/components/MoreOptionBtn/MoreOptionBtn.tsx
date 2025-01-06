import React, { useState } from "react";
import styles from "./MoreOptionBtn.module.css";
import { FiChevronsLeft } from "react-icons/fi";
import SelectDetails from "../SelectDetails/SelectDetails";
import { SelectOption } from "../../models/types/common";

export const shabbatOptions: SelectOption[] = [
    { value: "observant", label: "שומר שבת" },
    { value: "traditional", label: "מסורתי" },
    { value: "nonObservant", label: "לא שומר" },
];
  
export const groupBehaviorOptions: SelectOption[] = [
  { value: "relaxed", label: "רגוע" },
  { value: "loud", label: "רועש" },
  { value: "quiet", label: "שקט" },
  { value: "scattered", label: "מתפזר" },
];

interface MoreOptionBtnProps {
  initialClicked?: boolean;
}

const MoreOptionBtn: React.FC<MoreOptionBtnProps> = ({
  initialClicked = false,
}) => {
  const [clicked, setClicked] = useState<boolean>(initialClicked);

  // Local states (if you need them in the parent, lift them up)
  const [shabbat, setShabbat] = useState("");
  const [behavior, setBehavior] = useState("");

  const handleClick = () => {
    setClicked((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <button className={styles.btn} onClick={handleClick}>
        <FiChevronsLeft
          className={`${styles.icon} ${clicked ? styles.rotated : ""}`}
        />
        <label>לחצו לאפשרויות נוספות</label>
      </button>

      {/* Always in the DOM, but toggling a class to animate */}
      <div
        className={`${styles.additionalOptions} ${
          clicked ? styles.open : ""
        }`}
      >
        {/* שמירת שבת */}
        <SelectDetails
          placeholder="שמירת שבת"
          obj={shabbat}
          setObj={setShabbat}
          data={shabbatOptions}
        />

        {/* אופי התנהגות של הקבוצה */}
        <SelectDetails
          placeholder="אופי התנהגות של הקבוצה"
          obj={behavior}
          setObj={setBehavior}
          data={groupBehaviorOptions}
        />
      </div>
    </div>
  );
};

export default MoreOptionBtn;
