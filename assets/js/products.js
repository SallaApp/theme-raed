import BasePage from './base-page';
import Slider from './partials/slider'

class Products extends BasePage {
    onReady() {
        //Used in: [random-testimonials.twig]
        new Slider('.testimonials-slider', {
            loop          : true,
            centeredSlides: true,
            spaceBetween  : 15,
            breakpoints   : {1024: {slidesPerView: 2, spaceBetween: 30}}
        });
    }
}

Products.intiateWhenReady('Products', [
    'product.index',
    'product.index.latest',
    'product.index.offers', 'product.index.search',
    'product.index.tag',
]);
