import React, { useState, useRef } from "react";
import ContentWrapper from "@/components/ContentWrapper";
import SwitchTabs from "@/components/SwitchTabs";
import { useGetPopularMoviesQuery } from "@/store/apiSlices/getPopularMovies";
import Carousel from "@/components/Carousel";
import "./style.scss";

const Trending: React.FunctionComponent = () => {
    const carouselContainerRef = useRef<HTMLDivElement>(null);
    const [tabValue, setTabValue] = useState("movie");

    const onTabsChange = (tab: string) => {
        setTabValue(tab === "Movies" ? "movie" : "tv");
        carouselContainerRef.current?.scrollTo({
            left: 0,
            behavior: "auto",
        });
    };

    const { data: popularMovies, isSuccess } =
        useGetPopularMoviesQuery(tabValue);

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">What's Popular</span>
                <SwitchTabs
                    data={["Movies", "TV Shows"]}
                    onTabsChange={onTabsChange}
                />
            </ContentWrapper>

            <Carousel
                results={popularMovies?.results}
                mediaType={tabValue}
                isSuccess={isSuccess}
                carouselRef={carouselContainerRef}
            />
        </div>
    );
};

export default Trending;
