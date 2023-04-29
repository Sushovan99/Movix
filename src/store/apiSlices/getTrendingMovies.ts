import { movixApiSlice } from "@/service/api";
import { Result } from "@/service/models";

interface queryProps {
    mediaType: string;
    timeWindow: string;
}

interface Movie {
    page: number;
    total_pages: number;
    results: Result[];
    total_results: number;
}

export const extendedGetTrendingMovieSlice = movixApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTrendingMovies: builder.query<Movie, queryProps>({
            query: ({ mediaType, timeWindow }: queryProps) =>
                `/trending/${mediaType}/${timeWindow}`,
            providesTags: ["trending"],
        }),
    }),
});

export const { useGetTrendingMoviesQuery } = extendedGetTrendingMovieSlice;
