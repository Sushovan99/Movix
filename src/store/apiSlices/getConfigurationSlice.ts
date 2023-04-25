import { movixApiSlice } from "@/service/api";

interface Images {
    base_url: string;
    secure_base_url: string;
    backdrop_sizes: string[];
    logo_sizes: string[];
    poster_sizes: string[];
    profile_sizes: string[];
    still_sizes: string[];
}

interface Config {
    images: Images;
    change_keys: string[];
}

export const extendedGetConfigurationSlice = movixApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getConfig: builder.query<Config, void>({
            query: () => "/configuration",
        }),
    }),
});

export const { useGetConfigQuery } = extendedGetConfigurationSlice;
