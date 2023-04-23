import { ReactElement } from "react";
// import { fetchData } from "./utils/api";
import { useGetMoviesQuery } from "./store/apiSlices/getMovieSlice";
import "./App.scss";

function App(): ReactElement {
    const {
        isFetching,
        isLoading,
        isError,
        data: movies,
    } = useGetMoviesQuery();
    if (isLoading && isFetching) {
        return <h2>Loading...</h2>;
    } else if (isError) {
        return <h2>Error...</h2>;
    }

    console.log("movies", movies);

    return <code style={{ color: "white" }}>{JSON.stringify(movies)}</code>;
}

export default App;
