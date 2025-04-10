import React, { useState, useEffect, useRef } from 'react';
import { LoadScript, GoogleMap } from '@react-google-maps/api';

// ✅ Declare libraries array outside the component to avoid re-renders
const libraries = ['marker'];

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: -3.745,
  lng: -38.523
};

// ✅ Add your actual MAP ID here
const MAP_ID = import.meta.env.VITE_GOOGLE_MAP_ID; // e.g., 'YOUR_GOOGLE_MAP_ID'

const LiveTracking = () => {
  const [currentPosition, setCurrentPosition] = useState(center);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrentPosition({ lat: latitude, lng: longitude });
    });

    const watchId = navigator.geolocation.watchPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrentPosition({ lat: latitude, lng: longitude });
    });

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  useEffect(() => {
    const updatePosition = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({ lat: latitude, lng: longitude });
      });
    };

    updatePosition();
    const intervalId = setInterval(updatePosition, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleMapLoad = (map) => {
    mapRef.current = map;

    if (window.google?.maps?.marker?.AdvancedMarkerElement) {
      const { AdvancedMarkerElement } = window.google.maps.marker;

      markerRef.current = new AdvancedMarkerElement({
        map,
        position: currentPosition,
      });
    }
  };

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.position = currentPosition;
    }
  }, [currentPosition]);

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      libraries={libraries}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentPosition}
        zoom={15}
        onLoad={handleMapLoad}
        options={{
          mapId: MAP_ID, // ✅ Must be valid for AdvancedMarkerElement
        }}
      />
    </LoadScript>
  );
};

export default LiveTracking;
