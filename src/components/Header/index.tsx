import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";
import ContentWrapper from "@/components/ContentWrapper";
import logo from "@/assets/movix-logo.svg";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import "./style.scss";

const Header: React.FunctionComponent = () => {
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const Navigate = useNavigate();
    const location = useLocation();

    useScrollToTop(location);

    const openMobileMenu = (): void => {
        setMobileMenu(true);
        setShowSearch(false);
    };

    const openSearch = (): void => {
        setMobileMenu(false);
        setShowSearch(true);
    };

    const searchQueryHandler = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && query.length > 0) {
            Navigate({
                pathname: "/search",
                search: `?q=${query}`,
            });
            setTimeout(() => {
                setShowSearch(false);
            }, 1000);
        }
    };

    const navigationHander = (type: string): void => {
        if (type === "movie") {
            Navigate("explore/movie");
            setMobileMenu(false);
        } else {
            Navigate("/explore/tv");
            setMobileMenu(false);
        }
    };

    // Header scrolling effect
    useEffect(() => {
        const controlNavbar = () => {
            if (window.scrollY > 200) {
                if (window.scrollY > lastScrollY && !mobileMenu) {
                    setShow("hide");
                } else {
                    setShow("show");
                }
            } else {
                setShow("top");
            }

            setLastScrollY(window.scrollY);
        };
        window.addEventListener("scroll", controlNavbar);
        return () => {
            window.removeEventListener("scroll", controlNavbar);
        };
    }, [lastScrollY, mobileMenu]);

    return (
        <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
            <ContentWrapper>
                <Link className="logo" to={"/"}>
                    <img src={logo} alt="brand-logo" />
                </Link>

                <ul className="menuItems">
                    <li
                        className="menuItem"
                        onClick={() => navigationHander("movie")}
                    >
                        Movies
                    </li>
                    <li
                        className="menuItem"
                        onClick={() => navigationHander("tv")}
                    >
                        TV shows
                    </li>
                    <li className="menuItem">
                        <HiOutlineSearch onClick={openSearch} />
                    </li>
                </ul>

                <div className="mobileMenuItems">
                    <HiOutlineSearch onClick={openSearch} />
                    {mobileMenu ? (
                        <VscChromeClose onClick={() => setMobileMenu(false)} />
                    ) : (
                        <SlMenu onClick={openMobileMenu} />
                    )}
                </div>
            </ContentWrapper>

            {showSearch ? (
                <div className="searchBar">
                    <ContentWrapper>
                        <div className="searchInput">
                            <input
                                type="text"
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyUp={searchQueryHandler}
                                placeholder="Search for a movie or a TV show..."
                            />
                            <VscChromeClose
                                onClick={() => setShowSearch(false)}
                            />
                        </div>
                    </ContentWrapper>
                </div>
            ) : null}
        </header>
    );
};

export default Header;
