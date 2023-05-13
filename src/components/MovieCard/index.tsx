import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import Img from "../LazyLoadImage";
import CircleRating from "../CircleRating";
import Genres from "../Genres";
import PosterFallback from "@/assets/no-poster.png";
import { Result } from "@/service/models";

import "./style.scss";

interface Props {
    data: Result;
    mediaType: string | undefined;
    fromSearch?: boolean;
}

const MovieCard: React.FunctionComponent<Props> = ({
    data,
    mediaType,
    fromSearch,
}) => {
    const Navigate = useNavigate();
    const { base_url, poster_sizes } = useAppSelector(
        (state) => state.dimensions
    );

    const posterUrl = base_url + poster_sizes[500] + data.poster_path;

    return (
        <div
            className="movieCard"
            onClick={() =>
                Navigate(`/${data.media_type || mediaType}/${data.id}`)
            }
        >
            <div className="posterBlock">
                <Img
                    className="posterImg"
                    src={data.poster_path ? posterUrl : PosterFallback}
                />
                {!fromSearch && (
                    <React.Fragment>
                        <CircleRating rating={data.vote_average} />
                        <Genres genreIDs={data.genre_ids.slice(0, 2)} />
                    </React.Fragment>
                )}
            </div>
            <div className="textBlock">
                <span className="title">{data.title || data.name}</span>
                <span className="date">
                    {dayjs(data.release_date).format("MMM D, YYYY")}
                </span>
            </div>
        </div>
    );
};

export default MovieCard;
