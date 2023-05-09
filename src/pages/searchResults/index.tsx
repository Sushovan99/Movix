import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "@/components/Spinner";
import { useGetSearchResults } from "@/store/apiSlices/getSearchResults";
import MovieCard from "@/components/MovieCard";
import ContentWrapper from "@/components/ContentWrapper";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
    updateCurrentPage,
    updateSearchedMovies,
} from "@/store/UI/searchedMoviesSlice";
import { Result } from "@/service/models";
import "./style.scss";

interface SearchResults {
    page: number;
    total_results: number;
    total_pages: number;
    results: Result[];
}

const SearchResultsPage: React.FunctionComponent = () => {
    const [searchParams] = useSearchParams();
    const searchedQuery = searchParams.get("q");
    const dispatch = useAppDispatch();
    const { loading, searchResults, currentPage } = useAppSelector(
        (state) => state.searchedMovies
    );

    const FetchNextData = () => {
        useGetSearchResults(currentPage, searchedQuery)
            .then((res) => {
                return res.json();
            })
            .then((newData: SearchResults) => {
                dispatch(updateSearchedMovies(newData));
                dispatch(updateCurrentPage());
            });
    };

    // const FetchInitialData = () => {
    //     dispatch(updateLoadingState({ loading: true }));

    //     useGetSearchResults(currentPage, searchedQuery)
    //         .then((res) => {
    //             return res.json();
    //         })
    //         .then((data: SearchResults) => {
    //             dispatch(updateSearchedMovies(data));
    //             dispatch(updateLoadingState({ loading: false }));
    //         });
    // };

    useEffect(() => {
        console.log("Inside useEffect");
        FetchNextData();
    }, [searchedQuery]);

    return (
        <div className="searchResultsPage">
            {loading && <Spinner initial={true} />}

            {!loading && (
                <ContentWrapper>
                    {searchResults.results.length > 0 ? (
                        <>
                            <div className="pageTitle">{`Search ${
                                searchResults.results.length > 1
                                    ? "results"
                                    : "result"
                            } of ${searchedQuery}`}</div>

                            <InfiniteScroll
                                className="content"
                                next={FetchNextData}
                                hasMore={
                                    currentPage <= searchResults.total_pages
                                }
                                loader={<Spinner />}
                                dataLength={searchResults.results.length}
                            >
                                {searchResults.results.map((item, index) => (
                                    <MovieCard
                                        data={item}
                                        mediaType=""
                                        fromSearch={true}
                                        key={index}
                                    />
                                ))}
                            </InfiniteScroll>
                        </>
                    ) : (
                        <span className="resultNotFound">
                            Sorry, Results not found!
                        </span>
                    )}
                </ContentWrapper>
            )}
        </div>
    );
};

export default SearchResultsPage;
