import { movixApiSlice } from "@/service/api";
import { Video } from "@/service/models";

interface QueryProps {
    mediaType: string;
    mediaID: string | number;
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
