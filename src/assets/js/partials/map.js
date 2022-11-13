const MAPS = document.querySelectorAll('#location_map');

MAPS.forEach(map => {
  const locationInputGeocode = document.getElementById(map.dataset.inputGeocode);
  
  // Seting the location if there is a value
  if (locationInputGeocode.value) {
    const latlngStr = locationInputGeocode.value.split(',');
    map.setAttribute('lat', parseFloat(latlngStr[0]))
    map.setAttribute('lng', parseFloat(latlngStr[1]))
  }

  // Apend the value to the input for submiting 
  map.addEventListener('selected', (event) => {
    locationInputGeocode.value = `${event.detail.lat}, ${event.detail.lng}`;
  });
});


