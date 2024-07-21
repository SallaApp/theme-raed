export default function toolTip() {
  const tooltipToggleClick = document.querySelectorAll('.tooltip-toggle--clickable'),
    tooltipToggleHover = document.querySelectorAll('.tooltip-toggle--hover'),
    closeTooltip = document.querySelectorAll('.close-tooltip');

  // Show the tooltip if the type is clickable
  if (tooltipToggleClick.length) {
    tooltipToggleClick.forEach((element) => {
      element.addEventListener('click', (e) => {
        e.stopPropagation();
        element.classList.add('visible');
      });
    });
  }

  // Show the tooltip if the type is hover
  if (tooltipToggleHover.length) {
    tooltipToggleHover.forEach((element) => {
      element.addEventListener('mouseenter', () => {
        element.classList.add('visible');
      });

      element.addEventListener('mouseleave', () => {
        element.classList.remove('visible');
      });
    });
  }

  // Hide the tooltip when the close button is clicked
  if (closeTooltip.length) {
    closeTooltip.forEach(element => {
      element.addEventListener('click', (e) => {
        e.stopPropagation();
        element.parentElement.parentElement.classList.remove('visible');
      });
    });
  }

  // Hide the tooltip on window click
  window.addEventListener('click', () => {
    tooltipToggleClick.forEach(element => {
      element.classList.remove('visible');
    });
    tooltipToggleHover.forEach((element) => {
      element.classList.remove('visible');
    });
  });
};
