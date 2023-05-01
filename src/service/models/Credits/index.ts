interface Cast {
    id: number;
    adult: boolean;
    gender: number | null;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
}

interface Crew {
    id: number;
    adult: boolean;
    gender: number | null;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
    credit_id: string;
    department: string;
    job: string;
}

export interface Credits {
    id: number;
    cast: Cast[];
    crew: Crew[];
}
