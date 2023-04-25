import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL: string = import.meta.env["VITE_APP_TMDB_BASE_URL"];
const TOKEN: string = import.meta.env["VITE_APP_TMDB_TOKEN"];
const headers = {
    Authorization: "bearer " + TOKEN,
};

export const movixApiSlice = createApi({
    reducerPath: "movixApi",
    // refetchOnFocus: true,
    refetchOnReconnect: true,
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, headers }),
    tagTypes: ["upcoming", "popular"],
    endpoints: (builder) => ({}),
});
