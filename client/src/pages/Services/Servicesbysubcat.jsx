import React from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import './Services.css';
import useServices from '../../hooks/useServices';
import { PuffLoader } from "react-spinners";
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import { getSubcatServices  } from '../../utils/api';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';

const Servicesbysubcat = () => {
  const { pathname } = useLocation();
  const subcategoryId = pathname.split("/").slice(-1)[0];
  const { data, isLoading, isError } = useQuery(["servSubcat", subcategoryId], () => getSubcatServices(subcategoryId));
  if (isError) {
    return (
      <div className="wrapper">
        <span>Error while fetching data</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="wrapper flexCenter" style={{ height: "60vh" }}>
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#4066ff"
          aria-label="puff-loading"
        />
      </div>
    );
  }
  return (
    <div className='wrapper'>
      <div className="flexColCenter paddings innerWidth service-container">
        <SearchBar/>
        <div className="paddings flexCenter services">
          {
            data.map((card, i)=> (<ServiceCard card={card} key={i}/>))
          }
        </div>
      </div>
    </div>
  )
}

export default Servicesbysubcat