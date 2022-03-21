import "lite-youtube-embed";
import BasePage from "./base-page";
import Slider from "./partials/slider"
import Lightbox from "fslightbox";

window.fslightbox = Lightbox;

class Home extends BasePage {
    onReady() {
        this.initiateSliders();
        this.initFeaturedTabs();
    }

    initiateSliders() {
        // Used in: [products_slider.twig, featured_products_style2.twig, slider_products_with_header.twig]
        new Slider(".product-slider", {draggable: true});

        //Used in: [photos_slider.twig]
        new Slider(".photos-slider", {
            loop          : true,
            centeredSlides: true,
            spaceBetween  : 30,
            breakpoints   : {
                320: {spaceBetween: 10},
                768: {spaceBetween: 15},
                980: {paceBetween: 30},
            },
        });

        /*
          used in:
            1- similar-products.twig
            2- best offer home block (called again in home.js)
            3- product offer products slider/ cats slider / discount slider
        */
        new Slider('.default-slider');

        /* Testimonials Slider */
        let testimonials = new Slider('.testimonials-slider', {
            draggable     : true,
            centeredSlides: true,
            slidesPerView : 1,
            breakpoints   : {1024: {slidesPerView: 2}}
        });
        //begin from slide 2 to always dispaly prev & next
        if(window.innerWidth > 1024)  testimonials.slideTo(1, false,false);  


        //Used in: [enhanced-slider.twig]
        let animate = () => setTimeout(() => app.anime('.swiper-slide-active .main-slide-anime', {translateX: [50, 0]}), 100);
        (new Slider('.main-slider', {loop: true,})).on('slideChange', () => animate());
        animate();
    }

    /**
     * used in views/components/home/featured-products-style*.twig
     */
    initFeaturedTabs() {
        salla.document.event.onClick('.tab-trigger', event => {
            event.preventDefault();
            let btn = event.target;
            let css = {
                style1: {active: 'is-active', inActive: 'inactive'},
                style2: {active: 'is-active', inActive: 'inactive'},
            }[btn.dataset.type];
            let id = btn.dataset.componentId;
            app.toggleClassIf(`#${id} .tabs-wrapper>div`, 'is-active opacity-0 translate-y-3', 'inactive', tab => tab.id == btn.dataset.target)
                .toggleClassIf(`#${id} .tab-trigger`, css.active, css.inActive, tabBtn => tabBtn == btn);

            // fadeIn active tabe
            setTimeout(() => app.toggleClassIf(`#${id} .tabs-wrapper>div`, 'opacity-100 translate-y-0', 'opacity-0 translate-y-3', tab => tab.id == btn.dataset.target), 100);
        });
        document.querySelectorAll('.s-block-tabs').forEach(block => block.classList.add('tabs-initialized'));
    }
}

Home.intiateWhenReady('Home',['index']);
