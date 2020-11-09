import React, { useEffect, useMemo, useState } from 'react';
import { CircularProgress, styled } from '@material-ui/core';

import { usePrevious } from '../../utils/usePrevious';
import worldPolygon from '../../assets/world-polygon.json';
import regions from '../../assets/regions.json';

import { loadMapsApi, waitForMapLoad } from './loadMap';
import { StoneMapMarker, MARKER_URLS } from './markers';
import { useStoneMapLocation } from './context';
import { getPolygonBounds } from './getPolygonBounds';

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
  const { regionId, subregionId } = useStoneMapLocation();
  const [map, setMap] = useState<google.maps.Map<HTMLElement> | null>(null);

  const selectedRegion = useMemo(() => regions.find((r) => r.id === regionId), [regionId]);
  const selectedSubregion = useMemo(
    () => selectedRegion?.subregions.find((sr) => sr.id === subregionId),
    [selectedRegion?.subregions, subregionId],
  );

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

  const internalSubregionPolygon = useMemo(
    () =>
      map && selectedSubregion?.mapsPoly
        ? new google.maps.Polygon({
            paths: [worldPolygon, selectedSubregion.mapsPoly],
            strokeColor: '#115551',
            strokeOpacity: 0.6,
            strokeWeight: 4,
            fillColor: '#092A29',
            fillOpacity: 0.4,
          })
        : undefined,
    [map, selectedSubregion],
  );

  const previousSubregionPolygon = usePrevious(internalSubregionPolygon);

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
    internalSubregionPolygon?.setMap(map);
    previousSubregionPolygon?.setMap(null); // Clear previous polygons

    if (selectedSubregion) {
      const subregionPolygon = new google.maps.Polygon({ paths: [selectedSubregion.mapsPoly] });
      map?.fitBounds(getPolygonBounds(subregionPolygon));
      map?.setZoom(12);
    }
  }, [internalSubregionPolygon, previousSubregionPolygon, selectedSubregion, map]);

  useEffect(() => {
    selectedRegion && map?.setCenter(selectedRegion.center);
  }, [map, selectedRegion]);

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
