import { Loader } from '@googlemaps/js-api-loader';

export type LoadMapOptions = {
  containerId: string;
  mapOptions?: google.maps.MapOptions;
};

export async function loadMapsApi(options: LoadMapOptions) {
  const loader = new Loader({
    apiKey: 'AIzaSyC8nR0aHIAQW858N19UfdSVRlEIoLU2Zxs',
  });

  await loader.load();
  return new google.maps.Map(
    document.getElementById(options.containerId) as HTMLElement,
    options.mapOptions,
  );
}

export function waitForMapLoad<T extends Element>(
  map: google.maps.Map<T>,
): Promise<google.maps.Map<T>> {
  return new Promise((resolve) => {
    google.maps.event.addListenerOnce(map, 'tilesloaded', () => resolve(map));
  });
}
