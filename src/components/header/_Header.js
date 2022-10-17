import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useNavigate, Link } from 'react-router-dom';
// import { LogoutButton } from "../authentication";
import { verifyToken } from "../../store/reducers/authSlice";
import { Sidebar, ShowSidebar, SearchBar } from "./";
import { Link } from "react-router-dom";

const Header = () => {
    const token = localStorage.getItem("token");
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    // Allows user to stay logged if they have a token in localStorage
    if (!user?.firstName && token) {
        dispatch(verifyToken(token));
    }

    const [sidebarVisibility, setSidebarVisibility] = useState(false);
    
    return(
        <div id="header-container">
            <div className="header-button-title">
                <ShowSidebar set={setSidebarVisibility} visible={sidebarVisibility} />
                <Link id="header-title" to="/">Book Beasts</Link>
            </div>
            <SearchBar />
            <Sidebar visible={sidebarVisibility} set={setSidebarVisibility} />
        </div>
    )
}

export default Header;
