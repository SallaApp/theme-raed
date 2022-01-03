import BasePage from '../basePage';
import Slider from '../partials/slider';

class Index extends BasePage {
    onReady() {
        salla.infiniteScroll.initiate('.articles-container', '.post-entry');
        this.initiateSlider();
    }

    initiateSlider() {
        let slider = document.querySelector('#blog-slider');
        if (!slider) {
            return;
        }
        Slider(slider, {
            slidesPerView : 1,
            loop          : true,
            centeredSlides: true,
            spaceBetween  : 30,
            effect        : "fade",
            breakpoints   : {
                320: {spaceBetween: 10},
                768: {spaceBetween: 15},
                980: {paceBetween: 30},
            }
        }).on('slideChange', () => this.animateSliderItems());
        this.animateSliderItems();
    }

    animateSliderItems() {
        setTimeout(() => this.anime('.swiper-slide-active .block-slide-anime', {translateX: [20, 0]}), 10);
    }
}

new Index;