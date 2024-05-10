import React from "react";
import { useContentContext } from "../../context/ContentContext";
import Path from "../../components/Path/Path";

function SelectPath() {
    const { data } = useContentContext();
    const { movement } = data || {};
    const { path } = movement || {};

    return (
        <section>
            {path?.map((p, i) => (
                <Path key={i} index={i} title={p.title} hint={p.hint} setPath={() => {}} />
            ))}
        </section>
    );
}

export default SelectPath;
