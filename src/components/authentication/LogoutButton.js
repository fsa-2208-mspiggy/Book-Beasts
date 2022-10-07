import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/reducers/authSlice";
// import { Link } from 'react-router-dom';

export default function LogoutButton({ text }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleLogout = () => {
        dispatch(logout());
        alert("Successfully logged out");
        navigate("/");
    }

    if (text) {
        return(
            <p onClick={handleLogout} className="link">Logout</p>
        );
    } else {
        return(
            <button onClick={handleLogout}>Logout</button>
        );
    }
}
