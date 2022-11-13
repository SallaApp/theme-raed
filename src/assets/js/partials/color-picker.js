const COLORS = document.querySelectorAll('#color_picker');

COLORS.forEach(color => {
  const colorInput = document.getElementById(color.dataset.colorInput);
  
  // Seting the color if there is a value
  if (colorInput.value) {
    color.setAttribute('color', colorInput.value)
  }

  // Apend the value to the input for submiting 
  color.addEventListener('submitted', (event) => {
    colorInput.value = `${event.detail.hex}`;
  });
});


