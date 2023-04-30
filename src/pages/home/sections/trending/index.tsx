import React, { useState } from "react";
import ContentWrapper from "@/components/ContentWrapper";
import SwitchTabs from "@/components/SwitchTabs";
import { useGetTrendingMoviesQuery } from "@/store/apiSlices/getTrendingMovies";
import Carousel from "@/components/Carousel";
import "./style.scss";

const Trending: React.FunctionComponent = () => {
    const [tabValue, setTabValue] = useState("day");

    const onTabsChange = (tab: string) => {
        setTabValue(tab);
    };

    const { data: trendingMovies, isSuccess } = useGetTrendingMoviesQuery({
        mediaType: "all",
        timeWindow: tabValue.toLowerCase(),
    });

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Trending</span>
                <SwitchTabs
                    data={["Day", "Week"]}
                    onTabsChange={onTabsChange}
                />
            </ContentWrapper>

            <Carousel results={trendingMovies?.results} isSuccess={isSuccess} />
        </div>
    );
};

export default Trending;
