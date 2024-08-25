import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { LocationMarker } from './LocationMarker';

function MapUpdater({ lat, lng }) {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) {
      map.setView([lat, lng], map.getZoom());
    }
  }, [lat, lng, map]);
  return null;
}

export function ExternalStateExample({ lat, lng }) {
  const mapRef = useRef(null);

  return (
    <MapContainer
      center={[lat || 51.505, lng || -0.09]} // Default center
      zoom={13}
      scrollWheelZoom={false}
      ref={mapRef}
      style={{ width: '100%', height: '500px' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapUpdater lat={lat} lng={lng} />
      <LocationMarker lat={lat} lng={lng} />
    </MapContainer>
  );
}