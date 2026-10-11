import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocationContext } from '../context/LocationContext';
import { clearOverpassCache } from '../services/overpassService';

/**
 * useOverpassData(fetcher, category)
 *
 * fetcher   – function accepting selectedLocation → Promise from overpassService
 * category  – string key matching the cache key used inside overpassService
 *             (e.g. 'medical', 'education', …)
 *
 * Returns { results, loading, error, locationLabel, retry }
 *
 * Re-fetches whenever the selected location changes.
 * retry() clears the cache entry and re-runs the fetch.
 */
export function useOverpassData(fetcher, category) {
  const { selectedLocation } = useLocationContext();
  const [results,  setResults]  = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);
  const [retryKey, setRetryKey] = useState(0);

  const abortRef = useRef(false);

  useEffect(() => {
    abortRef.current = false;
    setLoading(true);
    setError(null);
    setResults([]);

    fetcher(selectedLocation).then(({ results: r, error: e }) => {
      if (abortRef.current) return;
      setResults(r);
      setError(e || null);
      setLoading(false);
    });

    return () => { abortRef.current = true; };
  }, [selectedLocation.label, retryKey]);

  const retry = useCallback(() => {
    if (category) clearOverpassCache(selectedLocation.label, category);
    setRetryKey((k) => k + 1);
  }, [selectedLocation.label, category]);

  return {
    results,
    loading,
    error,
    locationLabel: selectedLocation.label,
    retry,
    resultCount: results.length,
  };
}
