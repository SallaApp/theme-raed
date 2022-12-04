export default function viewThreeDModel() {

  const modalSwitcher = document.querySelectorAll('.switcher-3d-view input');
  modalSwitcher.forEach(switcher => {

    // change event has a glitch from the lib ---
    switcher.addEventListener('change', (e) => {
      const productSlider = document.querySelector('.details-slider'),
        modelSlide = productSlider.querySelector('.model-entry'),
        modelViewerWrapper = document.getElementById('model-viewer-wrapper'),
        modelViewer = modelViewerWrapper.querySelector('#model_viewer'),
        modelPoster = modelViewerWrapper.querySelector('.model-viewer__poster'),
        posterHeight = modelSlide.querySelector('.model-poster').clientHeight,
        sliderCheck = modelSlide.querySelector('#activate_3d_view'),
        modelCheck = modelViewerWrapper.querySelector('#deactivate_3d_view');
  
      if (switcher.checked) {
        productSlider.classList.add('hidden');
        modelPoster.style.backgroundImage = `url('${switcher.dataset.coverUrl}')`;
        modelViewer.setAttribute('src', `${switcher.dataset.modelUrl}`)
        modelPoster.style.height = `${posterHeight}px`;
        modelViewerWrapper.classList.remove('hidden');
        modelViewerWrapper.style.height = `${posterHeight}px`;
        modelCheck.checked = true;
      } else {
        productSlider.classList.remove('hidden');
        modelViewerWrapper.classList.add('hidden');
        modelPoster.style.height = null;
        sliderCheck.checked = false;
        window.dispatchEvent(new Event('resize'));
      }
    })
  });
}
