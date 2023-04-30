import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/home";
import DetailsPage from "@/pages/details";
import NotFoundPage from "@/pages/404";
import ExplorePage from "@/pages/explore";
import SearchResultsPage from "@/pages/searchResults";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useGetGenresQuery } from "@/store/apiSlices/getGenres";
import { useAppDispatch } from "@/store/hooks";
import { storeGenres } from "@/store/UI/genresSlice";
import "@/App.scss";

interface AllGenres {
    [id: number]: string;
}

const App: React.FunctionComponent = () => {
    const dispatch = useAppDispatch();

    const useGetAllGenres = async () => {
        const allGenres: AllGenres = {};
        const { data: movieGenres } = useGetGenresQuery("movie");
        const { data: tvGenres } = useGetGenresQuery("tv");

        const promises = Promise.all([movieGenres, tvGenres]);
        const [first, second] = await promises;
        first?.genres.map((item) => {
            allGenres[item.id] = item.name;
        });

        second?.genres.map((item) => {
            allGenres[item.id] = item.name;
        });

        dispatch(storeGenres(allGenres));
    };

    useGetAllGenres();

    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/:mediaType/:id" element={<DetailsPage />} />
                <Route path="/search" element={<SearchResultsPage />} />
                <Route path="/explore/:mediaType" element={<ExplorePage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
