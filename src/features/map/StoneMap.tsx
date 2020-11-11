import React, { useCallback, useMemo, useState } from 'react';
import { Drawer } from '@material-ui/core';

import { StoneMapFilterContextProvider, StoneMapLocationContextProvider } from './context';
import { StoneMapMarker, useMapMarkers, createMapMarker } from './data';

import { MapActionBar, MapActionBarTemporaryAction } from './MapActionBar';
import { StoneMapBase, StoneMapBaseProps } from './StoneMapBase';
import { StoneMapMarkerDetails } from './StoneMapMarkerDetails';
import { NewMapMarkerForm } from './NewMapMarkerForm';

export type StoneMapProps = {} & Omit<StoneMapBaseProps, 'bottomControl' | 'topControl'>;

export function StoneMap(props: StoneMapProps) {
  const { data: markersData } = useMapMarkers();
  const markers = markersData?.data;

  const [markerDrawerOpen, setMarkerDrawerOpen] = useState(false);
  const [leadDrawerOpen, setLeadDrawerOpen] = useState(false);
  const [leadPoint, setLeadPoint] = useState<google.maps.LatLngLiteral>();

  const [selectedMarkerId, setSelectedMarkerId] = useState<string>();
  const [expectingMapClick, setExpectingMapClick] = useState(false);

  const selectedMarker = useMemo(() => markers?.find((m) => m.id === selectedMarkerId), [
    markers,
    selectedMarkerId,
  ]);

  const handleMarkerClick = useCallback((id: string) => {
    setSelectedMarkerId(id);
    setMarkerDrawerOpen(true);
  }, []);

  const handleMapClick = (point: google.maps.LatLngLiteral) => {
    if (expectingMapClick) {
      setLeadPoint(point);
      setExpectingMapClick(false);
      setLeadDrawerOpen(true);
    }
  };

  const handleLeadSubmit = (lead: Omit<StoneMapMarker, 'id'>) => {
    createMapMarker(lead);
    setLeadDrawerOpen(false);
  };

  return (
    <StoneMapLocationContextProvider>
      <StoneMapFilterContextProvider>
        <StoneMapBase
          bottomControl={
            expectingMapClick ? (
              <MapActionBarTemporaryAction
                title="Clique no mapa para criar um lead"
                onCancel={() => setExpectingMapClick(false)}
              />
            ) : (
              <MapActionBar onNewLeadClick={() => setExpectingMapClick(true)} />
            )
          }
          markers={markers}
          onMarkerClick={handleMarkerClick}
          onMapClick={handleMapClick}
          {...props}
        />
        <Drawer
          anchor="bottom"
          open={markerDrawerOpen && !!selectedMarker}
          onClose={() => setMarkerDrawerOpen(false)}
        >
          {selectedMarker && (
            <StoneMapMarkerDetails marker={selectedMarker} style={{ width: '100%' }} />
          )}
        </Drawer>
        <Drawer
          anchor="bottom"
          open={leadDrawerOpen}
          onClose={() => setLeadDrawerOpen(false)}
          disableBackdropClick
        >
          {leadPoint && (
            <NewMapMarkerForm
              atPoint={leadPoint}
              onCancel={() => setLeadDrawerOpen(false)}
              onSubmit={handleLeadSubmit}
            />
          )}
        </Drawer>
      </StoneMapFilterContextProvider>
    </StoneMapLocationContextProvider>
  );
}
