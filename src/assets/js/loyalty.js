import BasePage from './base-page';
import Slider from './partials/slider'

class Loyalty extends BasePage {
    onReady() {
        let count = app.element(".count-anime")?.dataset?.count||0;       
        new anime({
            targets: `.count-anime`,
            innerText: [0, count],
            duration: 2000,
            easing: "linear",
            round: true,
        });

        /*
         used in:
           1- similar-products.twig
           2- best offer home block (called again in home.js)
           3- product offer products slider/ cats slider / discount slider
           4- loyalty.twig
       */
        new Slider('.default-slider');

    }
}

Loyalty.initiateWhenReady(['loyalty']);
