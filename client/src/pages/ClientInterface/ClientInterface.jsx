
import React from "react";
import Services from "../../components/Services/Services";
import Category from "../Category/CategoryHomeP";
import { useNavigate } from "react-router-dom";
import GeneralSearchBar from "../../components/SearchBar/GeneralSearchBar";

const ClientInterface = () => {
  const navigate = useNavigate();

  const handleSearch = (titleFilter, addressFilter) => {
    // Navigate to the services page with query parameters
    navigate(`/service?title=${titleFilter}&address=${addressFilter}`);
  };
  
  return (
    
      <div className="r-wrapper margin-t">
        <GeneralSearchBar onSearch={handleSearch} />
       <Category/>
      <Services/>
      </div>
  
  );
};

export default ClientInterface

