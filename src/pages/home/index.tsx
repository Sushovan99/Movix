import React from "react";
import "./style.scss";
import HeroBanner from "./sections/heroBanner";
import Trending from "./sections/trending";
import Popular from "./sections/popular";
import TopRated from "./sections/topRated";

const HomePage: React.FunctionComponent = () => {
    return (
        <div className="homePage">
            <HeroBanner />
            <Trending />
            <Popular />
            <TopRated />
        </div>
    );
};

export default HomePage;
