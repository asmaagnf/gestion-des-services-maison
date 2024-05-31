import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import GeoCoderMarker from '../components/GeoCoderMarker';
import styled from 'styled-components';

const MapWrapper = styled.div`
  width: 100%;
  height: 200px; /* Smaller height for the map */

  @media (min-width: 768px) {
    height: 300px;
  }
`;

const Map = ({ address }) => {
  return (
    <MapWrapper>
      <MapContainer
        center={[53.35, 18.8]}
        zoom={1}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%", zIndex: 0 }}
      >
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        <GeoCoderMarker address={`${address}`} />
      </MapContainer>
    </MapWrapper>
  );
}

export default Map;
