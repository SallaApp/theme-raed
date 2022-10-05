import Picker from 'vanilla-picker/dist/vanilla-picker';

var parents = document.querySelectorAll('.color-picker');

parents.forEach(parent => {
  var picker = new Picker({
    parent: parent,
    popup: 'left',
    color: parent.dataset.initialColor,
    onChange (color) {
      const colorInput = document.getElementById(parent.dataset.colorInput),
            colorBox = document.getElementById(parent.dataset.colorBox)
      colorInput.value = color.hex;
      colorBox.style.background = color.hex;
    }
  });
});