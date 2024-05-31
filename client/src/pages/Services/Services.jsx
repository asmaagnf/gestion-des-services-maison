// import React from 'react';
// import SearchBar from '../../components/SearchBar/SearchBar';
// import './Services.css';
// import useServices from '../../hooks/useServices';
// import { PuffLoader } from "react-spinners";
// import ServiceCard from '../../components/ServiceCard/ServiceCard';

// const Services = () => {
//   const {data, isError, isLoading} = useServices()
//   if (isError) {
//     return (
//       <div className="wrapper">
//         <span>Error while fetching data</span>
//       </div>
//     );
//   }

//   if (isLoading) {
//     return (
//       <div className="wrapper flexCenter" style={{ height: "60vh" }}>
//         <PuffLoader
//           height="80"
//           width="80"
//           radius={1}
//           color="#4066ff"
//           aria-label="puff-loading"
//         />
//       </div>
//     );
//   }
//   return (
//     <div className='wrapper'>
//       <div className="flexColCenter paddings innerWidth service-container">
//         <SearchBar/>
//         <div className="paddings flexCenter services">
//           {
//             data.map((card, i)=> (<ServiceCard card={card} key={i}/>))
//           }
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Services
//good
import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import './Services.css';
import useServices from '../../hooks/useServices';
import { PuffLoader } from "react-spinners";
import ServiceCard from '../../components/ServiceCard/ServiceCard';

const Services = () => {
  const {data, isError, isLoading} = useServices()
  const [filter, setFilter] = useState("");
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
  //hell
  return (
    <div className='wrapper'>
      <div className="flexColCenter paddings innerWidth service-container">
      <SearchBar filter={filter} setFilter={setFilter} />
        <div className="paddings flexCenter services">
           { 
           data.filter(
                (service) =>
                  service.title.toLowerCase().includes(filter.toLowerCase()) ||
                  service.location.toLowerCase().includes(filter.toLowerCase())
              )
              .map((card, i) => (
                <ServiceCard  card={card} key={i} />
              ))
          }
        </div>
      </div>
    </div>
  )
}

export default Services
