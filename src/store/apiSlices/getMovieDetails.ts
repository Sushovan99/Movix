import { movixApiSlice } from "@/service/api";
import { MovieDetails } from "@/service/models";

interface QueryProps {
    mediaType: string | undefined;
    mediaID: number;
}

const extendedMovieDetailsSlice = movixApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMovieDetails: builder.query<MovieDetails, QueryProps>({
            query: ({ mediaType, mediaID }) => `/${mediaType}/${mediaID}`,
        }),
    }),
});

export const { useGetMovieDetailsQuery } = extendedMovieDetailsSlice;
