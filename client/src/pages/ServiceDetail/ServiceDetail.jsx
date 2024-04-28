import React from 'react'
import { getService } from '../../utils/api';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import "./ServiceDetail.css";
import { PuffLoader } from 'react-spinners';
import { MdLocationPin } from 'react-icons/md';
import { FaRegClock } from "react-icons/fa";
import Map from '../../components/Map';


const ServiceDetail = () => {
    const { pathname } = useLocation();
  const id = pathname.split("/").slice(-1)[0];
  const { data, isLoading, isError } = useQuery(["serv", id], () => getService(id));
 
 
  if (isLoading) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <PuffLoader />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <span>Error while fetching the service details</span>
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="flexColStart paddings innerWidth service-container">
         {/* image */}
         <img src={data?.image} alt="service image" />
         
         <div className="flexCenter service-details">
          {/* left */}
         <div className="flexColStart left">
           
            {/* head */}
            <div className="flexStart head">
              <span className="primaryText">{data?.title}</span>
              </div>
               {/* description */}
            <span className="secondaryText" style={{ textAlign: "justify" }}>
              {data?.description}
            </span>
            
               {/* yearsofexperience */}
            <div className='flexStart' style={{ gap: "1rem" }}>
                <FaRegClock size={25} />
                <span>{data?.yearsOfExperience} years of experience</span>
              </div>

            {/* address */}
             <div className="flexStart" style={{ gap: "1rem" }}>
              <MdLocationPin size={25} />
              <span className="secondaryText">
                {data?.location}
              </span>
            </div>

           {/* button de demande*/}
            <button className="button">
                Demander le service
              </button>
            </div>

            {/* right side */}
          <div className="map">
            <Map
              address={data?.location}
            />
          </div>
            </div>
 

      </div>
    </div>
  );
};

export default ServiceDetail;
