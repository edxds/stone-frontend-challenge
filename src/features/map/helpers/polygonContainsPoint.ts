// Because the Google Maps API is loaded asynchronously, we can't put this function in an
// isolated module, as it would try to access google.maps at import time and it would resolve
// to undefined.
export function polygonContainsPoint(poly: google.maps.Polygon, point: google.maps.LatLngLiteral) {
  const latLng = new google.maps.LatLng(point.lat, point.lng);
  return google.maps.geometry.poly.containsLocation(latLng, poly);
}
