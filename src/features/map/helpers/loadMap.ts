export type LoadMapOptions = {
  containerId: string;
  mapOptions?: google.maps.MapOptions;
};

export async function loadMap(options: LoadMapOptions) {
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
