export const customerMapTheme: google.maps.MapTypeStyle[] = [
  { elementType: 'geometry', stylers: [{ color: '#F4F8F4' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#6A856D' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#F4F8F4' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#DDF0F8' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#FFFFFF' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#FEE8A2' }] },
  { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#DCEBDB' }] },
  { featureType: 'poi.business', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
];
