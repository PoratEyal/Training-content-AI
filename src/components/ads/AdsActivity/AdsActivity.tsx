import React from "react";
import "./AdsActivity.css";
import { Adsense } from "@ctrl/react-adsense";

{
    /* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9858822058074702"
     crossorigin="anonymous"></script>
<ins class="adsbygoogle"
     style="display:block; text-align:center;"
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-9858822058074702"
     data-ad-slot="5162325824"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script> */
}

const AdsActivity = () => {
    return (
        <Adsense
            className="ads-tmp-slot"
            client="ca-pub-9858822058074702"
            slot="7241259487"
            layout="in-article"
            format="repv"
        />
    );
};

export default AdsActivity;
