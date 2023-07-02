import React, { useState } from "react";
import { searchPlaces } from "../api";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async () => {
    const data = await searchPlaces(searchTerm);
    console.log("log du seaarchbar:" + searchTerm);
    onSearch(data);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Rechercher</button>
    </div>
  );
};

export default SearchBar;
