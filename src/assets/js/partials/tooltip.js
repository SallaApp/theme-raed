export default function tootTip() {
  const tooltipToggle = document.querySelectorAll('.tooltip-toggle--clickable'),
    closeTooltip = document.querySelectorAll('.close-tooltip');

  // Show the tooltip if the type is clickable
  if (tooltipToggle.length) {
    tooltipToggle.forEach(element => {
      element.addEventListener('click', (e) => {
        e.stopPropagation();
        element.classList.add('visible')
      });
    });

    // Hide the tooltip
    closeTooltip.forEach(element => {
      element.addEventListener('click', (e) => {
        e.stopPropagation();
        element.parentElement.parentElement.classList.remove('visible')
      })
    });

    // Hide the tooltip on window click
    window.addEventListener('click', () => {
      tooltipToggle.forEach(element => {
        element.classList.remove('visible')
      });
    })
  }
};

