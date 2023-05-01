import React, { useState } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import ContentWrapper from "@/components/ContentWrapper";
import { useGetMovieDetailsQuery } from "@/store/apiSlices/getMovieDetails";
import { useAppSelector } from "@/store/hooks";
import Genres from "@/components/Genres";
import CircleRating from "@/components/CircleRating";
import { PlayIcon } from "@/components/Icon";
import Img from "@/components/LazyLoadImage";
import PosterFallback from "@/assets/no-poster.png";
import { Crew, VideoResults } from "@/service/models";
import VideoPopup from "@/components/VideoPopup";
import "./style.scss";

interface Props {
    video: VideoResults | undefined;
    crew: Crew[] | undefined;
}

const DetailsBanner: React.FunctionComponent<Props> = ({ video, crew }) => {
    const { base_url, backdrop_sizes, poster_sizes } = useAppSelector(
        (state) => state.dimensions
    );
    const [show, setShow] = useState(false);
    const [videoID, setVideoID] = useState<string | null>(null);

    const { id, mediaType } = useParams();

    const { data, isSuccess } = useGetMovieDetailsQuery({
        mediaID: Number(id),
        mediaType,
    });

    const genresIDs = data?.genres.map((item) => item.id);

    const toHoursAndMinutes = (totalMinutes: number) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    const director = crew?.filter((f) => f.job === "Director");
    const writer = crew?.filter(
        (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
    );

    return (
        <div className="detailsBanner">
            {isSuccess ? (
                <React.Fragment>
                    <div className="backdrop-img">
                        <Img
                            src={
                                base_url +
                                backdrop_sizes.original +
                                data.backdrop_path
                            }
                            alt={data.title || data.name}
                        />
                    </div>

                    <div className="opacity-layer"></div>

                    <ContentWrapper>
                        <div className="content">
                            <div className="left">
                                {data.poster_path ? (
                                    <Img
                                        className="posterImg"
                                        src={
                                            base_url +
                                            poster_sizes[500] +
                                            data.poster_path
                                        }
                                    />
                                ) : (
                                    <Img
                                        className="posterImg"
                                        src={PosterFallback}
                                    />
                                )}
                            </div>

                            <div className="right">
                                <div className="title">
                                    {`${data.title || data.name} (${dayjs(
                                        data.release_date
                                    ).format("YYYY")})`}
                                </div>

                                <div className="subtitle">{data.tagline}</div>

                                <Genres genreIDs={genresIDs} />

                                <div className="row">
                                    <CircleRating rating={data.vote_average} />

                                    <div
                                        className="playbtn"
                                        onClick={() => {
                                            setShow(true);
                                            setVideoID(
                                                video?.key ? video.key : null
                                            );
                                        }}
                                    >
                                        <PlayIcon />
                                        <span className="text">
                                            Watch trailer
                                        </span>
                                    </div>
                                </div>

                                <div className="overview">
                                    <div className="heading">Overview</div>

                                    <div className="description">
                                        {data.overview}
                                    </div>
                                </div>

                                <div className="info">
                                    <div className="infoItem">
                                        <span className="text bold">
                                            Status:{" "}
                                        </span>
                                        <span className="text">
                                            {data.status}
                                        </span>
                                    </div>

                                    <div className="infoItem">
                                        <span className="text bold">
                                            Release date:{" "}
                                        </span>
                                        <span className="text">
                                            {dayjs(data.release_date).format(
                                                "MMM DD, YYYY"
                                            )}
                                        </span>
                                    </div>

                                    {data.runtime ? (
                                        <div className="infoItem">
                                            <span className="text bold">
                                                Runtime:{" "}
                                            </span>
                                            <span className="text">
                                                {toHoursAndMinutes(
                                                    data.runtime
                                                )}
                                            </span>
                                        </div>
                                    ) : null}
                                </div>

                                {!!director?.length && (
                                    <div className="info">
                                        <span className="text bold">
                                            Director:{" "}
                                        </span>
                                        <span className="text">
                                            {director.map((d, i) => (
                                                <span key={i}>
                                                    {d.name}
                                                    {director.length - 1 !==
                                                        i && ", "}
                                                </span>
                                            ))}
                                        </span>
                                    </div>
                                )}

                                {!!writer?.length && (
                                    <div className="info">
                                        <span className="text bold">
                                            Writer:{" "}
                                        </span>
                                        <span className="text">
                                            {writer.map((w, i) => (
                                                <span key={i}>
                                                    {w.name}
                                                    {writer.length - 1 !== i &&
                                                        ", "}
                                                </span>
                                            ))}
                                        </span>
                                    </div>
                                )}

                                {!!data?.created_by?.length && (
                                    <div className="info">
                                        <span className="text bold">
                                            Creator:{" "}
                                        </span>
                                        <span className="text">
                                            {data?.created_by.map((w, i) => (
                                                <span key={i}>
                                                    {w.name || "no-data"}
                                                    {data?.created_by.length -
                                                        1 !==
                                                        i && ", "}
                                                </span>
                                            ))}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <VideoPopup
                            show={show}
                            videoID={videoID}
                            setShow={setShow}
                            setVideoID={setVideoID}
                        />
                    </ContentWrapper>
                </React.Fragment>
            ) : (
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    );
};

export default DetailsBanner;
