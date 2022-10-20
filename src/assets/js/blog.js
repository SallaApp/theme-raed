import BasePage from './base-page';
// import Slider from './partials/slider';

class Blog extends BasePage {
    onReady() {
        this.initSlider()
    }
    initSlider() {
        (async () => {
            await customElements.whenDefined('salla-slider');
            const blogSlider = document.querySelector('salla-slider#blog-slider');
            blogSlider?.addEventListener('slideChange', event => {
                this.animateSliderItems();
            })
        })();
    }
    animateSliderItems() {
        setTimeout(() => app.anime('.swiper-slide-active .block-slide-anime', { translateX: [20, 0] }), 10);
    }
}

Blog.initiateWhenReady('Blog',['blog.index']);