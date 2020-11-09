import React, { useEffect, useMemo, useRef, useState } from 'react';
import { CircularProgress, styled } from '@material-ui/core';

import regionsJson from '../../assets/regions.json';

import { loadMapsApi, waitForMapLoad } from './loadMap';
import { StoneMapMarker, MARKER_URLS } from './markers';

export type StoneMapProps = React.HTMLAttributes<HTMLDivElement> & {
  topControl?: React.ReactNode;
  bottomControl?: React.ReactNode;
  markers?: StoneMapMarker[];
  region?: google.maps.ReadonlyLatLngLiteral[];
};

export function StoneMap({ topControl, bottomControl, markers, region, ...props }: StoneMapProps) {
  const map = useRef<google.maps.Map<HTMLElement> | null>(null);
  const [mapsApiLoaded, setMapsApiLoaded] = useState(false);

  const internalMarkers = useMemo(
    () =>
      mapsApiLoaded
        ? markers?.map(
            (marker) =>
              new google.maps.Marker({ position: marker.position, icon: MARKER_URLS[marker.type] }),
          )
        : undefined,
    [markers, mapsApiLoaded],
  );

  const internalRegion = useMemo(
    () =>
      mapsApiLoaded && region
        ? new google.maps.Polygon({
            paths: [regionsJson.world, region],
            strokeColor: '#115551',
            strokeOpacity: 0.6,
            strokeWeight: 4,
            fillColor: '#092A29',
            fillOpacity: 0.4,
          })
        : undefined,
    [region, mapsApiLoaded],
  );

  useEffect(() => {
    const acknowledgeMapAndWaitForLoad = (loadedMap: google.maps.Map<HTMLElement>) => {
      map.current = loadedMap;
      setMapsApiLoaded(true);

      return waitForMapLoad(map.current);
    };

    loadMapsApi({
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
      .then((loadedMap) => acknowledgeMapAndWaitForLoad(loadedMap))
      .then((loadedMap) => (loadedMap.getDiv().style.overflow = 'visible'))
      .catch((error) => console.warn('Could not load map!', error));
  }, []);

  useEffect(() => {
    const _map = map.current;
    if (!_map) return;

    internalMarkers?.forEach((marker) => marker.setMap(_map));
  }, [internalMarkers]);

  useEffect(() => {
    const _map = map.current;
    if (!_map) return;

    internalRegion?.setMap(_map);
  }, [internalRegion]);

  return (
    <StoneMapContainer {...props}>
      {!mapsApiLoaded && <CircularProgress size={24} />}
      {mapsApiLoaded && topControl}
      <div id="google-maps" style={mapsApiLoaded ? { width: '100%', flex: 1 } : {}} />
      {mapsApiLoaded && bottomControl}
    </StoneMapContainer>
  );
}

const StoneMapContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});
