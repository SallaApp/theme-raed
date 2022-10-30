import BasePage from './base-page';
import Slider from './partials/slider';

class Blog extends BasePage {
    onReady() {
        let slider = document.querySelector('#blog-slider');
        if (!slider) {
            return;
        }
        new Slider(slider, {
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
        setTimeout(() => app.anime('.swiper-slide-active .block-slide-anime', {translateX: [20, 0]}), 10);
    }
}

Blog.initiateWhenReady(['blog.index']);