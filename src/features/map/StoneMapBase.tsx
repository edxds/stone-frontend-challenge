import React, { useEffect, useMemo, useState } from 'react';
import { CircularProgress, styled } from '@material-ui/core';

import worldPolygon from '../../assets/world-polygon.json';

import { loadMapsApi, waitForMapLoad } from './loadMap';
import { StoneMapMarker, MARKER_URLS } from './markers';

export type StoneMapBaseProps = React.HTMLAttributes<HTMLDivElement> & {
  topControl?: React.ReactNode;
  bottomControl?: React.ReactNode;
  markers?: StoneMapMarker[];
  region?: google.maps.ReadonlyLatLngLiteral[];
};

export function StoneMapBase({
  topControl,
  bottomControl,
  markers,
  region,
  ...props
}: StoneMapBaseProps) {
  const [map, setMap] = useState<google.maps.Map<HTMLElement> | null>(null);

  const internalMarkers = useMemo(
    () =>
      map
        ? markers?.map(
            (marker) =>
              new google.maps.Marker({ position: marker.position, icon: MARKER_URLS[marker.type] }),
          )
        : undefined,
    [map, markers],
  );

  const internalRegion = useMemo(
    () =>
      map && region
        ? new google.maps.Polygon({
            paths: [worldPolygon, region],
            strokeColor: '#115551',
            strokeOpacity: 0.6,
            strokeWeight: 4,
            fillColor: '#092A29',
            fillOpacity: 0.4,
          })
        : undefined,
    [map, region],
  );

  useEffect(() => {
    const acknowledgeMapAndWaitForLoad = (loadedMap: google.maps.Map<HTMLElement>) => {
      setMap(loadedMap);
      return waitForMapLoad(loadedMap);
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
    internalMarkers?.forEach((marker) => marker.setMap(map));
  }, [internalMarkers, map]);

  useEffect(() => {
    internalRegion?.setMap(map);
  }, [internalRegion, map]);

  return (
    <StoneMapContainer {...props}>
      {!map && <CircularProgress size={24} />}
      {map && topControl}
      <div id="google-maps" style={map ? { width: '100%', flex: 1 } : {}} />
      {map && bottomControl}
    </StoneMapContainer>
  );
}

const StoneMapContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});
