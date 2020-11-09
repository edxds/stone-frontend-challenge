import { Loader } from '@googlemaps/js-api-loader';

export type LoadMapOptions = {
  containerId: string;
  mapOptions?: google.maps.MapOptions;
};

export async function loadMap(options: LoadMapOptions) {
  const loader = new Loader({
    apiKey: 'AIzaSyC8nR0aHIAQW858N19UfdSVRlEIoLU2Zxs',
  });

  await loader.load();
  return new google.maps.Map(
    document.getElementById(options.containerId) as HTMLElement,
    options.mapOptions,
  );
}
