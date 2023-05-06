import React from "react";
import ContentWrapper from "@/components/ContentWrapper";
import "./style.scss";

const NotFoundPage: React.FunctionComponent = () => {
    return (
        <div className="pageNotFound">
            <ContentWrapper>
                <span className="bigText">404</span>
                <span className="smallText">Page not found!</span>
            </ContentWrapper>
        </div>
    );
};

export default NotFoundPage;
