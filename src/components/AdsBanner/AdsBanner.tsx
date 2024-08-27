import { useEffect, useRef } from "react";

function AdsBanner(): JSX.Element {
    const banner = useRef<HTMLDivElement>();

    const atOptions = {
        key: "3c5bc1874396e783573061bb963c28d0",
        format: "iframe",
        width: 320,
        height: 50,
        params: {},
    };
    useEffect(() => {
        if (banner.current && !banner.current.firstChild) {
            const conf = document.createElement("script");
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src = `//www.topcreativeformat.com/${atOptions.key}/invoke.js`;
            conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`;

            banner.current.append(conf);
            banner.current.append(script);
        }
    }, [banner]);

    return (
        <div
            style={{
                backgroundColor: "#1c1c1c39",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                width: 320,
                height: 50,
            }}
            ref={banner}
        ></div>
    );
}

export default AdsBanner;
