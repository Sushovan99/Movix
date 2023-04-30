import { movixApiSlice } from "@/service/api";

interface Genre {
    id: number;
    name: string;
}

interface AllGenres {
    genres: Genre[];
}

const extendGetMovieGenre = movixApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getGenres: builder.query<AllGenres, string>({
            query: (mediaType: string) => `/genre/${mediaType}/list`,
        }),
    }),
});

export const { useGetGenresQuery } = extendGetMovieGenre;
