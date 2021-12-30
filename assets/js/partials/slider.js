import Swiper from "swiper";

window.Swiper = Swiper;
/**
 * @param {String|HTMLElement} selector
 * @param {object} otherOptions
 * @param navigation
 * @param pagination
 */
export default function (selector, otherOptions, navigation = false, pagination = false) {
    if (typeof selector === 'object') {
        return initSlider(selector, otherOptions, navigation, pagination);
    }
    return document.querySelectorAll(selector).forEach(slider => initSlider(slider, otherOptions, navigation, pagination));
};

function initSlider(slider, options, navigation = false, pagination = false) {
    let parentSelector = '#' + slider.dataset.id;
    options = Object.assign({
        slidesPerView: 'auto',
        navigation   : navigation ? getNavigation(parentSelector) : false,
        pagination   : pagination ? getPagnation(parentSelector) : false,
    }, options || {});
    return new Swiper(slider, options);
}

function getNavigation(parentSelector) {
    return {nextEl: parentSelector + ' .slider-next', prevEl: parentSelector + ' .slider-prev'}
}

function getPagnation(parentSelector) {
    return {el: parentSelector + ' .swiper-pagination', clickable: true}
}