//
// This component renders a dropdown <select> for choosing an option
// It automatically adjusts its text direction and style based on the active language (LTR for English/Spanish, RTL for Hebrew/Arabic)
// It updates the selected value when changed and highlights the text color for selected items
//
import React, { useEffect, useState } from "react";
import { SelectOption } from "../../models/types/common";
import styles from "./SelectDetails.module.css";
import { useLanguage } from "../../i18n/useLanguage";

type SelectDetailsProps = {
  data: SelectOption[];
  placeholder: string;
  obj: string;
  setObj: (obj: string) => void;
};

function SelectDetails({ data, placeholder, obj, setObj }: SelectDetailsProps) {
  const { dir } = useLanguage();
  const [selected, setIsSelected] = useState(obj ? true : false);
  const textColor = selected ? "#333335" : "#8b8b8b";

  useEffect(() => {
    setIsSelected(!!obj);
  }, [obj]);

  const handleChange = (value: string) => {
    setObj(value);
    setIsSelected(value !== "" || !!obj);
  };

  return (
    <div
      className={
        dir === "ltr"
          ? `${styles.input_div} ${styles.ltr_div}`
          : styles.input_div
      }
    >
      <select
        style={{ color: textColor }}
        value={obj}
        onChange={(e) => handleChange(e.target.value)}
        aria-label={placeholder}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {data.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectDetails;
