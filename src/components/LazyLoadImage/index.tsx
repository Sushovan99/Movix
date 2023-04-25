import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

interface Props {
    alt: string;
    src: string;
    className: string;
}

const Img: React.FunctionComponent<Props> = ({
    alt = "",
    className = "",
    src = "",
}) => <LazyLoadImage alt={alt} src={src} className={className} effect="blur" />;

export default Img;
