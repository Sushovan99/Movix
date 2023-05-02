import { movixApiSlice } from "@/service/api";
import { Result } from "@/service/models";

interface SimilarMovies {
    page: number;
    results: Result[];
    total_pages: number;
    total_results: number;
}

interface QueryProps {
    mediaType: string | undefined;
    mediaID: string | undefined;
}

const extendedGetSimilarMoviesSlice = movixApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSimilarMovies: builder.query<SimilarMovies, QueryProps>({
            query: ({ mediaType, mediaID }) =>
                `/${mediaType}/${mediaID}/similar`,
            providesTags: ["similar"],
        }),
    }),
});

export const { useGetSimilarMoviesQuery } = extendedGetSimilarMoviesSlice;
