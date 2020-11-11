import worldPolygon from '../../../assets/world-polygon.json';

export function makeHighlightPolygon(paths: google.maps.LatLngLiteral[]) {
  return new google.maps.Polygon({
    paths: [worldPolygon, paths],
    strokeColor: '#115551',
    strokeOpacity: 0.6,
    strokeWeight: 4,
    fillColor: '#092A29',
    fillOpacity: 0.4,
  });
}
