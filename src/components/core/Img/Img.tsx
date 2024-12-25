import React from "react";

type ImgProps = {
    obj: any;
    style: React.CSSProperties;
};

function Img({ obj, style }: ImgProps) {
    const { title, src, lazy, width, height } = obj;

    return (
        <img
            style={style}
            title={title}
            alt={title}
            src={src}
            loading={lazy ? "lazy" : undefined}
            width={width}
            height={height}
        ></img>
    );
}

export default Img;
