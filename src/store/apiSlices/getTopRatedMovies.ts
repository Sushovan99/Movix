import { movixApiSlice } from "@/service/api";
import { Result } from "@/service/models";
interface Movie {
    page: number;
    total_pages: number;
    results: Result[];
    total_results: number;
}

export const extendedGetTopRatedMoviesSlice = movixApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTopRatedMovies: builder.query<Movie, string>({
            query: (mediaType: string) => `/${mediaType}/top_rated`,
            providesTags: ["topRated"],
        }),
    }),
});

export const { useGetTopRatedMoviesQuery } = extendedGetTopRatedMoviesSlice;
