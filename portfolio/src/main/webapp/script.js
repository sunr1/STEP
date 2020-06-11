function scrollUp() {
  window.scrollTo({top: 0, behavior: 'smooth'});
}

async function printComments() {
  let commentLimit = document.getElementById('comment-limit').value;

  fetch('/comments?comment-limit=' + commentLimit)
      .then(response => response.json())
      .then((data) => {
        let allComments = document.getElementById('allComments');

        while (allComments.lastChild) {
          allComments.removeChild(allComments.lastChild)
        }

        data.forEach(comment => createCommentElement(comment));
      })
      .then(createMap);
}

function createCommentElement(comment) {
  const allComments = document.getElementById('allComments');
  const commentDiv = document.createElement('div');

  appendCommentElement(comment.name + ' left a comment:', commentDiv);
  appendCommentElement(comment.text, commentDiv);
  appendCommentElement('at ' + comment.timestamp, commentDiv);

  // delete button implementation
  const deleteButtonElement = document.createElement('button');
  const deleteTextNode = document.createTextNode('x');
  deleteButtonElement.appendChild(deleteTextNode);
  deleteButtonElement.addEventListener('click', () => {
    deleteComments(comment);
    commentDiv.remove();
  });
  commentDiv.appendChild(deleteButtonElement);

  allComments.appendChild(commentDiv);
}

function deleteComments(comment) {
  const params = new URLSearchParams();
  params.append('id', comment.id);
  fetch('/delete-comment', {method: 'POST', body: params});
}

function appendCommentElement(txt, commentDiv) {
  const el = document.createElement('p');
  el.appendChild(document.createTextNode(txt));
  commentDiv.appendChild(el);
}

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

  const kcString = '<h4>Kansas City, Kansas</h4>' +
      '<p>My hometown</p>';
  const culvString = '<h4>Culver, Indiana</h4>' +
      '<p>Where I attended a boarding high school for four years</p>';
  const nashString = '<h4>Nashville, Tennessee</h4>' +
      '<p>Where I am currently attending college</p>';

  var kcInfoWindow = new google.maps.InfoWindow({content: kcString});
  var culvInfoWindow = new google.maps.InfoWindow({content: culvString});
  var nashInfoWindow = new google.maps.InfoWindow({content: nashString});

  setMarker(kcMarker, kcInfoWindow);
  setMarker(culvMarker, culvInfoWindow);
  setMarker(nashMarker, nashInfoWindow);
}

function setMarker(marker, infoWindow) {
  marker.setMap;
  marker.addListener('click', function() {
    infoWindow.open(map, marker);
  });
}