import { useEffect } from "react";
import { Location } from "react-router-dom";

export const useScrollToTop = (location: Location): void => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
        });
    }, [location]);
};
