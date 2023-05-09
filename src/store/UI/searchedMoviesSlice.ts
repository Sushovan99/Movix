import { Result } from "@/service/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchResults {
    page: number;
    total_results: number;
    total_pages: number;
    results: Result[];
}

interface InitialState {
    currentPage: number;
    loading: boolean;
    searchResults: SearchResults;
}

const initialState: InitialState = {
    currentPage: 1,
    loading: false,
    searchResults: {
        page: 0,
        total_pages: 0,
        total_results: 0,
        results: [],
    },
};

const searchedMovieSlice = createSlice({
    name: "searchedMovies",
    initialState,
    reducers: {
        resetCurrentPage(state) {
            state.currentPage = 1;
            state.searchResults = {
                page: 0,
                total_pages: 0,
                total_results: 0,
                results: [],
            };
        },
        updateCurrentPage(state) {
            state.currentPage += 1;
        },
        updateSearchedMovies(state, action: PayloadAction<SearchResults>) {
            state.searchResults = {
                ...action.payload,
                results: [
                    ...state.searchResults.results,
                    ...action.payload.results,
                ],
            };
        },
    },
});

export const { resetCurrentPage, updateCurrentPage, updateSearchedMovies } =
    searchedMovieSlice.actions;

export default searchedMovieSlice.reducer;
