import React from "react";

function SearchBar({ searchTerm, setSearchTerm }) {
    return (
        <input 
        type="text"
        placeholder="Search Pokemon by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        />
    );
}

export default SearchBar;