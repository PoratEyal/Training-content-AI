import { useAuthContext } from "../../context/AuthContext";
import { NOT_REGISTER_LIMIT } from "../../models/constants";
import styles from "./LimitIndicator.module.css";

const cleanPercentage = (percentage) => {
    const constantNum = NOT_REGISTER_LIMIT * 10;
    const isNegativeOrNaN = !Number.isFinite(+percentage) || percentage < 0; // we can set non-numbers to 0 here
    const isTooHigh = percentage > constantNum;
    return isNegativeOrNaN ? 0 : isTooHigh ? constantNum : +percentage;
};

const Circle = ({ percentage }) => {
    const constantNum = NOT_REGISTER_LIMIT * 10;
    const r = 16;
    const circ = 2 * Math.PI * r;
    const strokePct = ((constantNum - percentage) * circ) / constantNum;
    return (
        <circle
            r={r}
            cx={100}
            cy={100}
            fill="transparent"
            strokeWidth={"3px"}
            strokeDasharray={circ}
            strokeDashoffset={percentage ? strokePct : 0}
        ></circle>
    );
};

function LimitIndicator() {
    const { guestLimit } = useAuthContext();
    const constantNum = NOT_REGISTER_LIMIT * 10;
    const num = NOT_REGISTER_LIMIT - guestLimit || 0;
    const pct = cleanPercentage(num * 10);

    return (
        <svg width={constantNum} height={constantNum} className={styles.limit_indicator}>
            <g transform={`rotate(-90 ${"30 100"})`}>
                <Circle percentage={pct} />
            </g>
            <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" fontSize={"16px"}>
                {num < 0 ? 0 : num}
            </text>
        </svg>
    );
}

export default LimitIndicator;
