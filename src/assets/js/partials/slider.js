import Swiper, {Navigation, Pagination, Lazy, Controller, Thumbs, Parallax , Autoplay} from "swiper";

Swiper.use([Controller, Navigation, Pagination, Lazy, Thumbs, Parallax , Autoplay]);

export default class Slider {
    /**
     * @param {string|HTMLElement} selector
     * @param {object} options
     */
    constructor(selector, options) {
        this.lazyloads = [];
        this.sliders = [];
        let elements = typeof selector === 'string' ? document.querySelectorAll(selector) : [selector];

        elements.forEach(element => this.initSlider(element, options));
    }

    /**
     * @return {Swiper|null}
     */
    getSlider() {
        return this.sliders[0];
    }

    slideTo(...data) {
        return this.getSlider()?.slideTo(...data);
    }

    on(...data) {
        return this.getSlider()?.on(...data);
    }

    /**
     * @return {NavigationMethods}
     */
    getNavigation() {
        return this.getSlider()?.navigation;
    }

    initSlider(slider, options) {
        let sliderId;
        if (!(sliderId = slider.dataset.id || slider.id)) {
            salla.log('Can\'t initiate slider without id, add `id="*"` or data-id="*" to work.', slider);
            return;
        }
        this.sliders.push(new Swiper(slider, {
            slidesPerView: 'auto',
            navigation   : this.navigation('#' + sliderId),
            pagination   : this.pagination('#' + sliderId),
            autoplay     : true,
            on           : {
                slideChange: () => {
                    //sometimes, images are not loaded by lazy load, so here we will make sure to load them, without overloading, just one time;
                    //on('init', ..) not working, so we will workaround for run it one time only for each slider
                    if (this.lazyloads.includes(sliderId)) {
                        return;
                    }
                    this.lazyloads.push(sliderId);
                    LazyLoad();
                },
            },
            ...options,
        }));
    }

    /**
     * If Container has naviagtion btuuns, get them
     * @param {string} id
     * @return {{nextEl: Element, prevEl: Element}}
     */
    navigation(id) {
        let nextEl = app.element(`${id} .slider-next`);
        return nextEl ? {
            nextEl: nextEl,
            prevEl: app.element(`${id} .slider-prev`)
        } : {};
    }

    /**
     * If Container has naviagtion btuuns, get them
     * @param {string} id
     * @return {{el: Element, clickable: boolean}}
     */
    pagination(id) {
        let page = app.element(`${id} .swiper-pagination`);
        return page ? {el: page, clickable: true} : {};
    }
}