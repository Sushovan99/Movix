import React, { useState } from "react";
import ContentWrapper from "@/components/ContentWrapper";
import { PlayIcon } from "@/components/Icon";
import Img from "@/components/LazyLoadImage";
import VideoPopup from "@/components/VideoPopup";
import { Video as VideoModel } from "@/service/models";
import "./style.scss";

interface Props {
    isSuccess: boolean;
    data: VideoModel | undefined;
}

const LoadingSkeleton: React.FunctionComponent = () => {
    return (
        <div className="skItem">
            <div className="thumb skeleton"></div>
            <div className="row skeleton"></div>
            <div className="row2 skeleton"></div>
        </div>
    );
};

const VideoSection: React.FunctionComponent<Props> = ({ isSuccess, data }) => {
    const [show, setShow] = useState(false);
    const [videoID, setVideoID] = useState<string | null>(null);

    return (
        <div className="videosSection">
            <ContentWrapper>
                <div className="sectionHeading">Official Videos</div>
                {isSuccess ? (
                    <div className="videos">
                        {data?.results.map((video) => (
                            <div
                                key={video.id}
                                className="videoItem"
                                onClick={() => {
                                    setVideoID(video.key);
                                    setShow(true);
                                }}
                            >
                                <div className="videoThumbnail">
                                    <Img
                                        src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                                    />
                                    <PlayIcon />
                                </div>
                                <div className="videoTitle">{video.name}</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="videoSkeleton">
                        {<LoadingSkeleton />}
                        {<LoadingSkeleton />}
                        {<LoadingSkeleton />}
                        {<LoadingSkeleton />}
                    </div>
                )}
            </ContentWrapper>
            <VideoPopup
                show={show}
                setShow={setShow}
                videoID={videoID}
                setVideoID={setVideoID}
            />
        </div>
    );
};

export default VideoSection;
