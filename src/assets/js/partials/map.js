const MAPS = document.querySelectorAll('#location_map');

MAPS.forEach(map => {

  const savedLocation = map.dataset.location;
  
  // Seting the location if there is a value
  if (savedLocation) {
    const latlngStr = savedLocation.split(',');
    map.setAttribute('lat', parseFloat(latlngStr[0]))
    map.setAttribute('lng', parseFloat(latlngStr[1]))
  }

  // Apend the value to the input for submiting 
  map.addEventListener('selected', (event) => {
    const locationInput = document.getElementById(map.dataset.locationInput);
    locationInput.value = `${event.detail.lat}, ${event.detail.lng}`;
  });
});


