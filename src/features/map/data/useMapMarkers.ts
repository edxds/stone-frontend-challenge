import useSWR from 'swr';

import { StoneMapMarker } from './types';

export type MarkersEndpointResult = {
  data: StoneMapMarker[];
};

export function useMapMarkers() {
  return useSWR<MarkersEndpointResult>('/markers');
}
