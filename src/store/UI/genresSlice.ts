import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AllGenres {
    [id: number]: string;
}

interface InitialState {
    genre: AllGenres;
}

const initialState: InitialState = {
    genre: {},
};

export const genreSlice = createSlice({
    name: "genres",
    initialState,
    reducers: {
        storeGenres(state, action: PayloadAction<AllGenres>) {
            state.genre = { ...action.payload };
        },
    },
});

export const { storeGenres } = genreSlice.actions;

export default genreSlice.reducer;
