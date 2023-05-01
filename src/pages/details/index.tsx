import React from "react";
import { useParams } from "react-router-dom";
import DetailsBanner from "./sections/DetailsBanner";
import { useGetCreditsQuery } from "@/store/apiSlices/getCredits";
import { useGetVideosQuery } from "@/store/apiSlices/getVideos";
import "./style.scss";

const DetailsPage: React.FunctionComponent = () => {
    const { mediaType, id } = useParams();
    const { data: creditsData } = useGetCreditsQuery({
        mediaType,
        mediaID: id,
    });

    const { data: videoData } = useGetVideosQuery({
        mediaType,
        mediaID: id,
    });

    return (
        <div>
            <DetailsBanner
                video={videoData?.results[0]}
                crew={creditsData?.crew}
            />
        </div>
    );
};

export default DetailsPage;
