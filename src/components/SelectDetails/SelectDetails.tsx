import { useState } from "react";
import { SelectOption } from "../../models/types/common";
import styles from "./SelectDetails.module.css";

type SelectDetailsProps = {
    data: SelectOption[];
    placeholder: string;
    obj: string;
    setObj: (obj: string) => void;
};

function SelectDetails({ data, placeholder, obj, setObj }: SelectDetailsProps) {
    const [selected, setIsSelected] = useState(obj ? true : false);

    const handleChnage = (value: string) => {
        setObj(value);
        setIsSelected(value !== "" || obj ? true : false);
    };

    return (
        <div className={styles.input_div}>
            <select
                style={{ color: selected ? "#333335" : "#8b8b8b" }}
                value={obj}
                onChange={(e) => handleChnage(e.target.value)}
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
