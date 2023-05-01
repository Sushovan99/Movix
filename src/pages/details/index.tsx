import React from "react";
import { useParams } from "react-router-dom";
import DetailsBanner from "./sections/DetailsBanner";
import Cast from "./sections/Cast";
import VideoSection from "./sections/Videos";
import { useGetCreditsQuery } from "@/store/apiSlices/getCredits";
import { useGetVideosQuery } from "@/store/apiSlices/getVideos";
import "./style.scss";

const DetailsPage: React.FunctionComponent = () => {
    const { mediaType, id } = useParams();
    const { data: creditsData, isSuccess } = useGetCreditsQuery({
        mediaType,
        mediaID: id,
    });

    const { data: videoData, isSuccess: isLoadingSuccess } = useGetVideosQuery({
        mediaType,
        mediaID: id,
    });

    console.log(videoData);

    return (
        <React.Fragment>
            <DetailsBanner
                video={videoData?.results[0]}
                crew={creditsData?.crew}
            />
            <Cast data={creditsData?.cast} isSuccess={isSuccess} />
            <VideoSection isSuccess={isLoadingSuccess} data={videoData} />
        </React.Fragment>
    );
};

export default DetailsPage;
