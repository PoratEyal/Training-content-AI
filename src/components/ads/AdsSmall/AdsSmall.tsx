import "./AdsSmall.css";
import { Adsense } from "@ctrl/react-adsense";

const AdsSmall = () => {
    return (
        <Adsense
            className="ads-small-slot"
            client="ca-pub-9858822058074702"
            slot="8738367503"
            // adTest="on" //Dev Only
            layout="in-article"
            format="repv"
        />
    );
};

export default AdsSmall;