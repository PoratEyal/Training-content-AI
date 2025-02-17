import "./AdsSmall.css";
// eslint-disable-next-line import/no-webpack-loader-syntax
import { Adsense } from "@ctrl/react-adsense";

type AdsSmallProps = {
    slot: string;
};

const AdsSmall: React.FC<AdsSmallProps> = ({slot}) => {
    return (
        <Adsense
            className="ads-small-slot"
            client="ca-pub-9858822058074702"
            slot={slot}
            layout="in-article"
            format="repv"
            // adTest="on" //Dev Only
        />
    );
};

export default AdsSmall;