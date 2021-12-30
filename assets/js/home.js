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
        this.initEnhancedSlider();

        document.querySelectorAll('.s-block--specialProducts').forEach(block => block.classList.add('tabs-initialized'));
        this.animateTabsItems('#s-block--specialProducts .tabs-wrapper>div:first-child .featured-item-style1');
    }

    initMainLinks() {
        document.querySelectorAll('category-slider').forEach(slider => {
            slider.style.display = 'block';
            Slider(slider, {slidesPerView: "auto",/*spaceBetween : 30, centeredSlides: true,*/});
            anime({
                targets   : '.cat-item',
                opacity   : [0, 1],
                translateY: [15, 0],
                delay     : (el, i) => i * 70,
            });
        })
    }

    initEnhancedSlider() {
        this.enhancedSliderAnimateSliderItems();
        document.querySelectorAll('.main-slider').forEach(slider => {
            Slider(slider, {
                loop      : true,
                navigation: {
                    nextEl: slider.querySelector('.swiper-button-next'),
                    prevEl: slider.querySelector('.swiper-button-prev'),
                },
                on: {
                    slideChange: this.enhancedSliderAnimateSliderItems,
                },
            });
        });
    }

    enhancedSliderAnimateSliderItems() {
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

    initiateSliders() {
        // Used in: [products_slider.twig, featured_products_style2.twig, slider_products_with_header.twig]
        Slider(".product-slider", {draggable: true}, true);

        //Used in: [photos_slider.twig]
        Slider(".photos-slider", {
            loop          : true,
            centeredSlides: true,
            preloadImages : false,
            lazy          : true,
            spaceBetween  : 30,
            breakpoints   : {
                320: {spaceBetween: 10},
                768: {spaceBetween: 15},
                980: {paceBetween: 30},
            },
        }, true, true);
    }

    initFeaturedTabs() {
        document.querySelectorAll('.tab-trigger').forEach(btn => btn.click(event => this.toggleTab(btn)));
    }

    toggleTab(btn) {
        let componentId = '#' + btn.dataset.componentId;

        this.toggle(componentId + ' .tabs-wrapper>div', 'active-tab', '', tab => tab.id == btn.dataset.target)
        this.toggle(componentId + ' .tab-trigger', 'text-title-color', 'text-gray-400', tabBtn => tabBtn == btn);
        setTimeout(() => this.animateTabsItems(`#${btn.dataset.target} .featured-item-style1`), 10);
    }

    //used in views/components/home/featured-products-style*.twig
    animateTabsItems(ItemClass) {
        document.querySelectorAll(ItemClass)
            .forEach(({style}) => style.removeProperty("opacity") && style.removeProperty("transform"))

        //TODO::Enhance this area
        anime({
            targets   : `${ItemClass}`,
            translateY: [30, 0],
            opacity   : [0, 1],
            duration  : 1200,
            delay     : anime.stagger(70),
        });
    }
}

new Home