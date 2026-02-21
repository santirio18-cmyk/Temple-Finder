// Temple Finder Mobile Configuration - OFFLINE MODE
// This file provides configuration for the mobile app with mock data

window.TEMPLE_FINDER_CONFIG = {
  // App Configuration
  app: {
    name: 'Temple Finder',
    version: '1.0.0',
    isMobile: true,
    platform: 'android',
    mode: 'offline' // Offline mode with mock data
  },
  
  // Feature Flags - All enabled for offline mode
  features: {
    geolocation: true,
    favorites: true,
    reviews: true,
    categories: true,
    search: true,
    aiSearch: true, // Local AI search enabled
    offline: true,
    maps: true // Enable maps functionality
  },
  
  // API Keys
  ai: {
    googleMapsApiKey: 'AIzaSyCr3No3TWC7-9MC63ZO7rcbSeljyFgfNkU'
  },
  
  // Mock Data Configuration
  mockData: {
    enabled: true,
    temples: 20, // Updated to 20
    categories: 12, // Updated to 12
    festivals: 8, // Added festivals
    users: 1,
    reviews: 3
  }
};

// Set environment variables for the app
window.import = window.import || {};
window.import.meta = window.import.meta || {};
window.import.meta.env = window.import.meta.env || {};

// Set offline mode flags
window.import.meta.env.VITE_OFFLINE_MODE = 'true';
window.import.meta.env.VITE_MOCK_DATA = 'true';
window.import.meta.env.VITE_LOCAL_AI = 'true';
window.import.meta.env.VITE_GOOGLE_MAPS_API_KEY = 'AIzaSyCr3No3TWC7-9MC63ZO7rcbSeljyFgfNkU';

console.log('Temple Finder Mobile Configuration Loaded (OFFLINE MODE):', window.TEMPLE_FINDER_CONFIG);
