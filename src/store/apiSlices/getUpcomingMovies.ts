import { movixApiSlice } from "@/service/api";
import { Result } from "@/service/models";

interface UpcomingMovies {
    page: number;
    total_pages: number;
    results: Result[];
    total_results: number;
    dates: {
        maximum: string;
        minimum: string;
    };
}

const getUpcomingMoviesSlice = movixApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUpcomingMovies: builder.query<UpcomingMovies, void>({
            query: () => "/movie/upcoming",
            providesTags: ["upcoming"],
        }),
    }),
});

export const { useGetUpcomingMoviesQuery } = getUpcomingMoviesSlice;
