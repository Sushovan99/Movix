import { movixApiSlice } from "@/service/api";
import { MovieDetails, TVDetails } from "@/service/models";

interface QueryProps {
    mediaType: string | undefined;
    mediaID: number;
}

type Reponse = MovieDetails & TVDetails;

const extendedMovieDetailsSlice = movixApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMovieDetails: builder.query<Reponse, QueryProps>({
            query: ({ mediaType, mediaID }) => `/${mediaType}/${mediaID}`,
        }),
    }),
});

export const { useGetMovieDetailsQuery } = extendedMovieDetailsSlice;
