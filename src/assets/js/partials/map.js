injectGoogleMapsApiScript({
  'key': 'AIzaSyBPhPJ4KG13ywvmeAovLRnbi7WzlsdcWKs',
  'language': 'ar',
  'libraries': 'places',
});

function injectGoogleMapsApiScript(options = {}) {
  const optionsQuery = Object.keys(options)
  .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(options[k])}`)
  .join('&');

  const url = `https://maps.googleapis.com/maps/api/js?${optionsQuery}`;

  const script = document.createElement('script');

  script.setAttribute('src', url);
  script.setAttribute('async', '');
  script.setAttribute('defer', '');

  document.head.appendChild(script);
}

window.onload = () => {
  initMap();
}

//-------------------------------------------------------------------------

function initMap() {
  const mapDivWrapper = document.querySelectorAll('#init_map_div');
  mapDivWrapper.forEach((map, i) => {
    const maps = [],
          markers = [];

    // Check if there is a location saved
    const savedLocation = map.dataset.geoLocation;

    let pos = {};
    if (!savedLocation) {
      pos.lat = 21.52822716547559;
      pos.lng = 39.19322012785499;
    } else {
      const latlngStr = savedLocation.split(',')
      pos.lat = parseFloat(latlngStr[0]);
      pos.lng = parseFloat(latlngStr[1]);
    }

    maps[i] = new google.maps.Map(map, {
      center: pos,
      zoom: 15,
      mapTypeId: 'roadmap',
      mapTypeControl: false
    });

    // Marker plasment on the map
    markers[i] = new google.maps.Marker({
      map: maps[i],
      anchorPoint: new google.maps.Point(0, -29),
      position: pos,
      animation: google.maps.Animation.DROP
    });

    // Change marker placment and append the GEO location value
    // First we need to check if there is going to be any event to append to the map
    const isEvent = map.dataset.event;

    isEvent === 'false' ? null : maps[i].addListener('click', function(e) {  
      if (markers[i]) {
        markers[i].setMap(null);
      }

      markers[i] = new google.maps.Marker({
        map: maps[i],
        anchorPoint: new google.maps.Point(0, -29),
        position: e.latLng,
        animation: google.maps.Animation.DROP
      });
  
      const locationInputGeocode = document.getElementById(map.dataset.inputGeocode);
      locationInputGeocode.value = `${e.latLng.lat()}, ${e.latLng.lng()}`;
    });

    // Create the search box and link it to the UI element.
    let input = document.getElementById(map.dataset.searchInput);
    if (input) {
      const searchBox = new google.maps.places.SearchBox(input);
      maps[i].controls[google.maps.ControlPosition.TOP_LEFT].push(input);

      // Bias the SearchBox results towards current map's viewport.
      maps[i].addListener('bounds_changed', function() {
        searchBox.setBounds(maps[i].getBounds());
      });

      searchBox.addListener('places_changed', function() {
        const places = searchBox.getPlaces();

        if (places.length == 0) {
          return;
        }

        // For each place, get the icon, name and location.
        const bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
          if (!place.geometry) {
            console.log("Returned place contains no geometry");
            return;
          }

          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        maps[i].fitBounds(bounds);
      });
    };

    // Get the user current location
    const currentLocationBtn = document.getElementById(map.dataset.currentLocation);
    currentLocationBtn.addEventListener('click', () => {  
      navigator.geolocation.getCurrentPosition(function(position) {
        const pos =  new google.maps.LatLng( position.coords.latitude, position.coords.longitude );
        maps[i].setCenter(pos);
      }, function(e) {
        if (e.code == e.PERMISSION_DENIED) {
          if (confirm("يجب الموافقة على صلاحية تحديد الموقع التي ستظهر لك مرة أخرى") == true) {
            window.location.reload();
          }
        }
      });
    });

  });
};