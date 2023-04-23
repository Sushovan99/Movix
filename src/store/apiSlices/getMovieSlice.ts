import { movixApiSlice } from "../../service/api";

interface Result {
    id: number;
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

interface Movie {
    page: number;
    total_pages: number;
    results: Result[];
    total_results: number;
}

export const extendedGetMovieSlice = movixApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMovies: builder.query<Movie, void>({
            query: () => "/movie/popular",
        }),
    }),
});

export const { useGetMoviesQuery } = extendedGetMovieSlice;
