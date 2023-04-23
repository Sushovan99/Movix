import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { movixApiSlice } from "../service/api";

export const store = configureStore({
    reducer: {
        [movixApiSlice.reducerPath]: movixApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(movixApiSlice.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
