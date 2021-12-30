import Swiper, {Navigation, Pagination, Lazy} from "swiper";

Swiper.use([Navigation, Pagination, Lazy]);

//todo:: remove it
window.Swiper = Swiper;
/**
 * @param {string|HTMLElement} selector
 * @param {object} options
 */
export default function (selector, options) {
    if (!selector) {
        return null;
    }
    if (typeof selector === 'object') {
        return initSlider(selector, options);
    }
    return document.querySelectorAll(selector).forEach(slider => initSlider(slider, options));
};

let lazyloads = [];

function initSlider(slider, options) {
    let sliderId = slider.dataset.id || slider.id;
    if(!sliderId){
        salla.log('Can\'t initiate slider without id, add `id="*"` or data-id="*" to work.', slider);
        return ;
    }
    let selector = '#' + sliderId;

    options = Object.assign({
        slidesPerView: 'auto',
        navigation   : getNavigation(selector),
        pagination   : getPagnation(selector),
    }, options || {});

    return (new Swiper(slider, options))
        //some times images are not loaded by lazy load, so here we will make sure to load them, without overloading, just one time;
        //on('init', ..) not working, so we will workaround for run it one time only for each slider
        .on('slideChange', () => {
            if (lazyloads.includes(sliderId)) {
                return;
            }
            lazyloads.push(sliderId);
            LazyLoad();
        });
}

function getNavigation(selector) {
    //.slider-next-lg
    let nextEl = document.querySelector(selector + ' .slider-next,' + selector + ' .swiper-button-next,' + selector + ' .slider-next-lg');
    return nextEl ? {
        nextEl: nextEl,
        prevEl: document.querySelector(selector + ' .slider-prev,' + selector + ' .swiper-button-prev,' + selector + ' .slider-prev-lg')
    } : {};
}

function getPagnation(selector) {
    let page = document.querySelector(selector + ' .swiper-pagination');
    return page ? {el: page, clickable: true} : {};
}