import { movixApiSlice } from "@/service/api";
import { Result } from "@/service/models";

const BASE_URL: string = import.meta.env["VITE_APP_TMDB_BASE_URL"];
const TOKEN: string = import.meta.env["VITE_APP_TMDB_TOKEN"];
interface SearchResults {
    page: number;
    total_results: number;
    total_pages: number;
    results: Result[];
}

interface QueryProps {
    query: string | null;
    pageNum: string | number;
}

const extendGetSearchResultsSlice = movixApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSearchResults: builder.query<SearchResults, QueryProps>({
            query: ({ query, pageNum }) =>
                `/search/multi?query=${query}&page=${pageNum}`,
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName;
            },
            merge: (currentCache, newItems) => {
                return {
                    ...currentCache,
                    results: [...currentCache.results, ...newItems.results],
                };
            },
            forceRefetch({ currentArg, previousArg }) {
                return (
                    currentArg?.query !== previousArg?.query ||
                    currentArg?.pageNum !== previousArg?.pageNum
                );
            },
            providesTags: (result) => {
                return result?.results
                    ? [
                          // Provides a tag for each post in the current page,
                          // as well as the 'PARTIAL-LIST' tag.
                          ...result.results.map(({ id }) => ({
                              type: "search" as const,
                              id,
                          })),
                          { type: "search", id: "PARTIAL-LIST" },
                      ]
                    : [{ type: "search", id: "PARTIAL-LIST" }];
            },
        }),
    }),
});

export const { useGetSearchResultsQuery } = extendGetSearchResultsSlice;

export const useGetSearchResults = (
    page: number,
    query: string | null
): Promise<Response> =>
    fetch(BASE_URL + `/search/multi?query=${query}&page=${page}`, {
        headers: {
            Authorization: "bearer " + TOKEN,
        },
    });
