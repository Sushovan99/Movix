import { ReactElement, useEffect, useState } from "react";
import { fetchData } from "./utils/api";
import "./App.scss";

function App(): ReactElement {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        const fetchLastestMovies = async () => {
            const data = await fetchData("/movie/popular");
            setMovies(data);
            console.log("movies", data);
        };
        fetchLastestMovies();
    }, []);
    return <code style={{ color: "white" }}>{JSON.stringify(movies)}</code>;
}

export default App;
