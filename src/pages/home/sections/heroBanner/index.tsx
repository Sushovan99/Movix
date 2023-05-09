import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUpcomingMoviesQuery } from "@/store/apiSlices/getUpcomingMovies";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { resetCurrentPage } from "@/store/UI/searchedMoviesSlice";
import Img from "@/components/LazyLoadImage";
import ContentWrapper from "@/components/ContentWrapper";
import "./style.scss";

const HeroBanner: React.FunctionComponent = () => {
    const { data: movies } = useGetUpcomingMoviesQuery();
    const Navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [query, setQuery] = useState("");
    const { backdrop_sizes, base_url } = useAppSelector(
        (state) => state.dimensions
    );

    const [backdropPath, setBackdropPath] = useState("");

    useEffect(() => {
        const backdrop =
            movies?.results[Math.floor(Math.random() * 20)].backdrop_path;
        if (backdrop) setBackdropPath(backdrop);
    }, [movies?.results]);

    const searchQueryHandler = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && query.length > 0) {
            dispatch(resetCurrentPage());
            Navigate({
                pathname: "/search",
                search: `?q=${query}`,
            });
        }
    };

    const searchBtnHandler = (): void => {
        if (query.length > 0) {
            dispatch(resetCurrentPage());
            Navigate({
                pathname: "/search",
                search: `?q=${query}`,
            });
        }
    };

    return (
        <section className="heroBanner">
            <div className="backdrop-img">
                <Img
                    src={
                        backdropPath
                            ? base_url + backdrop_sizes.original + backdropPath
                            : ""
                    }
                    alt={backdropPath}
                />
            </div>

            <div className="opacity-layer"></div>

            <ContentWrapper>
                <div className="heroBannerContent">
                    <h1 className="title">Welcome.</h1>
                    <span className="subTitle">
                        Thousands of movies, TV shows and people to discover.
                        Explore now.
                    </span>

                    <div className="searchInput">
                        <input
                            type="text"
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyUp={searchQueryHandler}
                            placeholder="Search for a movie or a TV show..."
                        />
                        <button onMouseUp={searchBtnHandler}>Search</button>
                    </div>
                </div>
            </ContentWrapper>
        </section>
    );
};

export default HeroBanner;
