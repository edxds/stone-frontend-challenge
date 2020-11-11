import React, { useEffect, useMemo, useState } from 'react';
import { CircularProgress, styled } from '@material-ui/core';

import { usePrevious } from '../../hooks/usePrevious';
import regions from '../../assets/regions.json';

import { useStoneMapFilters, useStoneMapLocation } from './context';
import { MARKER_URLS, StoneMapMarker } from './data';

import {
  loadMap,
  waitForMapLoad,
  getPolygonBounds,
  polygonContainsPoint,
  makeHighlightPolygon,
} from './helpers';

export type StoneMapBaseProps = React.HTMLAttributes<HTMLDivElement> & {
  topControl?: React.ReactNode;
  bottomControl?: React.ReactNode;
  markers?: StoneMapMarker[];
  region?: google.maps.ReadonlyLatLngLiteral[];
  onMarkerClick?(id: string): void;
  onMapClick?(point: google.maps.LatLngLiteral): void;
};

export function StoneMapBase({
  topControl,
  bottomControl,
  markers,
  region,
  onMarkerClick,
  onMapClick,
  ...props
}: StoneMapBaseProps) {
  const { regionId, subregionId } = useStoneMapLocation();
  const { filters } = useStoneMapFilters();

  const [map, setMap] = useState<google.maps.Map<HTMLElement> | null>(null);

  const selectedRegion = useMemo(() => regions.find((r) => r.id === regionId), [regionId]);
  const selectedSubregion = useMemo(
    () => selectedRegion?.subregions.find((sr) => sr.id === subregionId),
    [selectedRegion?.subregions, subregionId],
  );

  const subregionPolygon = useMemo(
    () =>
      map && selectedSubregion?.mapsPoly
        ? new google.maps.Polygon({ paths: selectedSubregion.mapsPoly })
        : undefined,
    [map, selectedSubregion],
  );

  const subregionHighlightPolygon = useMemo(
    () =>
      map && selectedSubregion?.mapsPoly
        ? makeHighlightPolygon(selectedSubregion.mapsPoly)
        : undefined,
    [map, selectedSubregion],
  );

  const filteredMarkers = useMemo(
    () =>
      map
        ? markers
            ?.filter((marker) => {
              const inFilters =
                filters?.map((filter) => filter(marker)).find((result) => result === false) ?? true;

              const inSubregion = subregionPolygon
                ? polygonContainsPoint(subregionPolygon, marker.position)
                : true;

              return inFilters && inSubregion;
            })
            .map((marker) => {
              const gMarker = new google.maps.Marker({
                position: marker.position,
                icon: MARKER_URLS[marker.type],
              });

              gMarker.addListener('click', () => {
                onMarkerClick?.(marker.id);
              });

              return gMarker;
            })
        : undefined,
    [filters, map, markers, onMarkerClick, subregionPolygon],
  );

  const previousFilteredMarkers = usePrevious(filteredMarkers);
  const previousSubregionHighlightPolygon = usePrevious(subregionHighlightPolygon);

  useEffect(() => {
    const acknowledgeMapAndWaitForLoad = (loadedMap: google.maps.Map<HTMLElement>) => {
      setMap(loadedMap);
      return waitForMapLoad(loadedMap);
    };

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
      .then((loadedMap) => acknowledgeMapAndWaitForLoad(loadedMap))
      .then((loadedMap) => (loadedMap.getDiv().style.overflow = 'visible'))
      .catch((error) => console.warn('Could not load map!', error));
  }, []);

  useEffect(() => {
    if (!map) return;
    const listener = map.addListener('click', (event) => onMapClick?.(event.latLng.toJSON()));
    return () => google.maps.event.removeListener(listener);
  }, [map, onMapClick]);

  useEffect(() => {
    filteredMarkers?.forEach((marker) => marker.setMap(map));
    if (filteredMarkers !== previousFilteredMarkers)
      previousFilteredMarkers?.forEach((marker) => marker.setMap(null));
  }, [filteredMarkers, previousFilteredMarkers, map]);

  useEffect(() => {
    subregionHighlightPolygon?.setMap(map);
    if (subregionHighlightPolygon !== previousSubregionHighlightPolygon) {
      previousSubregionHighlightPolygon?.setMap(null); // Clear previous polygons

      if (selectedSubregion) {
        const subregionPolygon = new google.maps.Polygon({ paths: [selectedSubregion.mapsPoly] });
        map?.fitBounds(getPolygonBounds(subregionPolygon));
        map?.setZoom(12);
      }
    }
  }, [subregionHighlightPolygon, previousSubregionHighlightPolygon, selectedSubregion, map]);

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
