import React from 'react';
import { HiLocationMarker } from 'react-icons/hi';
import { IoMdSearch } from "react-icons/io";

const SearchBar = ({ titleFilter, setTitleFilter, addressFilter, setAddressFilter }) => {
  
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
        placeholder="Adresse"
        type="text"
        value={addressFilter}
        onChange={(e) => setAddressFilter(e.target.value)}
      />
      <button className="button">Cherche</button>
    </div>
  );
};

export default SearchBar;