import { createContext, useContext, useState, useCallback } from 'react';
import { locations } from '../data/locations';

/**
 * Shared location state.
 *
 * selectedLocation  – { district, mandal, village, label, coords }
 *                     coords is { lat, lng } when known, null otherwise.
 * geoStatus         – 'idle' | 'loading' | 'success' | 'denied' | 'unavailable' | 'unsupported'
 * geoError          – human-readable error string or null
 * useMyLocation()   – triggers browser geolocation + Nominatim reverse-geocode
 */

const LocationContext = createContext(null);

// Default location: Tagarapuvalasa, Bheemunipatnam, Visakhapatnam.
// Alternate spelling "Thagarapuvalsa" is normalised to "Tagarapuvalasa" by
// LocationSelector via the villageAliases map in locations.js.
// Stored coordinates are used directly so no Nominatim geocode call is made.
const DEFAULT_LOCATION = {
  district: locations.current.district,
  mandal:   locations.current.mandal,
  village:  locations.current.village,
  label:    locations.current.label,
  coords:   locations.current.coordinates,   // { lat: 17.8986, lng: 83.4489 }
};

export function LocationProvider({ children }) {
  const [selectedLocation, setSelectedLocationRaw] = useState(DEFAULT_LOCATION);
  const [geoStatus, setGeoStatus]   = useState('idle');   // idle|loading|success|denied|unavailable|unsupported
  const [geoError,  setGeoError]    = useState(null);

  // Wrap the setter so coords is always present (defaults to null)
  const setSelectedLocation = useCallback((loc) => {
    setSelectedLocationRaw({ coords: null, ...loc });
  }, []);

  const useMyLocation = useCallback(() => {
    if (!('geolocation' in navigator)) {
      setGeoStatus('unsupported');
      setGeoError('Geolocation is not supported by your browser. Please select a location manually.');
      return;
    }

    setGeoStatus('loading');
    setGeoError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude: lat, longitude: lng } = position.coords;

        // Reverse-geocode with Nominatim (OSM, free, no API key required).
        // Terms: https://operations.osmfoundation.org/policies/nominatim/
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`,
            { headers: { 'Accept-Language': 'en' } }
          );
          if (!res.ok) throw new Error(`Nominatim returned ${res.status}`);
          const data = await res.json();

          const addr = data.address || {};
          // Nominatim field priority for Indian sub-district locality
          const village =
            addr.village || addr.town || addr.city_district ||
            addr.suburb   || addr.neighbourhood || addr.city || '';
          const mandal  =
            addr.county   || addr.state_district || addr.city || '';
          const district =
            addr.state_district || addr.county || addr.city || '';
          const state   = addr.state || 'Andhra Pradesh';

          const parts = [village, district, state].filter(Boolean);
          const label = parts.length ? parts.join(', ') : data.display_name;

          setSelectedLocationRaw({
            district,
            mandal,
            village,
            label,
            coords: { lat, lng },
          });
          setGeoStatus('success');
        } catch (err) {
          // Coords still valid even if reverse-geocode fails
          setSelectedLocationRaw((prev) => ({
            ...prev,
            coords: { lat, lng },
            label: `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
          }));
          setGeoStatus('success');
          setGeoError('Location detected but address lookup failed. Showing coordinates.');
        }
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setGeoStatus('denied');
          setGeoError('Location permission denied. Please allow access or select your location manually.');
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          setGeoStatus('unavailable');
          setGeoError('Your location could not be determined. Please select manually.');
        } else {
          setGeoStatus('unavailable');
          setGeoError('Location request timed out. Please try again or select manually.');
        }
      },
      { timeout: 10000, maximumAge: 60000 }
    );
  }, []);

  return (
    <LocationContext.Provider value={{
      selectedLocation,
      setSelectedLocation,
      geoStatus,
      geoError,
      useMyLocation,
    }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocationContext() {
  return useContext(LocationContext);
}
