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
            lazy          : true,
            centeredSlides: true
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
        (new Slider('.main-slider', {
          speed: 750,
          parallax: true,
          loop: true, 
          lazy: true
        }));
       
    }

    /**
     * used in views/components/home/featured-products-style*.twig
     */
    initFeaturedTabs() {
        app.all('.tab-trigger', el => {
          el.addEventListener('click', ({currentTarget: btn})=>{
            let id = btn.dataset.componentId;
            // btn.setAttribute('fill', 'solid');
            app.toggleClassIf(`#${id} .tabs-wrapper>div`, 'is-active opacity-0 translate-y-3', 'inactive', tab => tab.id == btn.dataset.target)
                .toggleClassIf(`#${id} .tab-trigger`, 'is-active', 'inactive', tabBtn => tabBtn == btn);

            // fadeIn active tabe
            setTimeout(() => app.toggleClassIf(`#${id} .tabs-wrapper>div`, 'opacity-100 translate-y-0', 'opacity-0 translate-y-3', tab => tab.id == btn.dataset.target), 100);
          })
        });
        document.querySelectorAll('.s-block-tabs').forEach(block => block.classList.add('tabs-initialized'));
    }
}

Home.intiateWhenReady('Home',['index']);
