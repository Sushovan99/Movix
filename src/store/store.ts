import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { movixApiSlice } from "../service/api";
import imageDimnensionSlice from "./UI/imageDimnensionSlice";
import searchedMoviesSlice from "./UI/searchedMoviesSlice";
import discoverMediaSlice from "./UI/discoverMediaSlice";
import genresSlice from "./UI/genresSlice";

export const store = configureStore({
    reducer: {
        [movixApiSlice.reducerPath]: movixApiSlice.reducer,
        dimensions: imageDimnensionSlice,
        genres: genresSlice,
        searchedMovies: searchedMoviesSlice,
        discoveredMedia: discoverMediaSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(movixApiSlice.middleware),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
