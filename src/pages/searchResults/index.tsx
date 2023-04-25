import React from "react";
import { useSearchParams } from "react-router-dom";
import "./style.scss";

const SearchResultsPage: React.FunctionComponent = () => {
    const [searchParams] = useSearchParams();
    const searchedQuery = searchParams.get("q");
    return (
        <div>
            SearchResultsPage
            <h2>{searchedQuery}</h2>
        </div>
    );
};

export default SearchResultsPage;
