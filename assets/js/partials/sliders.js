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
		const next = document.querySelector(sliderId +
			' .slider-next');
		const prev = document.querySelector(sliderId +
			' .slider-prev');

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

/**
 * #2 Photos slider ------------------------------------------------------
 * Used in:
 *  1- photos_slider.twig, 
 */

document.addEventListener('DOMContentLoaded', function () {
	const sliders = document.querySelectorAll(".photos-slider");

	sliders.forEach((slider) => {
		const sliderId = '#' + slider.dataset.id;
		const next = document.querySelector(sliderId + ' .swiper-button-next');
		const prev = document.querySelector(sliderId + ' .swiper-button-prev');
		const pagination = document.querySelector(sliderId + ' .swiper-pagination');

		const swiper = new Swiper(slider, {
			slidesPerView: "auto",
			loop: true,
			centeredSlides: true,
      preloadImages: false,
      lazy: true,
			spaceBetween: 30,
			pagination: {
				el: pagination,
				clickable: true,
			},
			navigation: {
				nextEl: next,
				prevEl: prev,
			},
			breakpoints: {
				320: {
					spaceBetween: 10,
				},
				768: {
					spaceBetween: 15,
				},
				980: {
					paceBetween: 30,
				},
			}
		});
	});
});
