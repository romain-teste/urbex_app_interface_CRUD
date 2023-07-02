import React, { useEffect, useState } from "react";
import PlaceCard from "./PlaceCard";
import { getAllPlaces, photoPlace, filterPlaces } from "../api";
import SearchBar from "./SearchBar";
import Filter from "./Filter";
import TestPost from "./testPost.jsx";

const PlaceList = () => {
  const [places, setPlaces] = useState([]);
  const [photos, setPhoto] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      const data = await getAllPlaces();
      console.log(data);
      setPlaces(data);
    };
    // const fetchPhoto = async () => {
    //   const dataPhoto = await photoPlace();
    //   console.log(dataPhoto);
    //   setPhoto(dataPhoto);
    // };

    // fetchPhoto();
    fetchPlaces();
  }, []);

  const handleSearch = async (searchTerm) => {
    //const data = await searchPlaces(searchTerm);
    console.log("console og:" + searchTerm);
    setSearchResults(searchTerm);
  };

  const handleFilter = async (filters) => {
    setFilteredResults(filters);
  };

  const renderPlaces = () => {
    if (filteredResults.length > 0) {
      return filteredResults.map((place) => (
        <PlaceCard key={place.id} place={place} />
      ));
    } else if (searchResults.length > 0) {
      return searchResults.map((place) => (
        <PlaceCard key={place.id} place={place} />
      ));
    } else {
      return places.map((place) => <PlaceCard key={place.id} place={place} />);
    }
  };

  return (
    <div>
      {TestPost()}
      <SearchBar onSearch={handleSearch} />
      <Filter onFilter={handleFilter} />
      {renderPlaces()}
    </div>
  );
};

export default PlaceList;
