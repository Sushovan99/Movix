import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import Img from "../LazyLoadImage";
import ContentWrapper from "../ContentWrapper";
import { Result } from "@/service/models";
import { useAppSelector } from "@/store/hooks";
import CircleRating from "../CircleRating";
import Genres from "../Genres";
import PosterFallback from "@/assets/no-poster.png";
import "./style.scss";

interface Props {
    results: Result[] | undefined;
    isSuccess: boolean;
}

const Skeleton: React.FunctionComponent = () => {
    return (
        <div className="skeletonItem">
            <div className="posterBlock skeleton"></div>
            <div className="textBlock">
                <div className="title skeleton"></div>
                <div className="date skeleton"></div>
            </div>
        </div>
    );
};

const Carousel: React.FunctionComponent<Props> = ({ results, isSuccess }) => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const Navigate = useNavigate();
    const { base_url, poster_sizes } = useAppSelector(
        (state) => state.dimensions
    );

    const scrollHandler = (direction: "left" | "right"): void => {
        const container = carouselRef.current;
        let scrollAmount = 0;
        if (container) {
            if (direction === "left") {
                scrollAmount =
                    container.scrollLeft - (container.offsetWidth + 20);
            } else {
                scrollAmount =
                    container.scrollLeft + (container.offsetWidth + 20);
            }
        }

        container?.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });
    };

    return (
        <div className="carousel">
            <ContentWrapper>
                <BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow"
                    onClick={() => scrollHandler("left")}
                />
                <BsFillArrowRightCircleFill
                    className="carouselRighttNav arrow"
                    onClick={() => scrollHandler("right")}
                />
                {isSuccess ? (
                    <div className="carouselItems" ref={carouselRef}>
                        {results?.map((item) => {
                            const url =
                                base_url + poster_sizes[500] + item.poster_path;
                            return (
                                <div
                                    className="carouselItem"
                                    key={item.id}
                                    onClick={() =>
                                        Navigate(
                                            `${item.media_type}/${item.id}`
                                        )
                                    }
                                >
                                    <div className="posterBlock">
                                        <Img
                                            src={url ? url : PosterFallback}
                                            alt={item.title}
                                        />
                                        <CircleRating
                                            rating={item.vote_average}
                                        />
                                        <Genres genreIDs={item.genre_ids} />
                                    </div>
                                    <div className="textBlock">
                                        <span className="title">
                                            {item.title || item.name}
                                        </span>
                                        <span className="date">
                                            {dayjs(item.release_date).format(
                                                "MMM DD YYYY"
                                            )}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="loadingSkeleton">
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Carousel;
