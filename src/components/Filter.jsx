import React, { useState } from "react";
import { filterPlaces } from "../api";

const Filter = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    country: "",
    region: "",
    type: "",
  });

  const handleFilter = async () => {
    const data = await filterPlaces(filters);
    onFilter(data);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Pays"
        value={filters.country}
        onChange={(e) => setFilters({ ...filters, country: e.target.value })}
      />
      <input
        type="text"
        placeholder="Région"
        value={filters.region}
        onChange={(e) => setFilters({ ...filters, region: e.target.value })}
      />
      <input
        type="text"
        placeholder="Type"
        value={filters.type}
        onChange={(e) => setFilters({ ...filters, type: e.target.value })}
      />
      <button onClick={handleFilter}>Filtrer</button>
    </div>
  );
};

export default Filter;
