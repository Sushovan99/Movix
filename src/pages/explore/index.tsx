import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Select from "react-select";
import ContentWrapper from "@/components/ContentWrapper";
import Spinner from "@/components/Spinner";
import MovieCard from "@/components/MovieCard";
import { useGetGenresQuery } from "@/store/apiSlices/getGenres";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useGetMedia } from "@/store/apiSlices/getMedia";
import {
    updateLoadingState,
    updateCurrentPage,
    updateDiscoveredMedia,
    resetCurrentPage,
} from "@/store/UI/discoverMediaSlice";
import "./style.scss";
import { Result } from "@/service/models";

interface QueryResults {
    page: number;
    total_results: number;
    total_pages: number;
    results: Result[];
}
interface Genre {
    id: number;
    name: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let filters: any = {};

const sortbyData = [
    { value: "popularity.desc", label: "Popularity Descending" },
    { value: "popularity.asc", label: "Popularity Ascending" },
    { value: "vote_average.desc", label: "Rating Descending" },
    { value: "vote_average.asc", label: "Rating Ascending" },
    {
        value: "primary_release_date.desc",
        label: "Release Date Descending",
    },
    { value: "primary_release_date.asc", label: "Release Date Ascending" },
    { value: "original_title.asc", label: "Title (A-Z)" },
];

const ExplorePage: React.FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const { mediaType } = useParams();
    const { data: genresData } = useGetGenresQuery(mediaType);
    const [genre, setGenre] = useState(null);
    const [sortby, setSortby] = useState(null);
    const {
        currentPage,
        searchResults: data,
        loading,
    } = useAppSelector((state) => state.discoveredMedia);

    const FetchInitialData = () => {
        dispatch(updateLoadingState(true));
        useGetMedia(currentPage, filters, mediaType)
            .then((res) => res.json())
            .then((data: QueryResults) => {
                dispatch(updateDiscoveredMedia(data));
                dispatch(updateLoadingState(false));
                dispatch(updateCurrentPage());
            });
    };

    const FetchNextData = () => {
        useGetMedia(currentPage, filters, mediaType)
            .then((res) => res.json())
            .then((data: QueryResults) => {
                dispatch(updateDiscoveredMedia(data));
                dispatch(updateCurrentPage());
            });
    };

    useEffect(() => {
        filters = {};
        setSortby(null);
        setGenre(null);
        dispatch(resetCurrentPage());
        FetchInitialData();
    }, [mediaType]);

    const onChange = (selectedItems: any, action: any) => {
        console.log("action", action);
        if (action.name === "sortby") {
            console.log("selected-items", selectedItems);
            setSortby(selectedItems);
            if (action.action !== "clear") {
                filters.sort_by = selectedItems.value;
            } else {
                delete filters.sort_by;
            }
        }

        if (action.name === "genres") {
            setGenre(selectedItems);
            if (action.action !== "clear") {
                let genreId: Genre[] | string = selectedItems.map(
                    (g: Genre) => g.id
                );
                genreId = JSON.stringify(genreId).slice(1, -1);
                filters.with_genres = genreId;
            } else {
                delete filters.with_genres;
            }
        }

        dispatch(resetCurrentPage());
        FetchInitialData();
    };

    return (
        <div className="explorePage">
            <ContentWrapper>
                <div className="pageHeader">
                    <div className="pageTitle">
                        {mediaType === "tv"
                            ? "Explore TV Shows"
                            : "Explore Movies"}
                    </div>
                    <div className="filters">
                        <Select
                            isMulti
                            name="genres"
                            value={genre}
                            closeMenuOnSelect={false}
                            options={genresData?.genres}
                            getOptionLabel={(option) => `${option?.name}`}
                            getOptionValue={(option) => `${option?.id}`}
                            onChange={onChange}
                            placeholder="Select genres"
                            className="react-select-container genresDD"
                            classNamePrefix="react-select"
                        />
                        <Select
                            name="sortby"
                            value={sortby}
                            options={sortbyData}
                            onChange={onChange}
                            isClearable={true}
                            placeholder="Sort by"
                            className="react-select-container sortbyDD"
                            classNamePrefix="react-select"
                        />
                    </div>
                </div>
                {loading && <Spinner initial={true} />}
                {!loading && (
                    <>
                        {data?.results?.length > 0 ? (
                            <InfiniteScroll
                                className="content"
                                dataLength={data?.results?.length}
                                next={FetchNextData}
                                hasMore={currentPage <= data?.total_pages}
                                loader={<Spinner />}
                            >
                                {data?.results?.map((item, index) => {
                                    if (item.media_type === "person") return;
                                    return (
                                        <MovieCard
                                            key={index}
                                            data={item}
                                            mediaType={mediaType}
                                        />
                                    );
                                })}
                            </InfiniteScroll>
                        ) : (
                            <span className="resultNotFound">
                                Sorry, Results not found!
                            </span>
                        )}
                    </>
                )}
            </ContentWrapper>
        </div>
    );
};

export default ExplorePage;
