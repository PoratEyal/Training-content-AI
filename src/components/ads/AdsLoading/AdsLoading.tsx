import "./AdsLoading.css";
import { Adsense } from "@ctrl/react-adsense";

const AdsLoading = () => {
    return (
        <Adsense
            className="ads-loading-slot"
            client="ca-pub-9858822058074702"
            slot="9667370017"
            // adTest="on" //Dev Only
            layout="in-article"
            format="repv"
        />
    );
};

export default AdsLoading;