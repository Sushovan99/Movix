import React from "react";
import { useAppSelector } from "@/store/hooks";
import "./style.scss";

interface Props {
    genreIDs: number[] | undefined;
}

const Genres: React.FunctionComponent<Props> = ({ genreIDs }) => {
    const { genre } = useAppSelector((state) => state.genres);

    return (
        <div className="genres">
            {genreIDs?.map((g) => (
                <div className="genre" key={g}>
                    {genre[g] || "no-genre"}
                </div>
            ))}
        </div>
    );
};

export default Genres;
