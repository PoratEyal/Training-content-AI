import React from "react";
import { Adsense } from "@ctrl/react-adsense";

function AdsenseExample() {
    //console.log("Ads Shown")
    return (
        <Adsense
            className="ExampleAdSlot"
            client="ca-pub-1234"
            slot="2222222"
            adTest="on" //Dev Only
            style={{ width: 500, height: 100, backgroundColor: "black" }}
            layout="in-article"
            format="fluid"
        />
    );
}

export default AdsenseExample;
