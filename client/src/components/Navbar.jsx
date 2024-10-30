import React, { useState } from "react";
import { FaRegStickyNote } from "react-icons/fa"; // Importing Note Icon
import SearchBar from "./SearchBar/SearchBar";
import ProfileInfo from "./Cards/ProfileInfo";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  signInSuccess,
  signoutFailure,
  signoutStart,
} from "../redux/user/userSlice";
import axios from "axios";

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isNavbarExpanded, setIsNavbarExpanded] = useState(false); // State to track navbar toggle

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  const onLogout = async () => {
    try {
      dispatch(signoutStart());

      const res = await axios.get("https://api-note-app.vercel.app/api/auth/signout", {
        withCredentials: true,
      });

      if (res.data.success === false) {
        dispatch(signoutFailure(res.data.message));
        toast.error(res.data.message);
        return;
      }

      toast.success(res.data.message);
      dispatch(signInSuccess());
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
      dispatch(signoutFailure(error.message));
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <h2 className="text-xl font-medium text-black">
          
            <span className=" text-primary">Note</span>
            <span className="text-danger">Book</span>
          </h2>
        </Link>

        {/* Toggle button for small screens */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsNavbarExpanded(!isNavbarExpanded)}
          aria-controls="navbarNav"
          aria-expanded={isNavbarExpanded}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isNavbarExpanded ? 'show' : ''}`} id="navbarNav">
          <div className="d-flex flex-grow-1">
            <SearchBar
              value={searchQuery}
              onChange={({ target }) => setSearchQuery(target.value)}
              handleSearch={handleSearch}
              onClearSearch={onClearSearch}
              className="me-2" // Added Bootstrap margin for spacing
            />
          </div>
          <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
