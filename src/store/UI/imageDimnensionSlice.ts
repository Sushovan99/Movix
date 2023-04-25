import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Dimensions {
    base_url: string;
    backdrop_sizes: {
        300: string;
        780: string;
        1280: string;
        original: string;
    };
    logo_sizes: {
        45: string;
        92: string;
        154: string;
        185: string;
        300: string;
        500: string;
        original: string;
    };
    poster_sizes: {
        92: string;
        154: string;
        185: string;
        342: string;
        500: string;
        780: string;
        original: string;
    };
    profile_sizes: {
        45: string;
        185: string;
        h632: string;
        original: string;
    };
    still_sizes: {
        92: string;
        185: string;
        300: string;
        original: string;
    };
    completeURL: string;
}

const initialState: Dimensions = {
    base_url: "https://image.tmdb.org/t/p/",
    backdrop_sizes: {
        "300": "w300",
        "780": "w780",
        "1280": "w1280",
        original: "original",
    },
    logo_sizes: {
        "45": "w45",
        "92": "w92",
        "154": "w154",
        "185": "w185",
        "300": "w300",
        "500": "w500",
        original: "original",
    },
    poster_sizes: {
        "92": "w92",
        "154": "w154",
        "185": "w92",
        "342": "w342",
        "500": "w500",
        "780": "w780",
        original: "original",
    },
    profile_sizes: {
        "45": "w45",
        "185": "w185",
        h632: "h632",
        original: "original",
    },
    still_sizes: {
        "92": "w92",
        "185": "w185",
        "300": "w300",
        original: "original",
    },
    completeURL: "",
};

interface PayloadType {
    dimension: string;
    file_path: string;
}

const imgDimensionsSlice = createSlice({
    name: "imageDimensions",
    initialState,
    reducers: {
        getImageURL(state, action: PayloadAction<PayloadType>) {
            const { dimension, file_path } = action.payload;
            state.completeURL = state.base_url + dimension + file_path;
        },
    },
});

export const { getImageURL } = imgDimensionsSlice.actions;

export default imgDimensionsSlice.reducer;
