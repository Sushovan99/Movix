import React from "react";
import "./style.scss";
import HeroBanner from "./sections/heroBanner";
import Trending from "./sections/trending";

const HomePage: React.FunctionComponent = () => {
    return (
        <div className="homePage">
            <HeroBanner />
            <Trending />
            <div style={{ height: 1000 }}></div>
        </div>
    );
};

export default HomePage;
