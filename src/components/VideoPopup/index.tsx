import React from "react";
import ReactPlayer from "react-player/youtube";
import "./style.scss";

interface Props {
    show: boolean;
    videoID: string | number | null;
    setShow: (arg: boolean) => void;
    setVideoID: (arg: null) => void;
}

const VideoPopup: React.FunctionComponent<Props> = ({
    show,
    videoID,
    setShow,
    setVideoID,
}) => {
    const hidePopup = () => {
        setShow(false);
        setVideoID(null);
    };

    return (
        <div className={`videoPopup ${show ? "visible" : ""}`}>
            <div className="opacityLayer" onClick={hidePopup}></div>
            <div className="videoPlayer">
                <span className="closeBtn" onClick={hidePopup}>
                    Close
                </span>
                <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${videoID}`}
                    controls
                    width="100%"
                    height="100%"
                    // playing={true}
                />
            </div>
        </div>
    );
};

export default VideoPopup;
