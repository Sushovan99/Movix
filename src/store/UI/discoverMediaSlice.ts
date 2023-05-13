import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Result } from "@/service/models";

interface QueryResults {
    page: number;
    total_results: number;
    total_pages: number;
    results: Result[];
}

interface InitialState {
    currentPage: number;
    loading: boolean;
    searchResults: QueryResults;
}

const initialState: InitialState = {
    currentPage: 1,
    loading: true,
    searchResults: {
        page: 0,
        total_pages: 0,
        total_results: 0,
        results: [],
    },
};

const discoverMediaSlice = createSlice({
    name: "discoverMedia",
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

        updateDiscoveredMedia(state, action: PayloadAction<QueryResults>) {
            state.searchResults = {
                ...action.payload,
                results: [
                    ...state.searchResults.results,
                    ...action.payload.results,
                ],
            };
        },

        updateLoadingState(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
    },
});

export default discoverMediaSlice.reducer;

export const {
    resetCurrentPage,
    updateCurrentPage,
    updateDiscoveredMedia,
    updateLoadingState,
} = discoverMediaSlice.actions;
