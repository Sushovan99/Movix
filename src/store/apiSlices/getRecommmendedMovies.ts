import { movixApiSlice } from "@/service/api";
import { Result } from "@/service/models";

interface Recommended {
    total_pages: number;
    total_results: number;
    results: Result[];
    page: number;
}

interface QueryProps {
    mediaType: string | undefined;
    mediaID: string | undefined;
}

const extendGetRecomendedMoviesSlice = movixApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getRecommendedMovies: builder.query<Recommended, QueryProps>({
            query: ({ mediaType, mediaID }) =>
                `/${mediaType}/${mediaID}/recommendations`,
            providesTags: ["recommended"],
        }),
    }),
});

export const { useGetRecommendedMoviesQuery } = extendGetRecomendedMoviesSlice;
