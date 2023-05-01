import { movixApiSlice } from "@/service/api";
import { Credits } from "@/service/models";

interface QueryProps {
    mediaType: string;
    mediaID: string | number;
}

const extendedGetCreditsSlice = movixApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCredits: builder.query<Credits, QueryProps>({
            query: ({ mediaType, mediaID }) =>
                `/${mediaType}/${mediaID}/credits`,
        }),
    }),
});

export const { useGetCreditsQuery } = extendedGetCreditsSlice;
