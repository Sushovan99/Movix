import React, { useState, useRef } from "react";
import ContentWrapper from "@/components/ContentWrapper";
import SwitchTabs from "@/components/SwitchTabs";
import { useGetTopRatedMoviesQuery } from "@/store/apiSlices/getTopRatedMovies";
import Carousel from "@/components/Carousel";
import "./style.scss";

const TopRated: React.FunctionComponent = () => {
    const carouselContainerRef = useRef<HTMLDivElement>(null);
    const [tabValue, setTabValue] = useState("movie");

    const onTabsChange = (tab: string) => {
        setTabValue(tab === "Movies" ? "movie" : "tv");
        carouselContainerRef.current?.scrollTo({
            left: 0,
            behavior: "auto",
        });
    };

    const { data: topRatedMovies, isSuccess } =
        useGetTopRatedMoviesQuery(tabValue);

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Top Rated</span>
                <SwitchTabs
                    data={["Movies", "TV Shows"]}
                    onTabsChange={onTabsChange}
                />
            </ContentWrapper>

            <Carousel
                results={topRatedMovies?.results}
                isSuccess={isSuccess}
                tabValue={tabValue}
                carouselRef={carouselContainerRef}
            />
        </div>
    );
};

export default TopRated;
