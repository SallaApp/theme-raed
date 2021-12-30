import "lite-youtube-embed";
import BasePage from "./basePage";
import Slider from "./partials/slider"
import Lightbox from "fslightbox";


window.fslightbox = Lightbox;

class Home extends BasePage {
    onReady() {
        this.initiateSliders();
        this.initFeaturedTabs();
        this.initMainLinks();

        document.querySelectorAll('.s-block--specialProducts,.s-block--tabsProdutcs').forEach(block => block.classList.add('tabs-initialized'));
        this.animateTabsItems('.tabs-wrapper>div:first-child .featured-item');
    }

    initMainLinks() {
        document.querySelectorAll('.category-slider').forEach(slider => {
            slider.style.display = 'block';
            Slider(slider, {slidesPerView: "auto",/*spaceBetween : 30, centeredSlides: true,*/});
            //todo::enhance
            anime({targets: '.cat-item', opacity: [0, 1], translateY: [15, 0], delay: (el, i) => i * 70,});
        })
    }


    initiateSliders() {
        // Used in: [products_slider.twig, featured_products_style2.twig, slider_products_with_header.twig]
        Slider(".product-slider", {draggable: true});

        //Used in: [photos_slider.twig]
        Slider(".photos-slider", {
            loop          : true,
            centeredSlides: true,
            spaceBetween  : 30,
            breakpoints   : {
                320: {spaceBetween: 10},
                768: {spaceBetween: 15},
                980: {paceBetween: 30},
            },
        });

        Slider('.testimonials-slider', {
            loop          : true,
            centeredSlides: true,
            spaceBetween  : 15,
            breakpoints   : {1024: {slidesPerView: 2, spaceBetween: 30}}
        });
        this.initEnhancedSlider();
    }

    initEnhancedSlider() {
        let animeSlideItems = () => {
            setTimeout(() => {
                anime({
                    targets   : '.swiper-slide-active .main-slide-anime',
                    opacity   : [0, 1],
                    duration  : 2500,
                    translateX: [50, 0],
                    delay     : (el, i) => i * 100,
                })
            }, 100);
        }
        Slider('.main-slider', {loop: true, on: {slideChange: animeSlideItems}});
        animeSlideItems();
    }

    initFeaturedTabs() {
        salla.document.event.onClick('.tab-trigger', event => event.preventDefault() || this.toggleTab(event.target));
        document.querySelectorAll('.tabs>.tab-trigger:first-child').forEach(btn => btn.click())
    }

    toggleTab(btn) {
        let css = {
            style1: {active: 'text-title-color', inActive: 'text-gray-400'},
            style2: {active: 'btn btn-primary text-white', inActive: 'btn'},
        };
        css = css[btn.dataset.type];
        let componentId = '#' + btn.dataset.componentId;
        this.toggle(componentId + ' .tabs-wrapper>div', 'active-tab', 'hidden', tab => tab.id == btn.dataset.target)
        this.toggle(componentId + ' .tab-trigger', css.active, css.inActive, tabBtn => tabBtn == btn);
        setTimeout(() => this.animateTabsItems(`#${btn.dataset.target} .featured-item`), 10);
    }

    //used in views/components/home/featured-products-style*.twig
    animateTabsItems(sel) {
        document.querySelectorAll(sel).forEach(({style}) => style.removeProperty("opacity") && style.removeProperty("transform"))

        //TODO::Enhance this area
        anime({
            targets   : sel,
            translateY: [30, 0],
            opacity   : [0, 1],
            duration  : 1200,
            delay     : anime.stagger(70),
        });
    }
}

new Home