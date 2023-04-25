import React from "react";
import "./style.scss";

const ContentWrapper: React.FunctionComponent<React.PropsWithChildren> = ({
    children,
}) => {
    return <div className="content-wrapper">{children}</div>;
};

export default ContentWrapper;
