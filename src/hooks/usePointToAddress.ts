import { useState, useMemo, useEffect } from 'react';

export function usePointToAddress(point: google.maps.LatLngLiteral) {
  const [address, setAddress] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const geocoder = useMemo(() => new google.maps.Geocoder(), []);

  useEffect(() => {
    setLoading(true);
    setError(undefined);

    geocoder.geocode({ location: point }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          setAddress(results[0].formatted_address);
          setLoading(false);
          return;
        }

        setAddress(undefined);
        setLoading(false);
        return;
      }

      setError(status);
      setLoading(false);
    });
  }, [point, geocoder]);

  return [address, loading, error] as const;
}
