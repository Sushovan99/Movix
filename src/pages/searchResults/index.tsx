import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "@/components/Spinner";
import { useGetSearchResultsQuery } from "@/store/apiSlices/getSearchResults";
import MovieCard from "@/components/MovieCard";
import ContentWrapper from "@/components/ContentWrapper";
import "./style.scss";

const SearchResultsPage: React.FunctionComponent = () => {
    const [searchParams] = useSearchParams();
    const searchedQuery = searchParams.get("q");
    const [page, setPage] = useState(1);

    const { currentData, isSuccess, isLoading, refetch } =
        useGetSearchResultsQuery({
            pageNum: page,
            query: searchedQuery,
        });

    const fetchMore = () => {
        setPage((prev) => prev + 1);
        refetch();
    };

    useEffect(() => {
        setPage((prev) => prev + 1);
        refetch();
    }, [searchedQuery, refetch]);

    return (
        <div className="searchResultsPage">
            {isLoading && <Spinner initial={true} />}

            {isSuccess && (
                <ContentWrapper>
                    {currentData && currentData.results.length > 0 ? (
                        <>
                            <div className="pageTitle">{`Search ${
                                currentData.results.length > 1
                                    ? "results"
                                    : "result"
                            } of ${searchedQuery}`}</div>

                            <InfiniteScroll
                                className="content"
                                next={fetchMore}
                                hasMore={page <= currentData.total_pages}
                                loader={<Spinner />}
                                dataLength={currentData.results.length}
                            >
                                {currentData.results.map((item, index) => (
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
