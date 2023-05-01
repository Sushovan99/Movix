import { movixApiSlice } from "@/service/api";
import { Video } from "@/service/models";

interface QueryProps {
    mediaType: string | undefined;
    mediaID: string | undefined;
}

const extendedGetVideoSlice = movixApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getVideos: builder.query<Video, QueryProps>({
            query: ({ mediaType, mediaID }) =>
                `/${mediaType}/${mediaID}/videos`,
        }),
    }),
});

export const { useGetVideosQuery } = extendedGetVideoSlice;
