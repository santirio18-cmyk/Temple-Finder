import React, { createContext, useContext, useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { Alert } from 'react-native';

const LocationContext = createContext({});

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkLocationPermission();
  }, []);

  const checkLocationPermission = async () => {
    try {
      const { status } = await Location.getForegroundPermissionsAsync();
      setPermissionGranted(status === 'granted');
      
      if (status === 'granted') {
        await getCurrentLocation();
      }
    } catch (error) {
      console.error('Error checking location permission:', error);
      setError('Failed to check location permission');
    }
  };

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setPermissionGranted(status === 'granted');
      
      if (status === 'granted') {
        await getCurrentLocation();
        return true;
      } else {
        Alert.alert(
          'Location Permission Required',
          'Please enable location access to find nearby temples.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Settings', onPress: () => Location.enableNetworkProviderAsync() }
          ]
        );
        return false;
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
      setError('Failed to request location permission');
      return false;
    }
  };

  const getCurrentLocation = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        timeout: 10000,
        maximumAge: 60000,
      });

      const { latitude, longitude } = currentLocation.coords;
      
      setLocation({
        latitude,
        longitude,
        timestamp: currentLocation.timestamp,
      });

      return {
        latitude,
        longitude,
        timestamp: currentLocation.timestamp,
      };
    } catch (error) {
      console.error('Error getting current location:', error);
      setError('Failed to get current location');
      
      // Fallback to Chennai coordinates
      const fallbackLocation = {
        latitude: 13.0827,
        longitude: 80.2707,
        timestamp: Date.now(),
      };
      
      setLocation(fallbackLocation);
      return fallbackLocation;
    } finally {
      setIsLoading(false);
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const getNearbyTemples = async (radius = 15) => {
    try {
      if (!location) {
        const currentLocation = await getCurrentLocation();
        if (!currentLocation) {
          throw new Error('Unable to get current location');
        }
      }

      const response = await fetch(
        `http://localhost:3000/api/v1/temples/nearby?lat=${location.latitude}&lng=${location.longitude}&radius=${radius}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch nearby temples');
      }

      const data = await response.json();
      
      if (data.success) {
        return data.data.temples;
      } else {
        throw new Error(data.error || 'Failed to fetch nearby temples');
      }
    } catch (error) {
      console.error('Error getting nearby temples:', error);
      throw error;
    }
  };

  const getLocationName = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      );

      if (!response.ok) {
        throw new Error('Failed to get location name');
      }

      const data = await response.json();
      
      return {
        city: data.city || data.locality || 'Unknown City',
        state: data.principalSubdivision || 'Unknown State',
        country: data.countryName || 'Unknown Country',
        address: data.localityInfo?.administrative?.[0]?.name || 'Unknown Address',
      };
    } catch (error) {
      console.error('Error getting location name:', error);
      return {
        city: 'Unknown City',
        state: 'Unknown State',
        country: 'Unknown Country',
        address: 'Unknown Address',
      };
    }
  };

  const value = {
    location,
    isLoading,
    permissionGranted,
    error,
    getCurrentLocation,
    requestLocationPermission,
    calculateDistance,
    getNearbyTemples,
    getLocationName,
    checkLocationPermission,
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};




