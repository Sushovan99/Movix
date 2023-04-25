import { movixApiSlice } from "@/service/api";
import { Result } from "@/service/models";
interface Movie {
    page: number;
    total_pages: number;
    results: Result[];
    total_results: number;
}

export const extendedGetMovieSlice = movixApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMovies: builder.query<Movie, void>({
            query: () => "/movie/popular",
            providesTags: ["popular"],
        }),
    }),
});

export const { useGetMoviesQuery } = extendedGetMovieSlice;
