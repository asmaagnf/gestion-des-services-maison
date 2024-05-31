import React, { useState } from 'react';
import { PuffLoader } from 'react-spinners';
import Sc from '../../components/ServiceCard/sc';
import SearchBar from "../../components/SearchBar/SearchBar";
import { getSubcatServices  } from '../../utils/api';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import './Services.css'

const Servicesbysubcat = () => {
  const { pathname } = useLocation();
  const subcategoryId = pathname.split("/").slice(-1)[0];
  const { data, isLoading, isError } = useQuery(["servSubcat", subcategoryId], () => getSubcatServices(subcategoryId));
  const [filter, setFilter] = useState("");
  if (isError) {
    return (
      <div style={styles.wrapper}>
        <span style={styles.errorText}>Erreur lors de la récupération des données</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div style={{ ...styles.wrapper, ...styles.flexCenter, height: "60vh" }}>
        <PuffLoader height="80" width="80" radius={1} color="#4066ff" aria-label="puff-loading" />
      </div>
    );
  }

  return (
    <div>
    <div className='service-container' style={styles.wrapper}>
      
      <div  style={{ ...styles.flexColStart, ...styles.innerWidth, ...styles.serviceContainer }}>
     
        <div style={styles.header}>
          <h2 style={styles.mainText}>Découvrez nos services</h2>
          <p style={styles.subText}>Explorez les meilleurs services de la catégorie : {data.name}</p>
          <SearchBar filter={filter} setFilter={setFilter} />
        </div>
        <div style={styles.services}>
        { 
           data.filter(
                (service) =>
                  service.title.toLowerCase().includes(filter.toLowerCase()) ||
                  service.location.toLowerCase().includes(filter.toLowerCase())
              )
          .map((card, i) => (
            <div key={i} style={styles.serviceCardWrapper}>
              <Sc card={card} />
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

const styles = {
  wrapper: {
    padding: "20px",
    backgroundColor: "#f0f2f5",
    display: "flex",
    justifyContent: "center",
  },
  flexCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  flexColStart: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  innerWidth: {
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  serviceContainer: {
    padding: "20px",
    width: "100%",
  },
  header: {
    marginBottom: "30px",
    textAlign: "center",
  },
  mainText: {
    color: "#FFA500",
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  subText: {
    color: "#007aff",
    marginBottom: "20px",
    fontWeight:700,
    fontSize:"27px"
  },
  services: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    width: "100%",
  },
  serviceCardWrapper: {
    width: "100%",
    maxWidth: "1000px",
    display: "flex",
    justifyContent: "center",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0 8px 10px rgba(0, 0, 0, 0.15)",
  },
  errorText: {
    color: "red",
    fontSize: "20px",
    fontWeight: "bold",
  },
};

export default Servicesbysubcat;
// //goodhna lcode dial assmaa
// import React, { useState } from 'react';
// import SearchBar from '../../components/SearchBar/SearchBar';
// import './Services.css';
// import { PuffLoader } from "react-spinners";
// import ServiceCard from '../../components/ServiceCard/ServiceCard';
// import { getSubcatServices  } from '../../utils/api';
// import { useQuery } from 'react-query';
// import { useLocation } from 'react-router-dom';

// const Servicesbysubcat = () => {
//   const { pathname } = useLocation();
//   const subcategoryId = pathname.split("/").slice(-1)[0];
//   const { data, isLoading, isError } = useQuery(["servSubcat", subcategoryId], () => getSubcatServices(subcategoryId));
//   const [filter, setFilter] = useState("");

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
//       <SearchBar filter={filter} setFilter={setFilter} />
//         <div className="paddings flexCenter services">
//            { 
//            data.filter(
//                 (service) =>
//                   service.title.toLowerCase().includes(filter.toLowerCase()) ||
//                   service.location.toLowerCase().includes(filter.toLowerCase())
//               )
//               .map((card, i) => (
//                 <ServiceCard  card={card} key={i} />
//               ))
//           }
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Servicesbysubcat
