import React from "react";
import "./style.scss";
import HeroBanner from "./sections/heroBanner";

const HomePage: React.FunctionComponent = () => {
    return (
        <div className="homePage">
            HomePage
            <HeroBanner />
        </div>
    );
};

export default HomePage;
