import { mutate } from 'swr';

import { absFetch } from '../../../utils/absoluteFetch';

import { MarkersEndpointResult } from './useMapMarkers';

export async function deleteMapMarker(id: string) {
  mutate(
    '/markers',
    async ({ data }: MarkersEndpointResult) => {
      return { data: data.filter((marker) => marker.id !== id) };
    },
    false,
  );

  await absFetch(`/markers/${id}`, { method: 'DELETE' });
  mutate('/markers');
}
