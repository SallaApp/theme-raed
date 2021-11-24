
/**
 * #1 Default Product slider ------------------------------------------------------
 * Used in:
 *  1- products_slider.twig, 
 *  2- featured_products_style2.twig,
 *  3- slider_products_with_header.twig
 */

document.addEventListener('DOMContentLoaded', function () {
  const sliders = document.querySelectorAll(".product-slider");

  sliders.forEach((slider) => {
    const sliderId = '#' + slider.dataset.id;
    const next = document.querySelector(sliderId + ' .slider-next');
    const prev = document.querySelector(sliderId + ' .slider-prev');

    const swiper = new Swiper(slider, {
      slidesPerView: 'auto',
      draggable: true,
      navigation: {
        nextEl: next,
        prevEl: prev,
      },
    });
  });
});