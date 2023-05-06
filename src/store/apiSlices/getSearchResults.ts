import { movixApiSlice } from "@/service/api";
import { Result } from "@/service/models";

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
                return currentArg?.query !== previousArg?.query;
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
