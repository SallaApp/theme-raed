import BasePage from './base-page';
import Slider from './partials/slider'

class Loyalty extends BasePage {
    onReady() {
        let count = document.querySelector(".count-anime").dataset.count;
        (new anime.timeline()).add({
            targets: '.loyality-item',
            opacity: [0, 1],
            translateX: [20, 0],
            delay: function (el, i) {
                return i * 100;
            },
        }).add({
            targets: '.star-anime',
            opacity: [0, 1],
            rotate: [50, 0],
            duration: 4000,
            delay: function (el, i) {
                return i * 100;
            },
        }, '-=1000').add({
            targets: `.count-anime`,
            innerText: [0, count],
            easing: "linear",
            round: true,
            delay: function (el, i) {
                return i * 150;
            },
        }, '-=3700').add({
            targets: '.btn-anime',
            opacity: [0, 1],
            duration: 2000,
            translateX: [20, 0],
            delay: function (el, i) {
                return i * 100;
            },
        }, '-=3200')


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
