import "./AdsBig.css";
// eslint-disable-next-line import/no-webpack-loader-syntax
import { Adsense } from "@ctrl/react-adsense";

type AdsBigProps = {
    slot: string;
};

const AdsBig: React.FC<AdsBigProps> = ({ slot }) => {
    return (
        <Adsense
            className="ads-big-slot"
            client="ca-pub-9858822058074702"
            slot={slot}
            layout="in-article"
            format="repv"
            // adTest="on" //Dev Only
        />
    );
};

export default AdsBig;
