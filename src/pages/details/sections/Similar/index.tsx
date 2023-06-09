import React, { useRef } from "react";
import Carousel from "@/components/Carousel";
import { useGetSimilarMoviesQuery } from "@/store/apiSlices/getSimilarMovies";

interface Props {
    mediaType: string | undefined;
    mediaID: string | undefined;
}

const Similar: React.FunctionComponent<Props> = ({ mediaID, mediaType }) => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const { data, isSuccess } = useGetSimilarMoviesQuery({
        mediaType,
        mediaID,
    });

    const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";

    if (data?.results.length === 0) {
        return null;
    }

    return (
        <Carousel
            results={data?.results}
            isSuccess={isSuccess}
            carouselRef={carouselRef}
            title={title}
            mediaType={mediaType}
        />
    );
};

export default Similar;
