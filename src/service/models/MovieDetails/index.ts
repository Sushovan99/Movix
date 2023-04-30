interface Genre {
    id: number;
    name: string;
}

interface ProductionCompanies {
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
}

interface ProductionCountries {
    iso_3166_1: string;
    name: string;
}

interface SpokenLanguages {
    iso_639_1: string;
    name: string;
}

export interface MovieDetails {
    id: number;
    adult: boolean;
    backdrop_path: string | null;
    belongs_to_collection: null | object;
    budget: number;
    genres: Genre[];
    homepage: string | null;
    imdb_id: string | null;
    original_language: string;
    original_title: string;
    overview: string | null;
    popularity: number;
    poster_path: string | null;
    release_date: string;
    revenue: number | null;
    runtime: number | null;
    status: string;
    tagline: string | null;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    production_companies: ProductionCompanies[];
    production_countries: ProductionCountries[];
    spoken_languages: SpokenLanguages[];
}

interface CreatedBy {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string | null;
}

interface LastEpisodeToAir {
    id: number;
    air_date: string;
    episode_number: number;
    name: string;
    overview: string;
    production_code: string;
    season_number: number;
    still_path: string | null;
    vote_average: number;
    vote_count: number;
}

interface Networks {
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
}

interface ProductionCompanies {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
}

interface ProductionCountries {
    iso_3166_1: string;
    name: string;
}

interface SpokenLanguagesTV {
    english_name: string;
    iso_639_1: string;
    name: string;
}
export interface TVDetails {
    id: number;
    backdrop_path: string | null;
    created_by: CreatedBy[];
    episode_run_time: number[];
    first_air_date: string;
    genres: Genre[];
    homepage: string;
    in_production: boolean;
    languages: string[];
    last_air_date: string;
    last_episode_to_air: LastEpisodeToAir;
    name: string;
    next_episode_to_air: string;
    networks: Networks;
    number_of_episodes: number;
    number_of_seasons: number;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    production_companies: ProductionCompanies[];
    production_countries: ProductionCountries[];
    spoken_languages: SpokenLanguagesTV[];
    status: string;
    tagline: string;
    type: string;
    vote_average: number;
    vote_count: number;
}
