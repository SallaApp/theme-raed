import BasePage from './base-page';
import Slider from './partials/slider'

class Loyalty extends BasePage {
    onReady() {
        let count = app.element(".count-anime")?.dataset?.count||0;
        (new anime.timeline()).add({
          targets: '.star-anime',
          opacity: [0, 1],
          scale: [0, 1],
          rotate: [25, 0],
          duration: 2000
        })
        .add({
            targets: '.loyalty__banner-content .info > *',
            opacity: [0, 1],
            translateX: [20, 0],
            duration: 800,
            delay: (el, i) => i * 100,
        }, '-=1000')
        .add({
            targets: `.count-anime`,
            innerText: [0, count],
            easing: "linear",
            round: true,
        }, '-=1000')
        .add({
            targets: '.btn-anime',
            opacity: [0, 1],
            duration: 2000,
            translateX: [20, 0]
        }, '-=1000')


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

Loyalty.intiateWhenReady('Loyalty');
