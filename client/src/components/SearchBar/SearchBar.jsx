import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="input-group w-100" style={{ maxWidth: '400px' }}>
      <input
        type="text"
        placeholder="Search Notes..."
        className="form-control"
        value={value}
        onChange={onChange}
      />

   

      <button
        className="btn btn-outline-primary btn-primary"
        onClick={handleSearch}
        type="button"
      >
        <FaMagnifyingGlass className="  text-white" />
      </button>
    </div>
  );
};

export default SearchBar;
