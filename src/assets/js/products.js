import BasePage from './base-page';
import Slider from './partials/slider'

class Products extends BasePage {
    onReady() {
        //Used in: [random-testimonials.twig]
        let testimonials = new Slider('.testimonials-slider', {
          draggable     : true,
          centeredSlides: true,
          slidesPerView : 1,
          breakpoints   : {1024: {slidesPerView: 2}}
        });
        //begin from slide 2 to always dispaly prev & next
        if(window.innerWidth > 1024)  testimonials.slideTo(1, false,false);  

        // Sort Products
        app.on('change','#product-filter', event => 
          window.location.href = salla.helpers.addParamToUrl('by', event.target.value)
        );
    }
}

Products.initiateWhenReady( [
    'product.index',
    'product.index.latest',
    'product.index.offers', 'product.index.search',
    'product.index.tag',
]);
