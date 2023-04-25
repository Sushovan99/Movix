import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.scss";
import HomePage from "./pages/home";
import DetailsPage from "./pages/details";
import NotFoundPage from "./pages/404";
import ExplorePage from "./pages/explore";
import SearchResultsPage from "./pages/searchResults";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App: React.FunctionComponent = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/:mediaType/:id" element={<DetailsPage />} />
                <Route path="/search/:query" element={<SearchResultsPage />} />
                <Route path="/explore/:mediaType" element={<ExplorePage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
