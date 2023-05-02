import React, { useRef } from "react";
import Carousel from "@/components/Carousel";
import { useGetRecommendedMoviesQuery } from "@/store/apiSlices/getRecommmendedMovies";

interface Props {
    mediaType: string | undefined;
    mediaID: string | undefined;
}

const Recommend: React.FunctionComponent<Props> = ({ mediaType, mediaID }) => {
    const carouselRef = useRef<HTMLDivElement>(null);

    const { data, isSuccess } = useGetRecommendedMoviesQuery({
        mediaType,
        mediaID,
    });

    return (
        <Carousel
            title="Recommendations"
            results={data?.results}
            isSuccess={isSuccess}
            carouselRef={carouselRef}
        />
    );
};

export default Recommend;
