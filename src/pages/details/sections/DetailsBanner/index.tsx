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
import "./style.scss";

const DetailsBanner: React.FunctionComponent = () => {
    const { base_url, backdrop_sizes, poster_sizes } = useAppSelector(
        (state) => state.dimensions
    );
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

                                    <div className="playbtn">
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
                            </div>
                        </div>
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
