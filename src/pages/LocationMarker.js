import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import location from '../assets/images/icon-location.svg';

const customIcon = L.icon({
    iconUrl: location,
    iconSize: [38, 38],
    iconAnchor: [22, 38],
    popupAnchor: [-3, -76],
});

export function LocationMarker({ lat, lng }) {
    return (
        <Marker position={[lat, lng]} icon={customIcon}>
            <Popup>Your current location</Popup>
        </Marker>
    );
}
