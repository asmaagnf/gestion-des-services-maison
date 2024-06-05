import React, { useState } from 'react';
import { HiLocationMarker } from 'react-icons/hi';
import { IoMdSearch } from "react-icons/io";

const SearchBar = ({ onSearch }) => {
  const [titleFilter, setTitleFilter] = useState('');
  const [addressFilter, setAddressFilter] = useState('');

  const handleSearch = () => {
    onSearch(titleFilter, addressFilter);
  };

  return (
    <div className="flexCenter search-bar">
      <IoMdSearch   color="var(--blue)" size={50} />
      <input
        placeholder="Recherche par titre"
        type="text"
        value={titleFilter}
        onChange={(e) => setTitleFilter(e.target.value)}
      />
      <HiLocationMarker color="var(--blue)" size={50} />
      <input
        placeholder="Recherche par adresse"
        type="text"
        value={addressFilter}
        onChange={(e) => setAddressFilter(e.target.value)}
      />
      <button className="button" onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
