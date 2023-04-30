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
        getPopularMovies: builder.query<Movie, string>({
            query: (mediaType: string) => `/${mediaType}/popular`,
            providesTags: ["popular"],
        }),
    }),
});

export const { useGetPopularMoviesQuery } = extendedGetMovieSlice;
