import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import { useGetUpcomingMoviesQuery } from "@/store/apiSlices/getUpcomingMovies";
import { useAppSelector } from "@/store/hooks";
import Img from "@/components/LazyLoadImage";
import ContentWrapper from "@/components/ContentWrapper";
import { Result as Movie } from "@/service/models";

const HeroBanner: React.FunctionComponent = () => {
    const { data: movies, isSuccess } = useGetUpcomingMoviesQuery();
    const Navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [randomMovie, setRandomMovie] = useState<Movie>();
    const { backdrop_sizes, base_url } = useAppSelector(
        (state) => state.dimensions
    );

    useEffect(() => {
        if (isSuccess) {
            setRandomMovie(
                movies.results[
                    Math.floor(Math.random() * movies.results.length)
                ]
            );
        }
    }, [backdrop_sizes.original, base_url, isSuccess, movies]);

    const searchQueryHandler = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && query.length > 0) {
            Navigate({
                pathname: "/search",
                search: `?q=${query}`,
            });
        }
    };

    return (
        <section className="hero-banner">
            <div className="hero-banner__backdrop-img">
                <Img
                    src={
                        randomMovie?.backdrop_path
                            ? base_url +
                              backdrop_sizes.original +
                              randomMovie.backdrop_path
                            : ""
                    }
                    alt={randomMovie?.original_title}
                />
            </div>

            <div className="wrapper-gradient"></div>

            <ContentWrapper>
                <div className="hero-banner__content">
                    <div className="hero-banner__greeting">
                        <h1 className="hero-banner__greeting__title">
                            Welcome.
                        </h1>
                        <span className="hero-banner__greeting__subtitle">
                            Thousands of movies, TV shows and people to
                            discover. Explore now.
                        </span>
                    </div>
                    <div className="hero-banner__search-grp">
                        <input
                            type="text"
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyUp={searchQueryHandler}
                            placeholder="Search for a movie or a TV show..."
                        />
                        <button>Search</button>
                    </div>
                </div>
            </ContentWrapper>
        </section>
    );
};

export default HeroBanner;
