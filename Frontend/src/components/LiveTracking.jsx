import React, { useState, useEffect, useRef, useContext } from 'react';
import { LoadScript, GoogleMap } from '@react-google-maps/api';
import { CaptainDataContext } from '../context/CaptainContext';

// ✅ Declare libraries array outside the component to avoid re-renders
const libraries = ['marker'];

const containerStyle = {
  width: '100%',
  height: '100%',
};

// Remove the hard-coded center. Instead, we compute the default center from captain data.
const fallbackCenter = {
  lat: 26.8467,
  lng: 80.9462,
};

// ✅ Use your actual MAP ID here; if it's a GOOGLE_MAPS_API_KEY, consider renaming appropriately.
const MAP_ID = import.meta.env.VITE_GOOGLE_MAPS_API_KEY; 

const LiveTracking = () => {
  const { captain } = useContext(CaptainDataContext);
  const defaultCenter =
    captain && captain.location
      ? { lat: captain.location.ltd, lng: captain.location.lng }
      : fallbackCenter;

  const [currentPosition, setCurrentPosition] = useState(defaultCenter);
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
          mapId: MAP_ID, // ✅ Must be valid if using AdvancedMarkerElement
        }}
      />
    </LoadScript>
  );
};

export default LiveTracking;