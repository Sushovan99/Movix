import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN: string = import.meta.env["VITE_APP_TMDB_TOKEN"];

const headers = {
    Authorization: "bearer " + TMDB_TOKEN,
};

export const fetchData = async (endPoint: string, params?: string) => {
    try {
        const { data } = await axios.get(BASE_URL + endPoint, {
            headers,
            params,
        });
        return data;
    } catch (error) {
        console.error("error", error);
        return error;
    }
};
