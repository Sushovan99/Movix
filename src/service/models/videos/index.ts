export interface VideoResults {
    id: string;
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
}

export interface Video {
    id: number;
    results: VideoResults[];
}
