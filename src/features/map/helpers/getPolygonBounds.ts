export function getPolygonBounds(polygon: google.maps.Polygon) {
  const bounds = new google.maps.LatLngBounds();

  polygon
    .getPaths()
    .getArray()
    .forEach((coordArray) => coordArray.getArray().forEach((coord) => bounds.extend(coord)));

  return bounds;
}
