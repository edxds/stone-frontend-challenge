import React, { useEffect, useMemo, useRef, useState } from 'react';
import { CircularProgress, styled } from '@material-ui/core';


import { loadMap } from './loadMap';
import { StoneMapMarker, MARKER_URLS } from './markers';

export type StoneMapProps = React.HTMLAttributes<HTMLDivElement> & {
  topControl?: React.ReactNode;
  bottomControl?: React.ReactNode;
  markers?: StoneMapMarker[];
};

export function StoneMap({ topControl, bottomControl, markers, ...props }: StoneMapProps) {
  const map = useRef<google.maps.Map<HTMLElement> | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const internalMarkers = useMemo(
    () =>
      mapLoaded
        ? markers?.map(
            (marker) =>
              new google.maps.Marker({ position: marker.position, icon: MARKER_URLS[marker.type] }),
          )
        : undefined,
    [markers, mapLoaded],
  );

  useEffect(() => {
    loadMap({
      containerId: 'google-maps',
      mapOptions: {
        zoom: 12,
        center: { lat: -22.9068, lng: -43.1729 },
        fullscreenControl: false,
        mapTypeControlOptions: {
          position: 5, // LEFT_TOP
          style: 2, // DROPDOWN_MENU
        },
      },
    })
      .then((loadedMap) => (map.current = loadedMap))
      .catch((error) => console.warn('Could not load map!', error))
      .finally(() => setMapLoaded(true));
  }, []);

  useEffect(() => {
    const _map = map.current;
    if (!_map) return;

    internalMarkers?.forEach((marker) => marker.setMap(_map));
  }, [internalMarkers]);

  return (
    <StoneMapContainer {...props}>
      {!mapLoaded && <CircularProgress size={24} />}
      {mapLoaded && topControl}
      <div id="google-maps" style={mapLoaded ? { width: '100%', flex: 1 } : {}} />
      {mapLoaded && bottomControl}
    </StoneMapContainer>
  );
}

const StoneMapContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});
