import React, { useEffect, useState } from 'react';
import { PuffLoader } from 'react-spinners';
import Sc from '../../components/ServiceCard/sc';
import { useLocation } from 'react-router-dom';
import './Services.css'
import useServices from '../../hooks/useServices';

const Services = () => {
  const { pathname, search } = useLocation();
  const {data, isError, isLoading} = useServices()
  const [filter, setFilter] = useState({ title: '', address: '' });

  useEffect(() => {
    const params = new URLSearchParams(search);
    const title = params.get('title') || '';
    const address = params.get('address') || '';
    setFilter({ title, address });
  }, [search]);


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
  const filteredServices = data.filter(
    (service) =>
      service.title.toLowerCase().includes(filter.title.toLowerCase()) &&
      service.location.toLowerCase().includes(filter.address.toLowerCase())
  );

  return (
    <div>
    <div className='service-container' style={styles.wrapper}>
      
      <div  style={{ ...styles.flexColStart, ...styles.innerWidth, ...styles.serviceContainer }}>
     
        <div style={styles.header}>
          <h2 style={styles.mainText}>Découvrez nos services</h2>
        </div>
        <div style={styles.services}>
          {filteredServices.map((card, i) => (
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

export default Services;
