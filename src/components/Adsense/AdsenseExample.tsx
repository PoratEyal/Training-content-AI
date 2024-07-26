import React from "react";
import { Adsense } from "@ctrl/react-adsense";

function AdsenseExample() {
    return (
        <Adsense
            className="ExampleAdSlot"
            client="ca-pub-9858822058074702"
            slot="9576195701"
            // adTest="on" //Dev Only
            // style={{ width: 300, height: 320, backgroundColor: "black" }}
            style={{ width: 350, height: 100, backgroundColor: "black" }}
            layout="in-article"
            format="repv"
        />
    );
}

export default AdsenseExample;
