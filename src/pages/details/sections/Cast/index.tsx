import React from "react";
import ContentWrapper from "@/components/ContentWrapper";
import Img from "@/components/LazyLoadImage";
import avatar from "@/assets/avatar.png";
import { useAppSelector } from "@/store/hooks";
import { Cast as CastModel } from "@/service/models";
import "./style.scss";

interface Props {
    data: CastModel[] | undefined;
    isSuccess: boolean;
}

const Skeleton: React.FunctionComponent = () => {
    return (
        <div className="skItem">
            <div className="circle skeleton"></div>
            <div className="row skeleton"></div>
            <div className="row2 skeleton"></div>
        </div>
    );
};

const Cast: React.FunctionComponent<Props> = ({ data, isSuccess }) => {
    const { base_url, profile_sizes } = useAppSelector(
        (state) => state.dimensions
    );

    return (
        <div className="castSection">
            <ContentWrapper>
                <div className="sectionHeading">Top Cast</div>
                {isSuccess ? (
                    <div className="listItems">
                        {data?.map((item) => {
                            const profileImg = item.profile_path
                                ? base_url +
                                  profile_sizes.original +
                                  item.profile_path
                                : avatar;

                            return (
                                <div className="listItem" key={item.id}>
                                    <div className="profileImg">
                                        <Img src={profileImg} />
                                    </div>
                                    <div className="name">{item.name}</div>
                                    <div className="character">
                                        {item.character}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="castSkeleton">
                        {<Skeleton />}
                        {<Skeleton />}
                        {<Skeleton />}
                        {<Skeleton />}
                        {<Skeleton />}
                        {<Skeleton />}
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Cast;
