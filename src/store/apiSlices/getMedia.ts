const BASE_URL: string = import.meta.env["VITE_APP_TMDB_BASE_URL"];
const TOKEN: string = import.meta.env["VITE_APP_TMDB_TOKEN"];

export const useGetMedia = (
    page: number,
    filter: object,
    mediaType: string | undefined
): Promise<Response> =>
    fetch(
        BASE_URL +
            `/discover/${mediaType}?&page=${page}&` +
            new URLSearchParams({ ...filter }),
        {
            headers: {
                Authorization: "bearer " + TOKEN,
            },
        }
    );
