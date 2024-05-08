import React from 'react'
import { getService } from '../../utils/api';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import "./ServiceDetail.css";
import { PuffLoader } from 'react-spinners';
import { MdLocationPin } from 'react-icons/md';
import { FaRegClock } from "react-icons/fa";
import Map from '../../components/Map';
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import { sliderSettings } from "../../utils/common";

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
         <img src={`http://localhost:3001/${data?.image}`} alt="service image" />

         
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
                <span>{data?.yearsOfExperience} ans d'expérience</span>
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
 
            <div className="carousel-container">
            {data?.ServiceImages && (
              <Swiper {...sliderSettings}>
              <SlideNextButton />
                {/* Map through service images and render each image */}
                {data.ServiceImages.map((image, index) => (
                  <SwiperSlide key={index.i}>
                   <img src={`http://localhost:3001/${image.imageUrl}`} alt={`Service Image `} />
                 </SwiperSlide>
                
                ))}
              </Swiper>
            )}
      </div>
    </div>
  );
};
const SlideNextButton = () => {
  const swiper = useSwiper();
  return (
    <div className="flexCenter r-buttons">
      <button onClick={() => swiper.slidePrev()} className="r-prevButton">
        &lt;
      </button>
      <button onClick={() => swiper.slideNext()} className="r-nextButton">
        &gt;
      </button>
    </div>
  );
};
export default ServiceDetail;
