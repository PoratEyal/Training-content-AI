import { SelectOption } from "../../models/types/common";
import styles from "./SelectDetails.module.css";

type SelectDetailsProps = {
    data: SelectOption[];
    placeholder: string;
    obj: string;
    setObj: (obj: string) => void;
};

function SelectDetails({ data, placeholder, obj, setObj }: SelectDetailsProps) {
    return (
        <div className={styles.input_div}>
            <select value={obj} onChange={(e) => setObj(e.target.value)} aria-label={placeholder}>
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
