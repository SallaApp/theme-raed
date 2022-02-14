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
        //used in: main-links.twig
        new Slider('.category-slider');
        app.anime('.cat-item', {translateY: [15, 0]});

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

        //Used in: [testimonials.twig, random-testimonials.twig]
        new Slider('.testimonials-slider', {
            loop          : true,
            centeredSlides: true,
            spaceBetween  : 15,
            breakpoints   : {1024: {slidesPerView: 2, spaceBetween: 30}}
        });


        //Used in: [enhanced-slider.twig]
        let animate = () => setTimeout(() => app.anime('.swiper-slide-active .main-slide-anime', {translateX: [50, 0]}), 100);
        let slider = new Slider('.main-slider', {loop: true,});
        slider && slider.on('slideChange', () => animate());
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
                style1: {active: 'text-title-color', inActive: 'text-gray-400'},
                style2: {active: 'btn btn-primary text-white', inActive: 'btn'},
            }[btn.dataset.type];
            let id = btn.dataset.componentId;
            app.toggle(`#${id} .tabs-wrapper>div`, 'active-tab', 'hidden', tab => tab.id == btn.dataset.target)
                .toggle(`#${id} .tab-trigger`, css.active, css.inActive, tabBtn => tabBtn == btn);
            setTimeout(() => this.animateTabsItems(`#${btn.dataset.target} .featured-item`), 10);
        });
        document.querySelectorAll('.tabs>.tab-trigger:first-child').forEach(btn => btn.click());
        document.querySelectorAll('.s-block-tabs').forEach(block => block.classList.add('tabs-initialized'));
        this.animateTabsItems('.tabs-wrapper>div:first-child .featured-item');
    }

    animateTabsItems(sel) {
        document.querySelectorAll(sel).forEach(({style}) => style.removeProperty("opacity") || style.removeProperty("transform"))
        app.anime(sel, false)
            .stagger(70)
            .translateY([30, 0])
            .duration(1200)
            .play();
    }
}

Home.className = 'Home';
Home.allowedPages = ['index'];
Home.intiateWhenReady();