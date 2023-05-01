import { movixApiSlice } from "@/service/api";
import { Credits } from "@/service/models";

interface QueryProps {
    mediaType: string | undefined;
    mediaID: string | undefined;
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
