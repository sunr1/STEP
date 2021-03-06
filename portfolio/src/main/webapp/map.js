/**
 * Creates a map and applies styling and markers to it.
 */
function createMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 39, lng: -94},
    zoom: 4,
    styles: [
      {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]}, {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{color: '#263c3f'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{color: '#6b9a76'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{color: '#38414e'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{color: '#212a37'}]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{color: '#9ca5b3'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{color: '#746855'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{color: '#1f2835'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{color: '#f3d19c'}]
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{color: '#2f3948'}]
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{color: '#17263c'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{color: '#515c6d'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{color: '#17263c'}]
      }
    ]
  });

  const kcMarker = new google.maps.Marker({
    position: {lat: 39.099724, lng: -94.578331},
    map: map,
    animation: google.maps.Animation.DROP,
    title: 'Kansas City, Kansas'
  });
  const culvMarker = new google.maps.Marker({
    position: {lat: 41.2224, lng: -86.4130},
    map: map,
    animation: google.maps.Animation.DROP,
    title: 'Culver, Indiana'
  });
  const nashMarker = new google.maps.Marker({
    position: {lat: 36.1627, lng: -86.7816},
    map: map,
    animation: google.maps.Animation.DROP,
    title: 'Nashville, Tennessee'
  });

  const vegasMarker = new google.maps.Marker({
    position: {lat: 36.1699, lng: -115.1398},
    map: map,
    animation: google.maps.Animation.DROP,
    title: 'Las Vegas, Nevada'
  });

  const kcString = '<h4>Kansas City, Kansas</h4>' +
      '<p>My hometown</p>';
  const culvString = '<h4>Culver, Indiana</h4>' +
      '<p>Where I attended a boarding high school for four years</p>';
  const nashString = '<h4>Nashville, Tennessee</h4>' +
      '<p>Where I am currently attending college</p>';

  const kcInfoWindow = new google.maps.InfoWindow({content: kcString});
  const culvInfoWindow = new google.maps.InfoWindow({content: culvString});
  const nashInfoWindow = new google.maps.InfoWindow({content: nashString});

  setMarkerWindow(kcMarker, kcInfoWindow);
  setMarkerWindow(culvMarker, culvInfoWindow);
  setMarkerWindow(nashMarker, nashInfoWindow);
}

function setMarkerWindow(marker, infoWindow) {
  marker.addListener('click', function() {
    infoWindow.open(map, marker);
  });
}