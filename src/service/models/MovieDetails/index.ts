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
    genres: Genre;
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
    production_companies: ProductionCompanies;
    production_countries: ProductionCountries;
    spoken_languages: SpokenLanguages;
}
