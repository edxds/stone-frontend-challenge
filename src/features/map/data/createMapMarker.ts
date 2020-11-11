import { mutate } from 'swr';

import { absFetch } from '../../../utils/absoluteFetch';
import { id } from '../../../utils/id';

import { StoneMapMarker } from './types';
import { MarkersEndpointResult } from './useMapMarkers';

export async function createMapMarker(input: Omit<StoneMapMarker, 'id'>) {
  mutate(
    '/markers',
    async ({ data }: MarkersEndpointResult) => {
      return { data: [...data, { id: id(), ...input }] };
    },
    false,
  );

  await absFetch<{ data: StoneMapMarker }>('/markers', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ marker: input }),
  });

  mutate('/markers');
}
