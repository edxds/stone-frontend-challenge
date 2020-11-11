import { mutate } from 'swr';

import { absFetch } from '../../../utils/absoluteFetch';

import { MarkersEndpointResult } from './useMapMarkers';
import { StoneMapMarker } from './types';

export async function switchFavoriteMapMarker(id: string) {
  mutate(
    '/markers',
    async ({ data }: MarkersEndpointResult) => {
      const markerToUpdate = data.find((m) => m.id === id);
      if (!markerToUpdate) return data;

      const allOtherMarkers = data.filter((m) => m.id !== id);
      const updatedMarker: StoneMapMarker = {
        ...markerToUpdate,
        favorite: !markerToUpdate.favorite,
      };

      return { data: [...allOtherMarkers, updatedMarker] };
    },
    false,
  );

  await absFetch<{ data: StoneMapMarker }>(`/markers/switch-favorite/${id}`, { method: 'POST' });
  mutate('/markers');
}
